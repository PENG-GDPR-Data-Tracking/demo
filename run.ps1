$server = "gdpr-health-preprocessing-serv"

heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs -a $server

heroku buildpacks:add https://github.com/heroku/heroku-buildpack-multi-procfile -a $server

heroku config:set PROCFILE=src/servers/health-preprocessing-server/Procfile -a $server