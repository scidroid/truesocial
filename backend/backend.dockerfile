FROM python:3.8-slim-buster

WORKDIR /app

COPY backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY backend/ .
EXPOSE 8000
CMD [ "python3", "main.py" ]