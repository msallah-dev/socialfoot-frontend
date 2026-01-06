# Mon Projet React + TypeScript + Vite

Ce projet est une application web développée avec **React**, **TypeScript** et **Vite**.

_____________________________

## Prérequis

- Node.js (version 16 ou supérieure recommandée)
- npm ou yarn

_____________________________

## Installation

1. Clonez ce dépôt :  

   ```bash
   git clone https://github.com/msallah-dev/socialfoot-frontend.git
   cd socialfoot-react

2. Installez les dépendances :

  npm install ou yarn install

_____________________________

## Configuration de l'environnement

Créez un fichier .env à la racine du projet.

Ajoutez la variable suivante avec l'URL de votre serveur backend :

VITE_APP_API_URL=http://localhost:PORT_SERVEUR_BACK/

Remplacez PORT_SERVEUR_BACK par le port de votre serveur backend.

⚠️ N'oubliez pas de redémarrer le serveur Vite si vous modifiez le fichier .env.

_____________________________

## Démarrage de l'application

Pour lancer le serveur de développement :

  npm run dev ou yarn dev

  Le projet sera disponible par défaut sur http://localhost:5173
 (Vite peut choisir un autre port si celui-ci est occupé).

 _____________________________

 ## Structure du projet

```bash
src/
  ├─ actions/      # Actions pour Redux ou gestion d'état
  ├─ reducers/     # Reducers pour Redux ou gestion d'état
  ├─ components/   # Composants React
  ├─ pages/        # Pages de l'application
  ├─ styles/       # Styles de l'application
  ├─ App.tsx       # Composant principal
  └─ main.tsx      # Point d'entrée
```
_____________________________

👨‍💻 Auteur

SALLAH Mohamed

📧 Email : sallah.mohamed@outlook.fr

💼 LinkedIn : https://www.linkedin.com/in/mohamed-sallah-642151128/
