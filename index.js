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
★규칙을 숙지해 주시고 글 밑에 '입쨘' 버튼 눌러주시면 권한을 받음과 동시에 여러 채널(소통방, 사진방 등등)이 공개 됩니다★

-The English explanation is at the bottom.

권한 받지 않아도 공지&방송 알림은 다 받을 수 있습니다~
•밑에 버튼들은 바로가기 링크입니다! 
•자세한 규칙이나 일정은 (공지 채널) #잔잔
•직접 만든 봇이라 매일 알람이 뜨기 때문에 규칙 채널 알림 끄는 것을 추천 드립니다!


[디스코드 규칙]

1. 시청자분들 간에 친목(대화, 언급) X

2. 타 스트리머, 크리에이터 유도&언급 X

3. TMI는 일기장 or [팬카페] 자유 게시판에만 적어 주세요.
(긴 썰이나 고민은 밑에 버튼 사연 링크로 부탁 드립니다.)

4. 불쾌감을 주는 언행 X (도배, 정치, 욕설, 종교 등등)

5. 생방송 중에는 디스코드 사용 금지

다같이 편하게 소통하는 곳이니 예의를 지켜주세요!
위 사항을 지키지 않을 시 경고, 경고 3회 누적 시 강제 추방을 당할 수 있습니다.
(팬아트는 팬카페로 부탁 드립니다. 화질도 더 좋게 올라가요! ㅇㅅㅇ)b)


[Discord Rule]

Please be aware of the rules and press the "입쨘" button at the bottom of the text. At the same time, several channels (communication room, photo room, etc.) will be released.            
Even if you don't have permission, you can get announcements and broadcast notifications.
            
1. Please keep chat in korean, so that the moderators and zanzan can better moderate what’s being said in chat.
2. You can only use foreign languages on Instagram.
3. Don't say anything unrelated to the story.
4. Don't force me to speak foreign languages.
(It's discrimination against other languages.)
5. Please focus on me without making friends with other viewers.
            
If you don't follow the rules, I'll ban you permanently.
            
Thank u for reading it. :D
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