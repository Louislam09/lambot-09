const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const config = new require('./config.json');

const gameShortName = 'emojiQuiz';
const gameUrl = 'https://louislam09.github.io/GuessEmojiGame/';

const markup = Extra.markup(Markup.inlineKeyboard([ Markup.gameButton('🎮 Play now!') ]));

const bot = new Telegraf(config.secret_token);
bot.start(({ replyWithGame }) => replyWithGame(gameShortName));
bot.command('foo', ({ replyWithGame }) => replyWithGame(gameShortName, markup));
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));
bot.launch();

// bot.command('game', (ctx) => {
//     ctx.replyWithGame('emojiQuiz');
// });

// const gameUrl = 'https://louislam09.github.io/GuessEmojiGame/';
// bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));
