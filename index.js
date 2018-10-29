const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
let cooldown = new Set();
let cdseconds = 86400;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("&present for Attendance", {type: "WATCHING"});
  
});

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;
  
let prefix = botconfig.prefix;
  
  if(!message.content.startsWith(prefix)) return;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);
    
 if(cmd === `${prefix}present`){
    let akmemberRole = message.guild.roles.find("name", "RO - Member");
   if(message.member.roles.has(akmemberRole.id)) {
   if(cooldown.has(message.author.id)){
    message.delete();
  return message.reply("You have to wait 1 day.")
  }
  cooldown.add(message.author.id);
     
  let c_user = message.author   
  let bicon = c_user.displayAvatarURL;   
  let bicon2 = bot.user.displayAvatarURL;   
     
  let attendanceEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author}`)
  .addField("Username", `${message.author.username}`)
  .addField("Tag", `${message.author.tag}`)
  .addField("ID", `${message.author.id}`)
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Attendance", "Present")
  .setTimestamp()
  .setFooter("UNION RO Attendance",bicon2);
  
  let attendancechannel = message.guild.channels.find(`name`, "ro-attendance");
  if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");
  
  
  message.delete().catch(O_o=>{});
  attendancechannel.send(attendanceEmbed);
      } else {
     message.reply("You don't have the permission to use this command.");
   }
   setTimeout(() => {
      cooldown.delete(message.author.id)
      }, cdseconds * 1000)

    
  }
  
  if(cmd === `${prefix}mcount`){
    let romemberRole = message.guild.roles.find("name", "RO - Member");
    if(message.member.roles.has(romemberRole.id)) {
      
      //let ignchannel = message.guild.channels.find(`name`, "ro-members-ign");
      //if (!ignchannel) return message.channel.send("Couldn't find attendance channel.");
      
      //ignchannel.fetchMessages()
      //.then(messages => {
      
       
      //message.reply(`**${messages.size}** RO Members`);
      //message.delete().catch(O_o=>{});  
      //}).catch(console.error);
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "RO - Member").size;  
      
      mmcount = mmcount + mcount;   
      
      })
      
      message.reply(`**${mmcount}** RO Members`);
      message.delete().catch(O_o=>{});  
      
    } else {
     message.reply("You don't have the permission to use this command.");
   }
    
  }  
  
  if(cmd === `${prefix}mlist`){
    let romemberRole = message.guild.roles.find("name", "RO - Member");
    if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "RO - Member").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;  
         mlist = mlist + `${mmcount}. ${guildMember.username}\n`
        
        
      }  
      
         
      
      })
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    } else {
     message.reply("You don't have the permission to use this command.");
   }
    
  }
  
  if(cmd === `${prefix}botinfo`){
   
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username);
   
  return message.channel.send(botembed);
}
    
});

bot.login(process.env.BOT_TOKEN);
