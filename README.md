# Doctor Who API (doctorwhoapi)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/joaodath/doctorwhoapi)
[![Lines of Code](https://img.shields.io/tokei/lines/github/joaodath/doctorwhoapi)](https://img.shields.io/tokei/lines/github/joaodath/doctorwhoapi)
[![Repo Size](https://img.shields.io/github/repo-size/joaodath/doctorwhoapi)](https://img.shields.io/github/repo-size/joaodath/doctorwhoapi)

A simple NodeJS + Express.js RESTful API serving data about Doctor Who.

API Version: 1.0

OpenAPI Version: 3.1.0

## Intro

Have you ever felt the urging need to fetch data about Doctor Who? Have you
ever got up startled in the middle of the night after having a bad dream
about not knowing EVERYTHING there is to know about Doctor Who using a simple
yet very effective RESTful API for that?

Well, your problems are over, friend! :)
Presenting the Doctor Who API (unofficial). A simple, fast and easy to
understand-maintain-deploy-consume API containing just about everything
there is to know.

## Why?

The Doctor Who API (unofficial) exists to serve the single purpose of fixing
the urges to fetch data about Doctor Who.

## How to get started:

There are five HTTP verbs availables: 
- GET (ALL) 
- GET (By ID)
- PUT
- POST
- DELETE

And 3 topics (CRUD):
- Characters
- Episodes
- Species

The endpoints are the following for `Characters`:

```
GET All Characters
https://doctorwhoapi.herokuapp.com/characters
```

```
GET Characters By ID
https://doctorwhoapi.herokuapp.com/characters/<id>
```

```
GET Filter Characters By fields
https://doctorwhoapi.herokuapp.com/characters?fieldName=fieldValue&field2=value2

Fields Available:
- name
- regenerationCount
- species
- bio
- birthDate
- deathDate
- spouse
- firstMentioned
- firstAppearance
- lastAppearance
- allAppearances
- actorOrActress
```

```
PUT Characters
https://doctorwhoapi.herokuapp.com/characters

All Fields MUST be filled:
{
    "name": "String",
    "regenerationCount": "Integer",
    "species":"String",
    "bio": "String",
    "birthDate": "Integer/String",
    "deathDate": "Integer/String",
    "spouse": "String",
    "firstMentioned": "String",
    "firstAppearance": "String",
    "lastAppearance": "String",
    "allAppearances": "[String Array]",
    "actorOrActress": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
POST Characters
https://doctorwhoapi.herokuapp.com/characters

All Fields MUST be filled:
{
    "name": "String",
    "regenerationCount": "Integer",
    "species":"String",
    "bio": "String",
    "birthDate": "Integer/String",
    "deathDate": "Integer/String",
    "spouse": "String",
    "firstMentioned": "String",
    "firstAppearance": "String",
    "lastAppearance": "String",
    "allAppearances": "[String Array]",
    "actorOrActress": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
POST Many Characters
https://doctorwhoapi.herokuapp.com/episodes

All Fields MUST be filled:
{
    "name": "String",
    "regenerationCount": "Integer",
    "species":"String",
    "bio": "String",
    "birthDate": "Integer/String",
    "deathDate": "Integer/String",
    "spouse": "String",
    "firstMentioned": "String",
    "firstAppearance": "String",
    "lastAppearance": "String",
    "allAppearances": "[String Array]",
    "actorOrActress": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
DELETE Characters
https://doctorwhoapi.herokuapp.com/characters/<id>
```

The endpoints are the following for `Episodes`:

```
GET All Episodes
https://doctorwhoapi.herokuapp.com/episodes
```

```
GET Episodes By ID
https://doctorwhoapi.herokuapp.com/episodes/<id>
```

```
PUT Episodes
https://doctorwhoapi.herokuapp.com/episodes

All Fields MUST be filled:
{
    "name": "String",
    "season": "Integer",
    "number": "Integer",
    "shorthand": "String",
    "bio": "String",
    "firstRelease": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
POST Episodes
https://doctorwhoapi.herokuapp.com/episodes

All Fields MUST be filled:
{
    "name": "String",
    "season": "Integer",
    "number": "Integer",
    "shorthand": "String",
    "bio": "String",
    "firstRelease": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
DELETE Episodes
https://doctorwhoapi.herokuapp.com/episodes/<id>
```

The endpoints are the following for `Species`:

```
GET All Species
https://doctorwhoapi.herokuapp.com/species
```

```
GET Species By ID
https://doctorwhoapi.herokuapp.com/species/<id>
```

```
PUT Species
https://doctorwhoapi.herokuapp.com/species

All Fields MUST be filled:
{
    "name": "String",
    "planet": "String",
    "firstMentioned": "String",
    "firstAppearance": "String",
    "lastAppearance": "String",
    "allAppearances": "[String Array]",
    "bio": "String",
    "biologicalType": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
POST Species
https://doctorwhoapi.herokuapp.com/species

All Fields MUST be filled:
{
    "name": "String",
    "planet": "String",
    "firstMentioned": "String",
    "firstAppearance": "String",
    "lastAppearance": "String",
    "allAppearances": "[String Array]",
    "bio": "String",
    "biologicalType": "String",
    "tardisDataCoreURI": "String",
    "imgURI": "String"   
}
```

```
DELETE Species
https://doctorwhoapi.herokuapp.com/species/<id>
```

### Deploying on your own server

If you're working on a big project that will have lots of traffic, I kindly ask
you to deploy your own API. Just clone this code in your server AND clone the
entire database. I will walk you through the process.

#### Environment

Make sure you have the right environment to support this API. 
We use `NodeJS v14.17.6` as JavaScript runtime engine, some NPM (version 7.22.0) packages that 
you may find inside the `package.json` file and MongoDB as the database.  _**Yes, a NoSQL database, baby.**_

> **Attention:** attempting to use NodeJS and NPM with versions lower than specified may return an error. You have been warned.


To start, you'll have to clone each of the collections using the GET requests:

```
GET
url/<collectionName>
```

The result is a JSON object containing everything saved inside said collection.
Do that for every collection listed on [`How To Get Started`](https://github.com/joaodath/doctorwhoapi#how-to-get-started).

After that, spin up your own instance of MongoDB and import each JSON object
inside a different collection.

You could also create a JavaScript to fetch everything and then import it. 
**_That's on my to-do list._**

As the final step, use the file `.env.example` to create your own `.env` file.
This file is required to create the Environment Variables. 

> Note: If you're deploying to Heroku, you can set the Environment Variables 
> inside Heroku, no need to upload a `.env` file.

## Acknowledgments

I'd like to first give a shout out to the incredible minds at work on
Doctor Who. You're the reason I kept dreaming and looking up to the stars
after all those years.

Then, I'd like to give a round of applauses to my wonderful teacher whom
inspires me to be a little bit better everyday and change the world
(however I can): **[Thiago Lima](https://github.com/codethi)**.
As he would say: SWIPE UP!

## The ~~raggedy man~~ mind behind

[João Rodrigues (aka Me)](https://github.com/joaodath)
