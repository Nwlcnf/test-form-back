# Backend - Form Registration API

## Description

Ce projet est le backend d'une application permettant l'enregistrement d'utilisateurs via un formulaire. Il est développé avec Node.js et MongoDB et propose une API RESTful pour gérer l'inscription et la récupération des utilisateurs. Le backend inclut également un administrateur pouvant supprimer des utilisateurs inscrits.

L'architecture est contenue dans un environnement Dockerisé, testée avec des workflows GitHub Actions, et déployée sur Vercel avec une base de données MongoDB Atlas. La documentation de l'API est disponible via Swagger.

## Fonctionnalités principales

- Création d'un utilisateur avec validation des données
- Récupération de la liste des utilisateurs inscrits (sans email ni date de naissance pour les utilisateurs non administrateurs)
- Connexion administrateur
- Suppression d'un utilisateur (uniquement par l'admin)
- Documentation API avec Swagger : http://localhost:5001/api-docs
- Tests automatisés (Unitaires, Intégration, E2E avec Cypress)
- Déploiement automatisé avec Vercel : https://test-form-exemple-back-pezbpwjpw-nawel-chennoufs-projects.vercel.app/api/users

## Technologies utilisées

- Node.js + Express.js
- MongoDB Atlas pour la base de données
- Docker pour l’environnement de développement
- Swagger pour la documentation API
- Jest & Supertest pour les tests API
- GitHub Actions pour CI/CD
- Vercel pour l'hébergement



