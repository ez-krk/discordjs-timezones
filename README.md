# Discord.js Cryptocurrency Ticker Bot

## Prerequesites

This Discord Bot uses the [discord.js](https://discord.js.org/#/) library, and the main file `/src/index.js` is very basic JavaScript such as setInterval, [Axios-HTTP GET request](https://axios-http.com/docs/example), [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), Promises (GET request) with `.then()` and `.catch()`, [Template strings literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

This Application makes use of the free public tier of the [Coingecko v3 API](https://www.coingecko.com/en/api).

This App has been tested on Node.js v18.12.1 with [pnpm](https://pnpm.io/) only !

I highly encourage you to install and manage multiple versions of Node.js through the use of [NVM (Node Version Manager)](https://github.com/nvm-sh)

## Discord Bot Registration

Head to the [Discord Developers Portal](https://discord.com/developers), log in with an account with sufficient permissions to manage bots in the server you want to add these. Create as many as you want (ex : bitcoin, ethereum, solana), add their logo manually, name will be set by the script.

Save your tokens preciously - I recommend using a password manager like [KeePassXC](https://keepassxc.org/).

Finally, you need to craft an invite link using the Application ID using this format : `https://discord.com/api/oauth2/authorize?client_id=[Application_ID]&permissions=0&scope=bot%20applications.commands` you can read more about this on [discordjs.guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)

## Install

With pnpm, simply run `pnpm i`.

If you don't have pnpm, [install it](https://pnpm.io/installation) by using corepack instructions.

## Run Locally

Rename the `.env.example` file to `.env`, and input your Discord App Token, desired Coingecko Id (ex : bitcoin) and fiat collateral.

Run `pnpm start` to execute the script locally.

## Run in Docker

This may not be the best way to do it, but I make it work this way :

```bash

docker build . -t ticker_name --no-cache
# (...)
 ---> 22a64d0f56ed
Successfully built 22a64d0f56ed
# (...)
docker run 22a64d0f56ed

```

Just update the `.env` file with new CRYPTO and DISCORD_TOKEN to add other tickers.
