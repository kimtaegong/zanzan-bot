const { Client, Intents, MessageActionRow, MessageButton } = require("discord.js");
const { rule } = require('./channel_ids.json');

//const { token } = require("./config.json");

const prefix = '?';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.on('ready', () => {
    console.log('Zanzan Bot is ready.');

    client.channels.cache.get('892987643602804797').bulkDelete(1).then(console.log(`Message ${1} deleted`))
    const content = `\`\`\`
★규칙 숙지 해주시고 글 밑에 '입쨘' 버튼 눌러주시면 권한을 받으실 수 있습니다.★

권한 받지 않아도 공지&방송 알림은 다 받을 수 있습니다~
•밑에는 바로가기 링크! 
•자세한 내용이나 일정은 (공지 채널) 잔잔
•직접 만든 봇이라 매일 알람이 뜨기 때문에 규칙 채널 알림 끄는 것을 추천 드립니다!

-The English explanation is at the bottom.
            
            
    쨘엄령 
※규칙 
1. 시청자 수 언급, 시청자 닉 언급, 친목 x
3. 타 스트리머분 언급, 유도 x
4. 방송과 관련 없는 이야기 x  (TMI는 사연으로)
5. 완장질 x (무분별한 '해주세요', '하지마세요')
6. 불쾌감을 주는 언행 x (정치, 종교, 욕설, 폄하,도배 등등)
7. 방송 중에 나가실 때는 조용하게 부탁 드립니다. 
            
            
클립은 제목을 꼭 붙여주세요.
(제목이 없는 클립, 잔잔과 연관 없는 클립들은 전부 삭제됩니다)

다같이 보는 방송입니다.
모두가 편하게 소통하실 수 있게 예의를 지켜주세요.
            
            
Rule
            
Korean chat only. (It's a Korean broadcast.)
You can only use foreign languages on SNS.
Don't say anything unrelated to the story during the broadcast.
Don't force me to speak foreign languages.
(It's discrimination against other languages.)
Please focus on me without making friends with other viewers.
            
If you don't follow the rules, I'll ban you permanently.
            
Please read the rules and click the '입쨘' button at the bottom of the post, you will receive permission.
            
Thank u for reading it 
            \`\`\``;
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('입쨘')
                    .setStyle('PRIMARY')
                    .setCustomId('btnConfirm'),
                new MessageButton()
                    .setLabel('트위치')
                    .setStyle('LINK')
                    .setURL('https://www.twitch.tv/zanzan_zz'),
                new MessageButton()
                    .setLabel('팬카페')
                    .setStyle('LINK')
                    .setURL('https://cafe.naver.com/zanzan728'),
                new MessageButton()
                    .setLabel('사연')
                    .setStyle('LINK')
                    .setURL('https://docs.google.com/forms/d/1AO5SSW-kbcctteUPjOdn_1saVBIiwu34URlbnS9mZE4/edit'),
                new MessageButton()
                    .setLabel('인스타그램')
                    .setStyle('LINK')
                    .setURL('https://www.instagram.com/zzaann728/')
            );
            client.channels.cache.get('892987643602804797').send({
                content: content,
                components: [row],
                ephemeral: true
            });

            const filter = i => {
                return i.customId === 'btnConfirm';
            };

            const collector = client.channels.cache.get('892987643602804797').createMessageComponentCollector({
                filter
            });

            collector.on('collect', async i => {
                if (i.customId === 'btnConfirm') {
                    const add_role = client.channels.cache.get('892987643602804797').guild.roles.cache.find(role => role.name === '잔망단(잔광단)');
                    var isDouble = false;
                    for (let j = 0; j < i.member.roles.cache.size; j++) {
                        if (i.member.roles.cache.at(j).name === '잔망단(잔광단)') {
                            isDouble = true;
                            break;
                        }
                    }
                    if (isDouble) {
                        await i.reply({
                            content: '\`\`\`이미 권한을 부여받았습니다.\`\`\`',
                            ephemeral: true
                        });
                    } else {
                        i.member.roles.add(add_role);
                        client.channels.cache.get('943374629987319838').send(`\`\`\`${i.member.user.username}(${i.member.id})님이 \"잔망단(잔광단)\" 권한을 부여받았습니다.\`\`\``);
                        await i.reply({
                            content: '\`\`\`\"**잔망단(잔광단)**\" 입쨘하셨습니다.\`\`\`',
                            ephemeral: true
                        });
                    }
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            })
});

client.on('message', async message => {
    if (message.content === '^id') {
        message.channel.send(message.channelId)
    }
    if (message.channel.name === rule) {
        var contents = message.content.split(' ');
        if (contents[0] === prefix+'추가') {
            message.delete();
            
        }
    }
});

//개발용
//client.login(token);

//Heroku 전용
client.login(process.env.TOKEN);