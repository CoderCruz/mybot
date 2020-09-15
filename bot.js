//always need these for starting a discord bot along with log in and once
const Discord = require('discord.js')
const client = new Discord.Client()

const { prefix, token } = require('./config.json')

client.once('ready', () => {
    console.log('Ready!')
})

//this is how you listen to messages in channel
client.on('message', message => {
    //command message.content is how to access content
    // console.log(message.content)

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //this is how we would create and access our commands
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();


        //startsWith will allow you to add more commands after main command.
    if(message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong. ')
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
    }
})

client.login(token)