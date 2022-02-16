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
});

client.on('message', async message => {
    if (message.channel.name === rule) {
        var contents = message.content.split(' ');
        if (contents[0] === prefix+'추가') {
            message.delete();
            const content = `\`\`\`
★규칙 숙지 해주시고 글 밑에 '입쨘' 버튼 눌러주시면 권한을 받으실 수 있습니다.★

권한 받지 않아도 공지&방송 알림은 다 받을 수 있습니다~
•밑에는 바로가기 링크! 
•자세한 내용이나 일정은 (공지 채널) 잔잔
            
-The English explanation is at the bottom.
            
            
    쨘엄령 
※규칙 
1. 인사는 '잔하' or '자나'
2. 방송 중에 나가실 때는 조용하게 부탁드립니다. (잔바,오뱅화×)
3. 트수분들간 닉네임 언급,친목 x
4. 언급되지 않은 타 스트리머분 이야기 x 
5. 정치, 욕설, 종교적인 이야기 x
6. 불쾌감을 주는 선 넘는 드립들은 경고 후 벤
7. 클립 생성 하실 때는 제목을 꼭 붙여주세요!!
8. 언팔 협박, 도배는 임차 후 벤
            
            
저는 임차도 잘 드리지 않고 경고나 주의로 드리는 편입니다.
벤은 무조건. 영구벤 입니다
            
            
Rule
            
Korean chat only. (It's a Korean broadcast.)
You can only use foreign languages on Instagram.
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
                    .setLabel('쨘게더')
                    .setStyle('LINK')
                    .setURL('https://tgd.kr/s/zanzan_zz'),
                new MessageButton()
                    .setLabel('인스타그램')
                    .setStyle('LINK')
                    .setURL('https://www.instagram.com/zzaann728/'),
                new MessageButton()
                    .setLabel('팬카페')
                    .setStyle('LINK')
                    .setURL('https://cafe.naver.com/zanzan728')
            );
            message.channel.send({
                content: content,
                components: [row],
                ephemeral: true
            });

            const filter = i => {
                return i.customId === 'btnConfirm';
            };

            const collector = message.channel.createMessageComponentCollector({
                filter
            });

            collector.on('collect', async i => {
                if (i.customId === 'btnConfirm') {
                    const add_role = message.guild.roles.cache.find(role => role.name === '잔망단(잔광단)');
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
        }
    }
});

//개발용
//client.login(token);

//Heroku 전용
client.login(process.env.TOKEN);