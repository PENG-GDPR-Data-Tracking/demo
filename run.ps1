$server = "gdpr-users-server"

heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs -a $server

heroku buildpacks:add https://github.com/heroku/heroku-buildpack-multi-procfile -a $server

heroku config:set PROCFILE=src/servers/users-server/Procfile -a $server