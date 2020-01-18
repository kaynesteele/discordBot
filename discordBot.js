var discord = require('discord.js');
var client = new discord.Client();
var request = require('request');
var lastSent = new Date();

client.login("fiercedeityninja420@gmail.com", "B2q9h3iq");
client.on('message', function(message){
	
var messageText = message.content;	
var key = "AIzaSyCAQoqEnJUM-FEWgni5Nwv_0gK9zAZF4YY";


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

dict = {
"99374238514806784": "Ryan",
"100271695167758336": "ImpaledLegacy",
"100346956856971264": "ImpaledLuck",
"100422679521140736": "FierceDeityNinja",
"120246728258617345": "BrossKnuckles",
"120614315987304449": "Dickman9000",
"123140881330077699": "Fucking Memes",
"126459748521345024": "CompoundList",
"129034374002900992": "Drugswithhugs",
"131819976414855168": "Zeke1498",
"131825624326078464": "BootyTwang",
"132573058773942272": "Politicaltoe1",
"133407850616717313": "Crawf0rd",
"134891984203546624": "PoppityPlopJr",
"135092670962991104": "ObeseNoLife",
"199947744222248960": "fiercedeitybot"
};

