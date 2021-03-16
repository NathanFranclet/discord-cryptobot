const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "!cmoney";





client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        const commande = msg.content.trim().split(" ");
        
        let url = 'https://api.alternative.me/v1/ticker/'+ commande[1];

        let options = {json: true};
        
        
        
        request(url, options, (error, res, body) => {
            if (error) {
                return  console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
        
                jsonString = JSON.stringify(body);
                let non = JSON.parse(jsonString);
                if(Object.values(non)[0].symbol == null) {
                    msg.reply("this cryptocurrency doesn't exist or is not supported by the API.");
                } else {
                    msg.reply('1 ' + Object.values(non)[0].symbol + ' : ' + Math.round(1000*Object.values(non)[0].price_usd)/1000 + ' $');
                }


            };
        });

    }
});

client.login('Here copy the token of your bot');