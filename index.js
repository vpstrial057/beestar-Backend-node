// index.js
require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error("Bot token is not defined. Please check your environment variables.");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Define the guide text
const guideText = `How to play Beestar Kombat 🐝

Full version of the guide: [Beestar Kombat manual](https://beestar-kombat.notion.site/Beestar-Kombat-manual-7e53c342eef143de8bc9c8262ea3a36d)

💰 Tap to earn
Tap the screen and collect honey.

⛏ Harvest
Upgrade hives that will give you passive income opportunities.

⏰ Profit per hour
The hive will produce honey for you on its own, even when you are not in the game for 3 hours. Then you need to log in to the game again.

📈 LVL
The more honey you have on your balance, the higher the level of your hive is and the faster you can earn more honey.

👥 Friends
Invite your fellow bees and you’ll get bonuses. Help a friend move to the next hive leagues and you'll get even more bonuses.

🪙 Token listing
At the end of the season, a honeycomb token will be released and distributed among the players. Dates will be announced in our announcement channel. Stay tuned!

/help to get this guide`;

bot.start((ctx) => {
    ctx.reply(`Hello ${ctx.from.first_name}! Welcome to Beestar Kombat 🐝\n` +
    "You are now the director of a buzzing exchange. Which one? You choose. \n\n" +
    "Tap the hive, collect honey, boost your passive income, and develop your own honey-making strategy.\n" +
    "Your efforts will be appreciated once the honeycomb tokens are listed (the date is coming soon).\n" +
    "Don't forget your fellow bees — bring them into the game and collect even more honey together!");
});

bot.help((ctx) => {
    ctx.reply(guideText);
});

// Setup webhook
app.use(bot.webhookCallback('/webhook'));
bot.telegram.setWebhook('https://beestar-backend.vercel.app/webhook');

app.get('/', (req, res) => {
    res.send('Hello World! Bot is running.');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
