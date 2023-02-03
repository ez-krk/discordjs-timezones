require("dotenv").config();
const axios = require("axios");

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

const { token } = process.env.DISCORD_TOKEN;
const timezone = process.env.TIMEZONE;
const key = process.env.API_KEY;

const QUERY_STRING = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=zone&zone=${timezone}`;

const DELAY = process.env.DELAY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, async (bot) => {
  client.user.setUsername(`${timezone}`);

  const request = await axios
    .get(QUERY_STRING)
    .then(({ data }) => {
      const time = data["formatted"];
      const status = time.split(" ")[1];
      client.user.setActivity(`${status}`, {
        type: ActivityType.Watching,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(`Ready! Logged in as ${bot.user.tag}`);
});

client.login(token);
