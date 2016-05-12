# Introduction
Welcome to SweepStakes, a fun way to follow Soccer Tournaments.

I used [this website](http://mherman.org/blog/2016/04/28/test-driven-development-with-node/?utm_source=nodeweekly&utm_medium=email#.VyzZxRUrKV5) to get started

# Preparing Database

```
$ knex migrate:latest --env development
$ knex seed:run --env development
```

If you need to rollback your database:

````
$ knex migrate:rollback --env development
````

