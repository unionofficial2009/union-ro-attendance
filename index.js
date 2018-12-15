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
  
 if(cmd === `${prefix}test`){
   
   let guildmembers = message.guild.members;
   let mmcount = 0;
   let myattendance = 0;
   
    guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "RO - Member").size;  
      
      mmcount = mmcount + mcount;   
      
    })
   
    let ignchannel = message.guild.channels.find(`name`, "ro-attendance");
    if (!ignchannel) return message.channel.send("Couldn't find attendance channel.");
   
   //mmcount
   
   ignchannel.fetchMessages({ limit: mmcount })
   .then(messages => {
      
      //message.reply(messages.map(m=> `${m.createdAt.getMonth()+1}-${m.createdAt.getDate()}-${m.createdAt.getFullYear()}`).join(", ")) 
      //message.reply(messages.map(m=> `${m.embeds[0].createdAt}`).join(", "));
      //message.reply(messages.map(m=> `${m.embeds[0].fields[0].value}`).join(", "));
     
      messages.forEach(function(message,messageid) {
        
        if(message.embeds[0].fields[0].value == message.member.displayName){
          myattendance = myattendance + 1;
        }  
        
     })   
     
     if (myattendance > 0){
       return message.reply("You have to wait 1 day.")  
     }  
       
      message.delete().catch(O_o=>{});  
   }).catch(console.error);
   
 }   
 if(cmd === `${prefix}present`){
   
   if(message.author.bot){
     
     
     message.reply(`hey ${message.author.username} pisot`);
     
     let c_user = message.author   
     let bicon = c_user.displayAvatarURL;   
     let bicon2 = bot.user.displayAvatarURL; 
     
     let attendanceEmbed = new Discord.RichEmbed()
     .setDescription(`${message.author}`)
     .addField("Display Name", `${message.author.username}`)
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
  .addField("Display Name", `${message.member.displayName}`)
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
         //mmcount = mmcount + 1;     
          mlist = mlist + `<@${guildMember.user.id}>, `;       
      }                     
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your PLAYING TIME here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n📢 **Please select your JOB CLASSES here** :arrow_right: <#518252120181309440>";
      mlist = mlist + "\n📢 **Please check ASSISTING RULES here** :arrow_right: <#489809878261563403>";
      mlist = mlist + "\n📢 **Please check WEEKLY ASSISTING SCHEDULES here** :arrow_right: <#518251051703468042>";
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
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your PLAYING TIME here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n📢 **Please select your JOB CLASSES here** :arrow_right: <#518252120181309440>";
      mlist = mlist + "\n📢 **Please check ASSISTING RULES here** :arrow_right: <#489809878261563403>";
      mlist = mlist + "\n📢 **Please check WEEKLY ASSISTING SCHEDULES here** :arrow_right: <#518251051703468042>";
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
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your PLAYING TIME here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n📢 **Please select your JOB CLASSES here** :arrow_right: <#518252120181309440>";
      mlist = mlist + "\n📢 **Please check ASSISTING RULES here** :arrow_right: <#489809878261563403>";
      mlist = mlist + "\n📢 **Please check WEEKLY ASSISTING SCHEDULES here** :arrow_right: <#518251051703468042>";
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
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
      }  
      
         
      
      })
      
      mlist = mlist + "\n\n**Please PM them if you need assistant in:**\n\n";
      mlist = mlist + ":pushpin:Guild Dojo Challenge\n:pushpin:Guild Quest";
      mlist = mlist + "\n:pushpin:Guild Dungeon - Vahalla Ruin\n:pushpin:Rift";
      mlist = mlist + "\n:pushpin:Endless Tower\n:pushpin:Training Ground";
      mlist = mlist + "\n\n📢 **Please select your PLAYING TIME here** :arrow_right: <#517167677266198542>";
      mlist = mlist + "\n📢 **Please select your JOB CLASSES here** :arrow_right: <#518252120181309440>";
      mlist = mlist + "\n📢 **Please check ASSISTING RULES here** :arrow_right: <#489809878261563403>";
      mlist = mlist + "\n📢 **Please check WEEKLY ASSISTING SCHEDULES here** :arrow_right: <#518251051703468042>";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
      
    //} else {
    // message.reply("You don't have the permission to use this command.");
   //}
    
  }
  
  if(cmd === `${prefix}et1to50`){

      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Guild Members looking for party - Endless Tower floor 1-50\n\n**";

     if (message.channel.id == 521697035439833088) {

       guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "Endless Tower floor 1-50").size; 
        
      if(mcount > 0){
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
       }  
      
         
      
      })
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
       
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     }  
    
  }  
  
  
  if(cmd === `${prefix}et51to90`){

      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Guild Members looking for party - Endless Tower floor 51-90\n\n**";

     if (message.channel.id == 521697035439833088) {

       guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "Endless Tower floor 51-90").size; 
        
      if(mcount > 0){
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
       }  
      
         
      
      })
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     }  
    
  }
  
  if(cmd === `${prefix}dojo`){

      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Guild Members looking for party - Guild Dojo Challenge\n\n**";

     if (message.channel.id == 521697035439833088) {

       guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "Guild Dojo Challenge").size; 
        
      if(mcount > 0){
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
       }  
      
         
      
      })
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     }  
    
  }
  
  if(cmd === `${prefix}vr40`){

      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Guild Members looking for party - Vahalla Ruins 40\n\n**";

     if (message.channel.id == 521697035439833088) {

       guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "Vahalla Ruins 40").size; 
        
      if(mcount > 0){
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
       }  
      
         
      
      })
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
       
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     }  
    
  }
  
  if(cmd === `${prefix}vr60`){

      let guildmembers = message.guild.members;
      
      let mmcount = 0;
      let mlist = "**Guild Members looking for party - Vahalla Ruins 60\n\n**";

     if (message.channel.id == 521697035439833088) {

       guildmembers.forEach(function(guildMember, guildMemberId) {
        
      let mcount = guildMember.roles.filter(r => r.name == "Vahalla Ruins 60").size; 
        
      if(mcount > 0){
         //mmcount = mmcount + 1;  
         mlist = mlist + `<@${guildMember.user.id}>, `;
        
        
       }  
      
         
      
      })
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
       
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     }  
    
  }
  
  
  
  if(cmd === `${prefix}ptforming`){

     
      let mlist = "**Party Forming**";

     //if (message.channel.id == 521697035439833088) {
       
      mlist = mlist + "\n\n📢 **Please select party forming roles here** :arrow_right: <#523341123289088000>";
      mlist = mlist + "\n📢 **Please remove party forming roles after you finished the party runs.**";
      mlist = mlist + "\n\n**Party Forming Commands:**"; 
      mlist = mlist + "\n1. &et1to50 for Endless Tower floor 1-50";  
      mlist = mlist + "\n2. &et51to90 for Endless Tower floor 51-90"; 
      mlist = mlist + "\n3. &dojo for Guild Dojo Challenge"; 
      mlist = mlist + "\n4. &vr40 for Vahalla Ruins 40";  
      mlist = mlist + "\n5. &vr60 for Vahalla Ruins 60";
       
      mlist = mlist + "\n\n<@&489776631913906199>";
      
      message.reply(`${mlist}`);
      message.delete().catch(O_o=>{});  
       
     //}  
    
  }
  
  if(cmd === `${prefix}assist_sched`){
    
     let guildmembers = message.guild.members;
     let msched = [];
     let mlist = "**Weekly Assist Schedule**";
    
     guildmembers.forEach(function(guildMember, guildMemberId) {
       
     let mcount = guildMember.roles.filter(r => r.name == "RO - Member").size;   
     let mpending = guildMember.roles.filter(r => r.name == "RO - Pending").size; 
     let minactive = guildMember.roles.filter(r => r.name == "RO - Inactive").size;  
               
       
       if(mcount > 0 && mpending == 0 && minactive == 0){
         msched.push(guildMember.user.id);   
         
       }  
       
       
     }) 
    
    
    msched.sort(function(a, b){return 0.5 - Math.random()});
    
    var arrayLength = msched.length;
    
    for (var i = 0; i < 70; i++) {
      
        if(i==0)mlist = mlist + "\n\n**Monday**\n"
        if(i==10)mlist = mlist + "\n\n**Tuesday**\n"
        if(i==20)mlist = mlist + "\n\n**Wednesday**\n"
        if(i==30)mlist = mlist + "\n\n**Thursday**\n"
        if(i==40)mlist = mlist + "\n\n**Friday**\n"
        if(i==50)mlist = mlist + "\n\n**Saturday**\n"
        if(i==60)mlist = mlist + "\n\n**Sunday**\n"
        mlist = mlist + `<@${msched[i]}>, `;
    
    }
    
    
     mlist = mlist + "\n\n<@&489776631913906199>";
     message.reply(`${mlist}`);
     message.delete().catch(O_o=>{});
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
