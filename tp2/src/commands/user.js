const { SlashCommandBuilder,date } = require('@discordjs/builders');
const { time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Affiche le nom de l\'utilisateur et sa date d\'arrivée sur le serveur.'),
    async execute(interaction) {
        // Récupérer le nom et le nombre de membres du serveur
        const userName = interaction.user.username;
        const userJoinDate = interaction.member.joinedAt;

        console.log(interaction.member);
        
        // Envoyer la réponse
        await interaction.reply(`Nom de l\'utilisateur: ${userName}\nDate de rejointage: ${userJoinDate}`);
    },
};
