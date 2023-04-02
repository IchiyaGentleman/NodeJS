const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Affiche des informations sur le serveur ou l\'utilisateur')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Affiche des informations sur l\'utilisateur')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Affiche des informations sur le serveur')
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            // Informations sur l'utilisateur
            const user = interaction.user;
            const joinedDate = user.joinedAt.toDateString();
            await interaction.reply(
                `Nom d'utilisateur : ${user.username}\nDate d'arrivée sur le serveur : ${joinedDate}`
            );
        } else if (interaction.options.getSubcommand() === 'server') {
            // Informations sur le serveur
            const guild = interaction.guild;
            const memberCount = guild.memberCount;
            await interaction.reply(
                `Nom du serveur : ${guild.name}\nNombre de membres : ${memberCount}`
            );
        }
    },
};
