# 📝 NoteApp - Cloud-Native Web Application

**Progetto per l'esame di Applicazioni web Mobile e Cloud**  
**Studente: Ahmed Muhammad Hasan** 


## 🎯 Obiettivo del Progetto
L'obiettivo di questo progetto è la realizzazione di un'applicazione web cloud-native per la gestione di note personali. L'architettura è stata progettata per essere scalabile, sicura e facilmente distribuibile tramite container.

## 🧰 Stack Tecnologico (MERN)
- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Sicurezza:** JWT (JSON Web Tokens) per l'autenticazione, Bcrypt per l'hashing delle password.
- **Infrastruttura:** Docker & Docker Compose (Architettura Cloud-Native)


## 🚀 Come avviare l'applicazione in locale

Grazie a Docker, l'avvio dell'applicazione è completamente automatizzato e non richiede l'installazione locale di Node.js o altre dipendenze.

### Prerequisiti
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installato e in esecuzione.

### Avvio rapido
1. Clonare questo repository.
2. Creare un file `.env` nella cartella `backend` inserendo le proprie credenziali MongoDB e il segreto JWT (vedi la sezione configurazione).
3. Aprire il terminale nella cartella root del progetto e lanciare il comando:

```bash
docker compose up --build
```

4. Aprire il browser all'indirizzo: http://localhost:5173

## 🔐 Configurazione Variabili d'Ambiente (.env)
Per motivi di sicurezza, il file `.env` non è incluso nel repository. È necessario crearlo manualmente nella cartella `backend` incollando il seguente blocco di codice per collegare l'app al database locale di Docker:

```env
# Chiave segreta per i Token 
ACCESS_TOKEN_SECRET=inserisci_una_chiave_segreta_qui

# Collegamento al database MongoDB locale gestito da Docker
MONGODB_URI=mongodb://mongodb:27017/notesapp
```

## ✨ Funzionalità Principali
- Registrazione e Login sicuri (password protette tramite hashing).
- Creazione, modifica, eliminazione e ricerca delle note.
- Fissaggio in alto (Pin) delle note più importanti.