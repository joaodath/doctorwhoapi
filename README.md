# Doctor Who API (doctorwhoapi)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/joaodath/doctorwhoapi)
[![Lines of Code](https://img.shields.io/tokei/lines/github/joaodath/doctorwhoapi)](https://img.shields.io/tokei/lines/github/joaodath/doctorwhoapi)
[![Repo Size](https://img.shields.io/github/repo-size/joaodath/doctorwhoapi)](https://img.shields.io/github/repo-size/joaodath/doctorwhoapi)

A simple NodeJS + Express.js RESTful API serving data about Doctor Who.

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

## How to get started

Soon I'll share the secret.

### Deploying on your own server

If you're working on a big project that will have lots of traffic, I kindly ask
you to deploy your own API. Just clone this code in your server AND clone the
entire database. I will walk you through the process.

#### Environment

Make sure you have the right environment to support this API. 
We use `NodeJS v14.17.6` as JavaScript runtime engine, some NPM packages that 
you may find inside the `package.json` file and MongoDB as the database. 
_**Yes, a NoSQL database, baby.**_

To start, you'll have to know which collections (you may think of collections 
roughly as tables on SQL databases) we have. 
To do that, use the following request:

```
GET
url/docs/collections
```

Then, you'll have to clone each of the collections using the GET requests:

```
GET
url/<collectionName>
```

The result is a JSON object containing everything saved inside said collection.
Do that for every collection listed on `url/docs/collections`.

After that, spin up your own instance of MongoDB and import each JSON object
inside a different collection.

You could also create a JavaScript to fetch everything and then import it. 
**_That's on my to-do list._**

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
