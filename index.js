console.log('The Bot is running...');

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const fetch = require('node-fetch');
const config = new require('./config.json');

const bot = new Telegraf(config.secret_token);

const things = require('./jsons/things.json');
const { markup } = require('telegraf/extra');
const imageURL = `https://www.randomlists.com/img/things/`;
const words = things.RandL.items;
const chatNumber = '946184024';

function randomFrom(data){
	let w = data[Math.floor(Math.random() * data.length)];

	while(w.split(' ').length > 1){
		w = data[Math.floor(Math.random() * data.length)];
	}

	return w; 
}

function Welcome() {
	bot.command('/start', (ctx) => ctx.reply(`Bienvenido ${ctx.message.from.first_name}!`));
	bot.launch();
}

function Help() {
	bot.command('/help', (ctx) =>
		ctx.replyWithHTML(`
		
		---------------------------------
			  <b>📚 ENGLISH THINGS 📚</b>
		---------------------------------
		
		/word - Obtenen Una Palabra En Ingles y Su Imagen.

		---------------------------------
			  <b>🤖 FUNCIONES 🤖</b>
		---------------------------------

		/wallpaper - Obtenen Una Image 🖼 de fondo 📱.

		---------------------------------
				    <b> 🎮 GAMES 🎮 </b>
		---------------------------------

		/mathgame - Prueba Este Truco matematico.(Desabilitado🚫)
		
		/emojigame - Juega Un Quiz Con Emotico.

		/followMelody - Puede Seguir el sonido 🎶? Pruebalo🎯!
		`
		)
	);
	bot.launch();
}

async function Wallpaper() {
	const imageUrl = 'https://picsum.photos/200/300/?random';
	bot.command('wallpaper', (ctx) => ctx.replyWithPhoto({ url: imageUrl }));
	bot.launch();
	console.log('/wallpaper');
}

async function MathGame() {
// 	console.log('/mathgame');
	bot.command('mathgame',({reply}) => reply('Lo sentimos este juego no esta disponible.'))
// 	var name;
// 	bot.command('mathgame', (ctx) => {
// 		name = ctx.message.from.first_name;
// 		ctx.reply(`Hola ${name}!`);

// 		ctx.reply(
// 			'Quires jugar un juego ?',
// 			Extra.HTML().markup((b) =>
// 				b.inlineKeyboard([ b.callbackButton('Si ✅', 'req'), b.callbackButton('No ❌', 'No ❌') ])
// 			)
// 		);
// 	});
// 	bot.action('req', (ctx) => {
// 		ctx.answerCbQuery(`${name} Empecemos!`);
// 		ctx.reply('Empecemos!');
// 		return ctx.reply('Elige Un Numero del 1-9', Markup.keyboard([ '👍 Listo' ]).oneTime().resize().extra());
// 	});

// 	bot.hears('👍 Listo', (ctx) => {
// 		return ctx.reply('Multiplicalo Por 9', Markup.keyboard([ 'YA!' ]).oneTime().resize().extra());
// 	});

// 	bot.hears('YA!', (ctx) => {
// 		ctx.reply('Suma Los Dos Digitos Del Resultado');
// 		return ctx.reply(
// 			'👀 Si El Resultado Solo Tiene Un Digito Suma 0',
// 			Markup.keyboard([ 'Hecho!' ]).oneTime().resize().extra()
// 		);
// 	});
// 	bot.hears('Hecho!', (ctx) => {
// 		return ctx.reply('Ahora suma 4 al resultado', Markup.keyboard([ 'Listo!' ]).oneTime().resize().extra());
// 	});
// 	bot.hears('Listo!', (ctx) => {
// 		return ctx.reply('TU RESULTADO FINAL ES 13', Markup.keyboard([ 'Cierto!' ]).oneTime().resize().extra());
// 	});

// 	bot.hears('Cierto!', (ctx) => {
// 		return ctx.reply('Lo Se Por La Matematica!! ', Markup.keyboard([ 'FIN!' ]).oneTime().resize().extra());
// 	});
// 	bot.hears('FIN!', (ctx) => {
// 		return ctx.reply(`Adios ${name}`);
// 	});

// 	bot.action('No ❌', (ctx) => {
// 		return ctx.answerCbQuery(`Aw, No ❌! Es Una Pesima Respuesta!`);
// 	});

	bot.launch();
}

async function EmojiQuizGame() {
	console.log('/emojigame');

	const gameUrl = 'https://louislam09.github.io/GuessEmojiGame/';
	const gameShortName = 'emojiQuiz';

	bot.command('emojigame', (ctx) => {
		ctx.replyWithGame(gameShortName);
	});

	bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));

	bot.launch();
}

async function Clima() {
	console.log('/clima');

	const gameUrl = 'https://5f1e1248edb4de54da9fb53c--lucid-jang-e3e295.netlify.app/';
	const gameShortName = 'clima';

	bot.command('clima', (ctx) => {
		ctx.replyWithHTML(`
		<b>Entra en este sitio para saber el clima</b>


		${gameUrl}
		`);
	});

	// bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));

	bot.launch();
}

async function EnglishWord() {
	console.log('/word');

	const imageURL = `https://www.randomlists.com/img/things/`;
	
	bot.command('word', (ctx) => {
		const randomWord = randomFrom(words);
		const imagePath = `${imageURL}${randomWord}.jpg`;
		const chatId = ctx.chat.id;
		ctx.telegram.sendChatAction(chatId,'upload_photo');
		ctx.replyWithHTML(`
			<i>The word</i> <b> ${randomWord.toUpperCase()}</b> <i> means:</i>
			<i>La Palabra</i> <b> ${randomWord.toUpperCase()}</b> <i> Significa:</i>
			${imagePath}
		`);
		
		// ctx.telegram.sendPhoto(chatId,
		// 	imagePath,
		// 	{'caption': ctx.replyWithHTML(`<b>${randomWord.toUpperCase()}</b>`) },
		// 	// {'reply_to_message_id': ctx.message.message_id},
		// 	// {'parse_mode': '<b></b>'}
		// );
		// ${ctx.telegram.sendMessage(chatId, imagePath)};
		
	});
	
	// bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));
	
	bot.launch();
}
// bot.command('quiz', (ctx) =>
//   ctx.replyWithQuiz(
//     '2b|!2b',
//     ['True', 'False'],
//     { correct_option_id: 0 }
//   )
// )

// bot.command('poll', (ctx) =>
//   ctx.replyWithPoll(
//     'Your favorite math constant',
//     ['x', 'e', 'π', 'φ', 'γ'],
//     { is_anonymous: false }
//   )
// )

// async function getInfo() {
// 	bot.command('chatid', (ctx) => {
// 		const chatId = ctx.chat.id;
// 		ctx.reply('El id de este chat es: ' + chatId);
// 		console.log('El id de este chat es: ' + chatId);
// 	});

// }

function InitBotFunctions() {
	try {
		Welcome();
		Help();
		Wallpaper();
		MathGame();
		EmojiQuizGame();
		Clima();
		EnglishWord();
		// getInfo();
	} catch (e) {
		if (e.code === 403) {
			console.log('This is the error:' + e);
		}
	}
}


InitBotFunctions();
