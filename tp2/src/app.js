const { Client, Events, GatewayIntentBits,Collection } = require('discord.js');
const conf = require('../conf.json');
const TOKEN = conf.token;
const fs = require('node:fs');
const path = require('node:path');

// Créer un nouveau client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}




const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));
for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
}
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `Aucune commande ${interaction.commandName} n'a été trouvée.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Erreur dans l\'exécution de la commande !',
            ephemeral: true,
        });
    }
});


// Le token permet à votre client de se connecter à Discord
client.login(TOKEN);
