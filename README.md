# 🧵 Tether

Tether is a mental health accountability platform built to help users feel less alone and more supported in their personal wellness journeys. By pairing individuals anonymously with accountability partners and providing structured routines, reminders, and supportive chat spaces, Tether encourages consistency, self-reflection, and meaningful connection without the pressure of formal therapy.

---

## 🔗 Live Link  
**https://tether-xd0d.onrender.com/**

---

## 👥 Team

- **Product Owner:** Ryan Ramirez  
- **Scrum Master:** Taifinkaba Chowdhury  
- **Development Team Members:** Ryan Ramirez, Taifinkaba Chowdhury, Engels Garcia  

---

## 📚 Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Usage](#usage)  
4. [Requirements](#requirements)  
5. [Development](#development)  
   1. [Installing Dependencies](#installing-dependencies)  
   2. [Running the App](#running-the-app)  
6. [Roadmap](#roadmap)  
7. [Contributing](#contributing)  

---

## ✨ Features

### 1. Accountability System
- Anonymous 1-on-1 partner pairing  
- Daily check-ins and emotional status tracking  
- Task completion system for routines, reminders, and appointments  
- Missed tasks notify your partner to encourage check-ins  
- Supportive private chat with optional nudges  

### 2. Group Support
- Group chat rooms for up to 20 participants  
- Safe, anonymous conversation environment  
- Weekly topics and conversation starters  

### 3. Personal Management Tools
- Custom routines and reminders  
- Therapy or wellness appointment tracking  
- Personalized resource suggestions  

### 4. Safety & Privacy
- Anonymity-first design  
- Users only see intended spaces  
- Secure communication  
- Basic moderation and user-report features  

### 5. Future Extensions
- Verified therapist/professional accounts  
- Shared partner goals and streak systems  
- Weekly reflection journals  
- Achievement badges + peer recognition  
- Mini-games inside private chats  

---

## 🧱 Tech Stack

### **Frontend**
- React  
- Vite  
- JavaScript / JSX  
- CSS / Tailwind (if applicable)  
- Fetch / Axios  

### **Backend**
- Node.js  
- Express  
- Knex.js  
- PostgreSQL  
- Redis  

### **Authentication & Sessions**
- Express-Session  
- Redis Store  
- BCrypt  

### **Real-Time & Messaging**
- WebSockets / Socket.io (if applicable)  
- Redis Pub/Sub  

### **Infrastructure & Deployment**
- Render  
- pgAdmin / SQL Tools  
- GitHub Projects  

### **Development Tools**
- ESLint / Prettier  
- npm  
- Postman / Thunder Client  
- Git & GitHub  

---

## 🧑‍💻 Usage

Follow these steps to run the Tether application locally:

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd tether
   cd frontend
   npm run build
   cd ../server
   npm i
   npm run migrate
   npm run see   
   ```

### Roadmap

View the project roadmap [here](https://github.com/orgs/Thread-Weavers/projects/1).


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Style Guide

This project adheres to the [Airbnb Style Guide](https://github.com/airbnb/javascript).
