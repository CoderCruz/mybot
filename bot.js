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


        //startsWith will allow you to add more commands after main command.
    if(message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong. ')
    } else if (message.content === `${prefix}beep`) {
        message.channel.send('Boop')
    }
})

client.login(token)