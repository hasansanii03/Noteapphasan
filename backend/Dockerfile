# 1.  installiamo solo Node.js
FROM node:20-alpine

# 2. Creiamo una cartella di lavoro dentro questa scatola chiamata /app
WORKDIR /app

COPY package*.json ./

# 4. Installazione delle librerie (node_modules) direttamente dentro la scatola
RUN npm install


COPY . .

# 6. Diciamo alla scatola di comunicare verso l'esterno sulla porta 5000
EXPOSE 5000

# 7. Il comando per far partire il server quando la scatola si accende
CMD ["node", "index.js"]