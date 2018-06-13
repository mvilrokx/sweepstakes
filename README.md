# Introduction

Welcome to SweepStakes, a fun way to follow Soccer Tournaments.

I used [this website](http://mherman.org/blog/2016/04/28/test-driven-development-with-node/?utm_source=nodeweekly&utm_medium=email#.VyzZxRUrKV5) to get started

# Getting Started

Donwload this repo, then run:

```
$ npm install
```

# Preparing Database

Make sure you have postgress installed on the machine you are planning to work on and create a DB that is called 'sweepstakes_heroku', then run:

```
$ npm run bootstrap
```

If you need to rollback your database:

```
$ knex migrate:rollback --env development
```
