const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Affiche le nom du serveur et son nombre de membres.'),
    async execute(interaction) {
        // Récupérer le nom et le nombre de membres du serveur
        const serverName = interaction.guild.name;
        const serverMembers = interaction.guild.memberCount;
        
        // Envoyer la réponse
        await interaction.reply(`Nom du serveur: ${serverName}\nNombre de membres: ${serverMembers}`);
    },
};
