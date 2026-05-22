# 1. Partiamo sempre da Node.js
FROM node:20-alpine

# 2. Creiamo la cartella di lavoro /app
WORKDIR /app

# 3. Copiamo i file delle dipendenze
COPY package*.json ./

# 4. Installiamo le librerie del frontend
RUN npm install

# 5. Copiamo tutto il resto del codice del frontend
COPY . .

# 6. Esponiamo la porta 5173 (quella che usa Vite di default)
EXPOSE 5173

# 7. Avviamo il frontend. L'aggiunta di "--host" è un trucco obbligatorio 
# per far funzionare Vite dentro una scatola Docker!
CMD ["npm", "run", "dev", "--", "--host"]