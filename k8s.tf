terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.30.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.23.0"
    }
    helm = {
      source = "hashicorp/helm"
      version = "2.11.0"
    }
  }
}


resource "helm_release" "nginx_ingress_chart" {
  name       = "nginx-ingress-controller"
  namespace  = "default"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx-ingress-controller"
  set {
    name  = "service.type"
    value = "LoadBalancer"
  }
  set {
    name  = "service.annotations.kubernetes\\.digitalocean\\.com/load-balancer-id"
    value = digitalocean_loadbalancer.ingress_load_balancer.id
  }
  depends_on = [
    digitalocean_loadbalancer.ingress_load_balancer,
  ]
}



resource "digitalocean_kubernetes_cluster" "library" {
  name   = var.name
  region = var.region
  # Grab the latest version slug from `doctl kubernetes options versions`
  version = "1.28.2-do.0"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = var.node_count
  }
}

resource "digitalocean_loadbalancer" "ingress_load_balancer" {
  name   = "${var.name}-lb"
  region = var.region
  size = "lb-small"
  algorithm = "round_robin"

  forwarding_rule {
    entry_port     = 80
    entry_protocol = "http"

    target_port     = 80
    target_protocol = "http"
  }

  lifecycle {
      ignore_changes = [
        forwarding_rule,
    ]
  }

}

resource "digitalocean_domain" "top_level_domains" {
    for_each = toset(var.domains)
    name = each.value
}

resource "digitalocean_record" "a_records" {
  for_each = toset(var.domains)
  domain = each.value
  type   = "A"
  ttl = 60
  name   = "@"
  value  = digitalocean_loadbalancer.ingress_load_balancer.ip
  depends_on = [
    digitalocean_domain.top_level_domains,
    kubernetes_ingress_v1.app_ingress
  ]
}

resource "digitalocean_record" "cname_redirects" {
  for_each = toset(var.domains)
  domain = each.value
  type   = "CNAME"
  ttl = 60
  name   = "www"
  value  = "@"
  depends_on = [
    digitalocean_domain.top_level_domains,
  ]
}



provider "kubernetes" {
  host  = digitalocean_kubernetes_cluster.library.endpoint
  token = digitalocean_kubernetes_cluster.library.kube_config[0].token
  cluster_ca_certificate = base64decode(
    digitalocean_kubernetes_cluster.library.kube_config[0].cluster_ca_certificate
  )
}

provider "helm" {
  kubernetes {
    host  = digitalocean_kubernetes_cluster.library.endpoint
    token = digitalocean_kubernetes_cluster.library.kube_config[0].token
    cluster_ca_certificate = base64decode(
      digitalocean_kubernetes_cluster.library.kube_config[0].cluster_ca_certificate
    )
  }
}

# database service
resource "kubernetes_service" "database-service" {
  metadata {
    name = "database-service"
  }
  spec {
    selector = {
      app = "database-pod"
    }
    port {
      port        = var.database_envs.POSTGRES_PORT
      target_port = var.database_envs.POSTGRES_PORT
    }
    type = "ClusterIP"
  }

}

# backend service
resource "kubernetes_service" "backend-service" {
  metadata {
    name = "backend-service"
  }
  spec {
    selector = {
      app = "backend-pod"
    }
    port {
      port        = var.backend_port
      target_port = var.backend_port
    }
    type = "ClusterIP"
  }

}

# frontend service
resource "kubernetes_service" "frontend-service" {
  metadata {
    name = "frontend-service"
  }
  spec {
    selector = {
      app = "frontend-pod"
    }
    port {
      port        = var.frontend_envs.NGINX_PORT
      target_port = var.frontend_envs.NGINX_PORT
    }
    type = "ClusterIP"
  }
}

# database deployment

resource "kubernetes_deployment" "database-deployment" {
  metadata {
    name = "database-deployment"
  }
  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "database-pod"
      }
    }
    template {
      metadata {
        labels = {
          app = "database-pod"
        }
      }
      spec {
        container {
          image = "postgres"
          name  = "database"
          dynamic "env" {
            for_each = var.database_envs

            content {
              name  = env.key
              value = env.value
            }
          }
        }
      }
    }
  }
}

# backend deployment
resource "kubernetes_deployment" "backend-deployment" {
  metadata {
    name = "backend-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "backend-pod"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend-pod"
        }
      }
      spec {
        container {
          image = var.backend_image
          name  = "backend"

          dynamic "env" {
            for_each = var.backend_envs

            content {
              name  = env.key
              value = env.value
            }
          }
        }
      }
    }
  }
}

# Frontend deployment
resource "kubernetes_deployment" "frontend-deployment" {
  metadata {
    name = "frontend-deployment"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "frontend-pod"
      }
    }
    template {
      metadata {
        labels = {
          app = "frontend-pod"
        }
      }
      spec {
        container {
          image = var.frontend_image
          name  = "frontend"
          dynamic "env" {
            for_each = var.frontend_envs
            content {
              name  = env.key
              value = env.value
            }
          }
        }
      }
    }
  }
}

# Create an ingress controller, which maps a domain to a frontend service
resource "kubernetes_ingress_v1" "app_ingress" {
  wait_for_load_balancer = true
  depends_on = [
    helm_release.nginx_ingress_chart,
  ]

  metadata {
    name = "app-ingress"
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target": "/"
    }
  }

  spec {
    ingress_class_name = "nginx"
    rule {
      host = "www.openlibray.online"
      http {
        path {
          path = "/"
          backend {
            service {
              name = kubernetes_service.frontend-service.metadata[0].name
              port {
                number = kubernetes_service.frontend-service.spec[0].port[0].port
              }
            }
          }
        }
      }
    }
  }
}