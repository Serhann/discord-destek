const { Client, WebhookClient, RichEmbed } = require('discord.js'),
      { token, support } = require('./config.json'),
      { guildID, channel, settings } = support,
      { stripIndents } = require('common-tags'),
      yardimciOlduMuMesaj = "\n\nBu size yardımcı oldu mu?",
      client = new Client();


var channelsAndUsers = [];

client.on('ready', async () => {
    await makeChecks().then(async () => {
        console.log(`${client.user.tag} (${client.user.id})`)
    });
    await client.channels.get(channel.id).fetchMessage(channel.reactMessageID);
    //client.channels.get(channel.id).messages.get(channel.reactMessageID).react('➕');
}); 

client
    .on('message',  async msg => {
        if (msg.author.bot) return;
        let channelsAndUsersObject = await channelsAndUsers.find(obj => obj.REPLY_CHANNEL_ID === msg.channel.id);
        if (channelsAndUsersObject.EMBED_IS_NOT_REPLIED === false) {
            if (msg.content === "?kapat") {
                var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
                hook.send('Bildiriminiz kapatıldı. _kanal 15 saniye sonra silinecektir._').then(async () => {
                    client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                        SEND_MESSAGES: false
                    });
                    msg.channel.delete();
                    setTimeout(() => {
                        client.channels.get(channelsAndUsersObject.CHANNEL_ID).delete().then(async () => {
                            await client.channels.get(support.channel.id).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                VIEW_CHANNEL: null
                            })
                            channelsAndUsers = channelsAndUsers.filter(obj => obj.REPLY_CHANNEL_ID !== msg.channel.id);
                            console.log(channelsAndUsers);
                        })
                    }, 15000);
                })
            }
        }
    })
    .on('message', async msg => {
        if (msg.author.bot) return;
        let channelsAndUsersObject = await channelsAndUsers.find(obj => obj.REPLY_CHANNEL_ID === msg.channel.id);
        if (msg.content === "?kapat") return;
        if (channelsAndUsersObject.EMBED_IS_NOT_REPLIED === false) {
            var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
            return hook.send(msg.author + ': ' + msg.content)
        }
    })
    .on('message', async msg => {
        let channelsAndUsersObject = await channelsAndUsers.find(obj => obj.CHANNEL_ID === msg.channel.id);
        if (channelsAndUsersObject.USER_ID === msg.author.id) {
            if (channelsAndUsersObject.EMBED_IS_NOT_REPLIED === true) {
                if (msg.content === "1" || msg.content === "2" || msg.content === "3" || msg.content === "4" || msg.content === "5" || msg.content === "6") {
                    var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
                    if (msg.content === "1") {
                        var embed = new RichEmbed()
                        .setDescription("Botumuzun tüm komutlarına `svo!yardım` yazarak ulaşabilirsin." + yardimciOlduMuMesaj)
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun");
                        hook.send({ embeds: [embed] }).then(async hookMsg => {
                            client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                SEND_MESSAGES: false
                            })
                            await client.channels.get(msg.channel.id).fetchMessage(hookMsg.id);
                            client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('✅').then(async () => client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('❌'))
                        });
                    }
                    else if (msg.content === "2") {
                        var embed = new RichEmbed()
                        .setDescription("**" + msg.author.username + "**" + " bu bot, aslında sadece küçük çaplı bir sunucu botu olarak kurulmuştur. Ancak ardından yoğun ilgi görmesi üzerine bir herkese açık bot olmuştur. Sahibi Serhan#0001'dir. Kuruluş tarihi 06 Mart 2017'dir." + yardimciOlduMuMesaj)
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun")
                        hook.send({ embeds: [embed] }).then(async hookMsg => {
                            client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                SEND_MESSAGES: false
                            })
                            await client.channels.get(msg.channel.id).fetchMessage(hookMsg.id);
                            client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('✅').then(async () => client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('❌'))
                        });
                    }
                    else if (msg.content === "3") {
                        var embed = new RichEmbed()
                        .setDescription("**" + msg.author.username + "**" + ", bu sunucu Sohbet ve Oyun BOT'un resmi sunucusudur. Sohbet ve Oyun BOT kullanıcılarına destek vermek, tavsiyelerini almak ve sohbet ortamı oluşturmayı amaçlamıştır." + yardimciOlduMuMesaj)
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun")
                        hook.send({ embeds: [embed] }).then(async hookMsg => {
                            client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                SEND_MESSAGES: false
                            })
                            await client.channels.get(msg.channel.id).fetchMessage(hookMsg.id);
                            client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('✅').then(async () => client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('❌'))
                        });
                    }
                    else if (msg.content === "4") {
                        var embed = new RichEmbed()
                        .setDescription("**" + msg.author.username + "**" + ", eğer bot komutlarınıza yanıt vermiyorsa, botu etiketleyerek komut kullanmayı deneyin. Eğer hâlâ bot sizin komutlarınıza cevap vermiyorsa, bunu ekibimize bildirin." + yardimciOlduMuMesaj)
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun")
                        hook.send({ embeds: [embed] }).then(async hookMsg => {
                            client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                SEND_MESSAGES: false
                            })
                            await client.channels.get(msg.channel.id).fetchMessage(hookMsg.id);
                            client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('✅').then(async () => client.channels.get(msg.channel.id).messages.get(hookMsg.id).react('❌'))
                        });
                    }
                    else if (msg.content === "5") {
                        var embed = new RichEmbed()
                        .setDescription("**" + msg.author.username + "**" + ", bu konuda size yardımcı olması için canlı desteği çağırıyorum.")
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun")
                        hook.send({ embeds: [embed] }).then(async () => {
                            await client.channels.get(channelsAndUsersObject.REPLY_CHANNEL_ID).send(`<@&${support.roleID}>, ${msg.author} sizi çağırıyor.`)
                            let newdata=channelsAndUsers.find(o=>o.USER_ID===msg.author.id);
                            newdata.EMBED_IS_NOT_REPLIED = false;
                            channelsAndUsers[channelsAndUsers.findIndex(o=>o.USER_ID===msg.author.id)]=newdata;
                            console.log(channelsAndUsers);
                        })
                    }
                    else if (msg.content === "6") {
                        var embed = new RichEmbed()
                        .setDescription("**" + msg.author.username + "**" + ", canlı desteği çağırıyorum.")
                        .setColor('RANDOM')
                        .setFooter("© 2018 | Sohbet ve Oyun")
                        hook.send({ embeds: [embed] }).then(async () => {
                            await client.channels.get(channelsAndUsersObject.REPLY_CHANNEL_ID).send(`<@&${support.roleID}>, ${msg.author} sizi çağırıyor.`)
                            let newdata=channelsAndUsers.find(o=>o.USER_ID===msg.author.id);
                            newdata.EMBED_IS_NOT_REPLIED = false;
                            channelsAndUsers[channelsAndUsers.findIndex(o=>o.USER_ID===msg.author.id)]=newdata;
                            console.log(channelsAndUsers);
                        })
                    }
                } else {
                    var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
                    return hook.send('Yanlış seçim! Tekrar dene!')
                }
            } else client.channels.get(channelsAndUsersObject.REPLY_CHANNEL_ID).send(`${msg.author.tag}: ${msg.content}`)
        }
    })

    .on('messageReactionAdd', async (msgReact, user) => {
        if (user.bot) return;
        if (msgReact.message.channel.name === "destek" && msgReact.emoji.name === "✅" || msgReact.emoji.name === "❌") {
            if (msgReact.emoji.name === "✅") {
                msgReact.message.clearReactions();
                let channelsAndUsersObject = await channelsAndUsers.find(obj => obj.USER_ID === user.id);
                var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
                hook.send('Buna sevindim! İyi günler dilerim **' + user + '**. _kanal 15 saniye sonra silinecektir._').then(async () => {
                    client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                        SEND_MESSAGES: false
                    })
                    client.channels.get(channelsAndUsersObject.REPLY_CHANNEL_ID).delete();
                    setTimeout(() => {
                        client.channels.get(channelsAndUsersObject.CHANNEL_ID).delete().then(async () => {
                            await client.channels.get(support.channel.id).overwritePermissions(channelsAndUsersObject.USER_ID, {
                                VIEW_CHANNEL: null
                            })
                            channelsAndUsers = channelsAndUsers.filter(obj => obj.USER_ID !== user.id);
                            console.log(channelsAndUsers);
                        })
                    }, 15000);
                })
            }
            else if (msgReact.emoji.name === "❌") {
                msgReact.message.clearReactions();
                let channelsAndUsersObject = await channelsAndUsers.find(obj => obj.USER_ID === user.id);
                client.channels.get(channelsAndUsersObject.CHANNEL_ID).overwritePermissions(channelsAndUsersObject.USER_ID, {
                    SEND_MESSAGES: true
                })
                var hook = new WebhookClient(channelsAndUsersObject.CHANNEL_WEBHOOK_ID, channelsAndUsersObject.CHANNEL_WEBHOOK_TOKEN);
                hook.send('Desteği çağırıyorum. Lütfen bekleyiniz.')
                await client.channels.get(channelsAndUsersObject.REPLY_CHANNEL_ID).send(`<@&${support.roleID}>, ${user} sizi çağırıyor.`)
                let newdata=channelsAndUsers.find(o=>o.USER_ID===user.id);
                newdata.EMBED_IS_NOT_REPLIED = false;
                channelsAndUsers[channelsAndUsers.findIndex(o=>o.USER_ID===user.id)]=newdata;
                console.log(channelsAndUsers);
            }
        } else return;
    })

    .on('messageReactionAdd', async (msgReact, user) => {
        if (user.bot) return;
        if (msgReact.message.guild && msgReact.message.channel.id === channel.id && msgReact.message.guild.member(client.user).hasPermission("ADMINISTRATOR")) {
            msgReact.remove(user.id);
            msgReact.message.channel.overwritePermissions(user, {
                VIEW_CHANNEL: false
            }).then(async () => {
                msgReact.message.guild.createChannel("destek")
                .then(async createdChannel => {
                    createdChannel.overwritePermissions(msgReact.message.guild.id, {
                        VIEW_CHANNEL: false
                    }).then(async () => {
                        createdChannel.overwritePermissions(user, {
                            VIEW_CHANNEL: true
                        }).then(async () => {
                            msgReact.message.guild.createChannel("ticket-" + user.id, "text").then(async replyChannel => {
                                replyChannel.overwritePermissions(msgReact.message.guild.id, {
                                    VIEW_CHANNEL: false
                                }).then(async () => {
                                    replyChannel.overwritePermissions(support.roleID, {
                                        VIEW_CHANNEL: true
                                    }).then(async () => {
                                        await createdChannel.createWebhook('Destek', 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png').then(async webhook => {
                                            channelsAndUsers.push({
                                                "USER_ID": user.id,
                                                "CHANNEL_ID": createdChannel.id,
                                                "CHANNEL_WEBHOOK_ID": webhook.id,
                                                "CHANNEL_WEBHOOK_TOKEN": webhook.token,
                                                "REPLY_CHANNEL_ID": replyChannel.id,
                                                "EMBED_IS_NOT_REPLIED": true
                                            })
                                            var hook = new WebhookClient(webhook.id, webhook.token);
                                            var embed = new RichEmbed()
                                            .setColor(3447003)
                                            .setDescription('Destek hattımıza hoş geldin '  + "**" + user + "**" + '\nLütfen destek almak istediğin konunun başındaki numarayı bu kanala yaz.\n\n`1` - Komutlar hakkında destek istiyorum.\n`2` - Bot detaylı bilgi almak istiyorum.\n`3` - Bu sunucu hakkında destek istiyorum.\n`4` - Bot neden beni takmıyor?\n`5` - Bir şeyi nasıl yapabileceğimi sormak istiyorum.\n`6` - Aradığım şey burada yok, lütfen canlı desteği çağırın.')
                                            .setFooter(`© 2018 | Sohbet ve Oyun`);
                                            hook.send({ embeds: [embed] });
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } else return;
    });

async function makeChecks() {
    console.log('Checking config...');
    if (client.guilds.has(guildID)) {
        if (client.guilds.get(guildID).channels.has(channel.id)) {
            if (client.guilds.get(guildID).channels.get(channel.id).name === channel.name) {
                try {
                    client.guilds.get(guildID).channels.get(channel.id).fetchMessage(channel.reactMessageID).then(async () => {
                        if (settings.everyoneCanCreateSupportTicket === true && settings.roleCanCreateSupportTicket === "" || settings.everyoneCanCreateSupportTicket === false && roleCanCreateSupportTicket ==! "") {
                            console.log('Checks are successfully.');
                        } else throw 'SETTING_VALUE(S)_ARE/IS_NOT_VAILD';
                    })
                } catch(e) {
                    throw e;
                }
            } else throw 'I_FOUND_SUPPORT_CHANNEL_BUT_CHANNELS_NAME_NOT_EQUAL_WITH_CONFIG_VALUE';
        } else throw 'I_CANNOT_FIND_SUPPORT_CHANNEL';
    } else throw 'I_CANNOT_FIND_SUPPORT_GUILD';
};

client.login(token);
