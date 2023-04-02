const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('prend un input en option et le renvoi à lutilisateur'),
    async execute(interaction) {
        await interaction.reply('Pong!')
        await interaction.followUp('Pong again!')
    },
}