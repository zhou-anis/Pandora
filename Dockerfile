FROM ubuntu:22.04

RUN apt update && apt install -y nginx && apt install -y curl && apt clean



EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
