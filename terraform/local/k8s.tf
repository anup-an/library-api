terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.23.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.11.0"
    }
    jenkins = {
      source  = "taiidani/jenkins"
      version = "0.10.2"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

provider "jenkins" {
  server_url = var.jenkins_envs.serverUrl
  username   = var.jenkins_envs.adminUser
  password   = var.jenkins_envs.adminPassword
}


resource "jenkins_job" "frontend-jenkins-job" {
  name = "frontend-jenkins-job"
  template = templatefile("${path.module}/jenkinsfiles/frontend-jenkins-job.xml", {
    description        = "Jenkins pipeline job for frontend",
    git_repo           = var.jenkins_envs.githubRepository
    git_credentials_id = var.jenkins_envs.gitCredentialsId
  })
}

resource "jenkins_job" "backend-jenkins-job" {
  name = "backend-jenkins-job"
  template = templatefile("${path.module}/jenkinsfiles/backend-jenkins-job.xml", {
    description        = "Jenkins pipeline job for backend",
    git_repo           = var.jenkins_envs.githubRepository
    git_credentials_id = var.jenkins_envs.gitCredentialsId
  })
}


resource "helm_release" "jenkins" {
  name             = "jenkins"
  repository       = "https://charts.jenkins.io"
  chart            = "jenkins"
  version          = "4.10.0"
  namespace        = "default"
  create_namespace = true

  set {
    name  = "controller.adminUser"
    value = var.jenkins_envs.adminUser
  }

  set {
    name  = "controller.adminPassword"
    value = var.jenkins_envs.adminPassword
  }

  set {
    name  = "controller.serviceType"
    value = "LoadBalancer"
  }
}

resource "kubernetes_cluster_role" "jenkins-deployment-role" {
  metadata {
    name = "jenkins-deployment-role"
  }

  rule {
    api_groups = ["apps", "rbac.authorization.k8s.io"]
    resources  = ["pods", "services", "nodes", "deployments"]
    verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
  }
}


resource "kubernetes_service_account" "jenkins-service-account" {
  metadata {
    name      = "jenkins-service-account"
    namespace = "default"
  }
}


resource "kubernetes_cluster_role_binding" "jenkins-cluster-role" {
  metadata {
    name = "jenkins-cluster-role"
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.jenkins-deployment-role.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = "default"
    namespace = "default"
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
    type = "LoadBalancer"
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
      protocol    = "TCP"
      port        = 8000
      target_port = 8000
    }
    type = "ClusterIP"
  }
}

# persistent volume
resource "kubernetes_persistent_volume" "library_database_volume" {
  metadata {
    name = "library-database-volume"
  }
  spec {
    capacity = {
      storage = "5Gi"
    }
    volume_mode        = "Filesystem"
    storage_class_name = "standard"
    access_modes       = ["ReadWriteOnce"]
    persistent_volume_source {
      host_path {
        path = "/var/lib/postgresql/data/"
        type = "DirectoryOrCreate"
      }
    }
  }
}

# persistent volume claim
resource "kubernetes_persistent_volume_claim" "library_database_volume_claim" {
  metadata {
    name = "library-database-volume-claim"
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "5Gi"
      }
    }
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
        init_container {
          name    = "init-db"
          image   = "postgres"
          command = ["bash", "-c", "rm -rf /var/lib/postgresql/data/*"]
          volume_mount {
            name       = kubernetes_persistent_volume.library_database_volume.metadata[0].name
            mount_path = "/var/lib/postgresql/data/"
          }
        }
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
          volume_mount {
            name       = kubernetes_persistent_volume.library_database_volume.metadata[0].name
            mount_path = "/var/lib/postgresql/data/"
          }
        }
        volume {
          name = kubernetes_persistent_volume.library_database_volume.metadata[0].name
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.library_database_volume_claim.metadata[0].name
          }
        }
      }
    }
  }
  depends_on = [kubernetes_persistent_volume.library_database_volume, kubernetes_persistent_volume_claim.library_database_volume_claim]
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


