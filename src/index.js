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
  setInterval(async () => {
    const request = await axios
      .get(QUERY_STRING)
      .then(({ data }) => {
        const formatted = data["formatted"];
        const status = formatted.split(" ")[1];
        const time = `${status.split(":")[0]}:${status.split(":")[1]}`;
        console.log(time);
        client.user.setActivity(`${time}`, {
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
