# --- FASE 1: La "Fabbrica" (Build) ---
FROM node:20-alpine AS build

WORKDIR /app

# Copiamo i file e installiamo le librerie
COPY package*.json ./
RUN npm install

# Copiamo il resto del codice
COPY . .

# Invece di avviare il server di sviluppo, diciamo a Vite di 
# "impacchettare" e ottimizzare tutto il codice. 
# Questo creerà una cartella invisibile chiamata /app/dist
RUN npm run build


# --- FASE 2: Il Server Web (Deploy con Nginx) ---
FROM nginx:alpine

# Prendiamo SOLO i file finali ottimizzati dalla cartella "dist" 
# e li copiamo dentro la cartella pubblica di Nginx. 
# Tutto il resto (Node.js, file originali, moduli pesanti) viene buttato via!
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

#nginx ascolta di default sulla porta 80, quindi non serve esporre la porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]