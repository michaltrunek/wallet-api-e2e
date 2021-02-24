# use node image
FROM node:12.18.3-buster-slim@sha256:dd6aa3ed10af4374b88f8a6624aeee7522772bb08e8dd5e917ff729d1d3c3a4f as dependency
WORKDIR /usr/source
COPY package.json package-lock.json .npmrc ./
RUN npm ci --silent

FROM dependency 
WORKDIR /usr/source
COPY . .
# set default test run environment vars
ENV testFilter='./tests/**/*Test.js' environment=prod GREP=@test workers=5 slackChannel='#regression'
ENTRYPOINT testFilter=$testFilter environment=$environment slackChannel=$slackChannel ./node_modules/codeceptjs/bin/codecept.js run-workers --suites $workers --grep $GREP