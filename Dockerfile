# Etapa 1: Build da aplicação Angular
FROM node:18.19.0 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copiando o código da aplicação
COPY . .

# Executando o build da aplicação Angular
RUN npm run build -- --configuration production

# Etapa 2: Servir a aplicação usando Nginx
FROM nginx:1.27.1-alpine

WORKDIR /www

# Limpar o diretório padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos construídos da etapa anterior para o diretório do Nginx
COPY --from=builder /app/dist/crud-angular /www/crud-angular

# Copiar configuração personalizada do Nginx (se necessário)
COPY nginx.conf /etc/nginx/nginx.conf

# Ajustar permissões
RUN chown -R nginx:nginx /www

# Expondo as portas
EXPOSE 80
EXPOSE 443

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
