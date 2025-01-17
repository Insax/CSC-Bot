// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

import * as log from "../../utils/logger";
import { getConfig } from "../../utils/configHandler";
const config = getConfig();

/**
 * Creates an assigner message
 *
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} message
 * @param {Array} args
 * @param {Function} callback
 * @returns {Function} callback
 */
export const run = (client, message, args, callback) => {
    if (!args.length) return callback("Keine Rollen angegeben.");

    let roleNames = message.guild.roles.cache
        .filter(element => String(element.name).toLowerCase() !== "@everyone")
        .map(element => element.name);

    if (!args.some(e => roleNames.includes(e))) return callback("Keine dieser Rollen existiert!");

    message.delete().catch(log.error);

    let validRoles = args.filter(value => roleNames.includes(value));

    validRoles.forEach(element => message.channel.send(element).then(msg => msg.react("✅")));

    return callback();
};

export const description = `Startet den assigner mit gegebenen Rollen \nBenutzung: ${config.bot_settings.prefix.mod_prefix}assigner [rolle 1] [rolle 2] [...]`;
