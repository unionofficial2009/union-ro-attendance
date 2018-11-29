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
  
 if (message.channel.id == 510330472119926785) {
   
   if (message.attachments.size == 0) {
      message.delete().catch(O_o=>{});
  }
   
 }
  
  
//if(message.author.bot) return;
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
  
  
  
    if(cmd === `${prefix}mpending`){
    let romemberRole = message.guild.roles.find("name", "RO - Member");
    if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**RO Pending List**\n";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "RO - Pending").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;  
         mlist = mlist + `${mmcount}. <@${guildMember.user.id}>\n`
        
        
      }  
      
         
      
      })
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    } else {
     message.reply("You don't have the permission to use this command.");
   }
    
  }
  
  
   if(cmd === `${prefix}g1`){
    //let romemberRole = message.guild.roles.find("name", "Attendance Bots");
    //if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Active Guild Members - 6AM to 12PM**\n\n";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "G1 6AM-12PM").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;
        
        if(mcount == mmcount){
          mlist = mlist + `<@${guildMember.user.id}> `;
        } else {
          mlist = mlist + `<@${guildMember.user.id}>, `;  
        }   
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your playing time here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    //} else {
    //  message.reply("You don't have the permission to use this command.");
    //}
    
  }
  
  if(cmd === `${prefix}g2`){
    //let romemberRole = message.guild.roles.find("name", "Attendance Bots");
    //if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Active Guild Members - 12PM to 6PM**\n\n";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "G2 12PM-6PM").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;  
         mlist = mlist + `${mmcount}. <@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your playing time here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    //} else {
    // message.reply("You don't have the permission to use this command.");
   //}
    
  }
  
  if(cmd === `${prefix}g3`){
    //let romemberRole = message.guild.roles.find("name", "Attendance Bots");
    //if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Active Guild Members - 6PM to 12AM**\n\n";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "G3 6PM-12AM").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your playing time here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    //} else {
   //  message.reply("You don't have the permission to use this command.");
   //}
    
  }
  
   if(cmd === `${prefix}g4`){
    //let romemberRole = message.guild.roles.find("name", "Attendance Bots");
    //if(message.member.roles.has(romemberRole.id)) {
      
      
      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Active Guild Members - 12AM to 6AM**\n\n";
      
      guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "G4 12AM-6AM").size; 
        
      if(mcount > 0){
         mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your playing time here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    //} else {
    // message.reply("You don't have the permission to use this command.");
   //}
    
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
