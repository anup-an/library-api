FROM python:3.9

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY . /app

WORKDIR /app

COPY ./entrypoint.sh .

ENTRYPOINT ["sh", "/app/entrypoint.sh"]