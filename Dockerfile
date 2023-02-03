FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Files required by pnpm install
COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

# Bundle app source
COPY . ./

# EXPOSE 8080
CMD [ "pnpm", "start" ]