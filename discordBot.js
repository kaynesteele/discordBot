var discord = require('discord.js');
var client = new discord.Client();
var request = require('request');
var lastSent = new Date();

client.login("", "");
client.on('message', function(message){
	
var messageText = message.content;	
var key = "";


    if(messageText.startsWith("!youtube ")){
        var split_message = messageText.split(/[ ,]+/);
        var afterYoutube = split_message.slice(1, split_message.length);

var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
 afterYoutube.join(', ')+"&key=" + key;

request({
        url: url,
        json: true
}, function(error, response, body){
        var videos = body.items;
        if(new Date() - lastSent > 2000){
       	    for(var i = 0; i < 1; i++){
                var id = videos[i].id.videoId;
                client.reply(message, "https://www.youtube.com/watch?v=" + id);
                 lastSent = new Date();
        	}
        }


});
	};
}); // End of on message function

client.on('message', function(message){

console.log(message.channel.name + "#" +
 message.sender.username + ": " + message.content + "\r\n");

});

client.on('message', function(message){

    if(message.content.startsWith("!joinBot ")){
        var split_message = message.content.split(/[ ,]+/);
        var afterJoin = split_message.slice(1, split_message.length);
	client.joinServer(afterJoin[0], function(server){
        });
    } // end of if
}); // end of on message function

client.on('message', function(message){
    if(message.content === "!leaveBot"){
        client.leaveServer(message.server, function(error){

        });
    } // end of if statement
}); // end of on message function

client.on('message', function(message){
    if(message.content === "!members"){
        for(var i = 0; i < message.server.members.length; i++){
            console.log(message.server.members[i].id + ": " + message.server.members[i].username)
        }
    } // end of if
});


client.on('message', function(message){
    if(message.content === "!help"){
        client.sendMessage(message.channel, "Commands: \r\n" + 
        "!joinBot <inviteUrl> \r\n" +
        "!leaveBot\r\n" + 
        "!youtube <search>\r\n" +
        "!members", function(error){
         });
    };
});

client.on('raw', function(user){
   if(user.t.indexOf('PRESENCE_UPDATE') > -1 && user.d.user != undefined && user.d.game){
      console.log(dict[user.d.user.id] + " Started Playing " + user.d.game.name);
   }

   if(user.t.indexOf('PRESENCE_UPDATE') > -1 && user.d.user != undefined && user.d.game ===null){
      console.log(dict[user.d.user.id] + " Stopped Playing a Game");
   }
});

