FROM node:latest

ENV TZ=America/Sao_Paulo

# Instale o pacote tzdata (necessário para ajustar o fuso horário)
RUN apt-get update && apt-get install -y tzdata

# Configure o fuso horário
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Diretório de trabalho
WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["npm", "start"]
