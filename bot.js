//always need these for starting a discord bot along with log in and once
const Discord = require('discord.js')
const client = new Discord.Client()

const { prefix, token } = require('./config.json')

client.once('ready', () => {
    console.log('Ready!')
})

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

//this is how you listen to messages in channel
client.on('message', message => {
    //command message.content is how to access content
    // console.log(message.content)

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //same as below creating and accessing commands
    const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);

    //this is how we would create and access our commands
    // const args = message.content.slice(prefix.length).trim().split(/ +/)
    // const command = args.shift().toLowerCase();


        //startsWith will allow you to add more commands after main command.
    if(message.content.startsWith(`${prefix}brianpls`)) {
        return message.channel.send(`brian please get off Jose's dick \n brian please get off Jose's dick \n brian please get off Jose's dick` )
    } else if (message.content === `${prefix}beep`) {
        message.channel.send('Boop')
    } else if(message.content === `${prefix}server`) {
        message.channel.send(`This server's name is ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
    } else if (message.content === `${prefix}user-info`) {
        message.channel.send(`your username: ${message.author.username}\nYour ID: ${message.author.id}`)
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

	    message.channel.send(`First argument: ${args[0]}`);
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }

        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
    
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === 'avatar') {
        if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
    } else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.')
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    }
})

client.login(token)