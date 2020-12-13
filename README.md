# UFood

Application Web en React JS pour le cours de GLO-3102.

L'application permet de consulter de l'information sur diverses restaurants, ainsi que la connexion, l'inscription et la sauvegarde des favoris pour un utilisateur.

## Équipe 17

Membres de l'équipe :

[**Amanie El-Hajj**](github.com/aelhajj)

[**Charles Drapeau**](https://github.com/drapeaucharles)

[**Thibault-Alexandre Faure**](https://github.com/ImOverlord)

## Prérequis

- Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
- [Node.js](https://nodejs.org/en/) (version LTS recommandée)

Vérifier que Node est installé avec la commande:

```bash
node -v
```

## Installation

```bash
# install dependencies
npm install
```

## Développement

```bash
# default : localhost:3000
npm start
```

## Livrable 1

Le livrable 1 comprend les éléments suivants :

### Pages :

- Homepage

- Restaurant

- User

### Components :

- Card

- Card-List

- Header

- Restaurant

- Restaurant-Edit

- Search-Bar

- Search-Box

## Livrable 2

Le livrable 2 comprend les éléments suivants :

Pages :

- Homepage :

Page d'acceuil, contient la liste des restaurants avec possibilité de filtrage.

- Restaurant :

/{idResto}

Page de restaurant avec les informations, et possibilité d'ajouter aux favoris, commenter, voir sur la map.

- User :

/{nameUser}

Contient les informations de l'utilisateur connecté, et les listes favoris.

### Components :

Du livrable I : Card, Card-List, Header, Restaurant, Restaurant-Edit, Search-Bar, Search-Box

- VisitModal

- ViewVisitModal

- FavoritesModal

- Toast

### Services :

- API

- USER (intégration avec API au livrable 3)

## Livrable 3

Le livrable 3 comprend les éléments suivants :

### Pages :

#### Homepage :

Page d'acceuil, contient la liste des restaurants avec possibilité de filtrage.

#### Restaurant :

/{idResto}

Page de restaurant avec les informations, et possibilité d'ajouter aux favoris, commenter, voir sur la map.

#### Login :

/login

#### Sign Up :

/signup

#### Profil [Mode Connecté] :

/profile

Contient les informations de l'utilisateur connecté, les followers et followings et les listes favoris.

#### Users [Mode Connecté] :

/users/{idUser}

Contient les informations de l'utilisateur avec idUser, et permet de follow / unfollow cet utilisateur.

### Components :

Du livrable I : Card, Card-List, Header, Restaurant, Restaurant-Edit, Search-Bar, Search-Box

Du livrable II : VisitModal, ViewVisitModal, FavoritesModal, Toast

#### ChargedSearched :

Pour la recherche avec auto-complétion

#### MapView :

Pour le mode Map pour la vue des restaurants

#### FollowCard :

Permet de voir les followers et les followings d'un utilisateur

### Features avancées :

#### Gravatar :

Dans le header, profile, et users

#### Autocomplete :

La recherche des utilisateurs est en auto-complétion.

### Services :

#### API :

- API : information du restaurant
- favoriteAPI : information des favoris
- visitAPI : information des visites

#### USER :

- USER : information de l'utilisateur
- followAPI : follow / unfollow un utilisateur
- loginAPI : login / logout un utilisateur
- registerAPI : pour enregistrer un utilisateur
- usersAPI : pour afficher, rechercher des utilisateurs

## Notes

### ESLint

ESLint est configuré afin de respecter un certain standard de code à travers votre équipe. Il est basé sur la configuration de Prettier. qui rassemble les règles de base populaires. Libre à vous de modifier cette configuration via `.eslintrc.js`.
