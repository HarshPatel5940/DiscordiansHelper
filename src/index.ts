/**
                Copyright [2022] [HarshPatel5940]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

import DiscordJS from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import dotenv from "dotenv";
import { WebhookClient } from "discord.js";

const wait = require("timers/promises").setTimeout;
var timestamp1 = Date.now() / 1000;

dotenv.config();

const client = new DiscordJS.Client({
    intents: 32767,
});

client.on("ready", async () => {
    await wait(1000);
    if (!client.user) return;
    var timestamp2 = client.user.createdTimestamp / 1000;
    console.log(client.user.username, "is online with id = ", client.user.id);

    new WOKCommands(client, {
        commandDir: path.join(__dirname, "commands"),
        featureDir: path.join(__dirname, "features"),

        typeScript: true,

        testServers: ["896301214269063218"],
        botOwners: "448740493468106753",

        mongoUri: process.env.MONGO_URI,

        // <:Success:935099107163394061>
        //<:Fail:935098896919707700>
    }).setDefaultPrefix(">>");

    if (process.env.WEBHOOK) {
        const wc = new WebhookClient({
            id: "967046902178791475",
            token: "WUJ_FnFlbV2hSleHlXcL_LusjiuExL0wJJLzor9UI9EtFZze6gcdcoiZOBjknmvun3I9",
            // process.env.WEBHOOK | let's see how many are copying the bot :D
        });

        wc.send({
            username: client.user.username,
            avatarURL: client.user.displayAvatarURL({ dynamic: true }),
            content: `<@&967042432552275999> ${client.user.username} has logged in\n`,
            embeds: [
                new DiscordJS.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`${client.user.username} is online!!`)
                    .setThumbnail(
                        `${client.user.displayAvatarURL({ dynamic: true })}`
                    ).setDescription(`
                    created-at: <t:${parseInt(timestamp2.toString())}:R>
                    Online From:- <t:${parseInt(timestamp1.toString())}:R>
                    client-id: \`${client.user.id}\`
                    client-url: [CLICK HERE TO SEE PROFILE](https://discord.com/users/${
                        client.user.id
                    })
                        `),
            ],
            tts: true,
        });
    }
});
/*
    1) npm init -y
    2) npm install discord.js dotenv wokcommands ms mongoose
    3) npm install -g typescript ts-node
    4) npm i discord-html-transcripts
    5) tsc -init
    6) tsc -w
    */

client.login(process.env.TOKEN);
