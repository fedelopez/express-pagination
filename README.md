## Seed the DB

```text
dropdb express_tips;
createdb express_tips;
psql express_tips;
heroku pg:psql
# \i db/movies.sql
psql -d express_tips -c "\copy movies FROM './bin/large_dataset.csv' delimiter ',' csv header"
```

yarn add pg-promise
yarn add nodemon -D

on web:

yarn add axios
proxy

TODO TMUXINATOR

