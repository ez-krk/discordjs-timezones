require("dotenv").config();
const axios = require("axios");

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

const { token } = process.env.DISCORD_TOKEN;

const GECKO_BASE = "https://api.coingecko.com/api/v3";
const CRYPTO = process.env.CRYPTO;
const FIAT = process.env.FIAT;
const GECKO_PRICE = `${GECKO_BASE}/simple/price?ids=${CRYPTO}&vs_currencies=${FIAT}`;
const DELAY = procesS.env.DELAY;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, async (bot) => {
  client.user.setUsername(`${capitalizeFirstLetter(CRYPTO)}`);
  setInterval(async () => {
    const request = await axios
      .get(GECKO_PRICE)
      .then(({ data }) => {
        console.log(data);
        const price = data[`${CRYPTO}`][`${FIAT}`];
        const resultd = price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
        console.log(`${capitalizeFirstLetter(CRYPTO)} price is : ${resultd}`);
        client.user.setActivity(`${resultd}`, {
          type: ActivityType.Watching,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, DELAY);
  console.log(`Ready! Logged in as ${bot.user.tag}`);
});

client.login(token);
