export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { discordUserId } = req.body;
    const botToken = process.env.YOUR_DISCORD_BOT_TOKEN;
    const guildId = process.env.YOUR_GUILD_ID;
    const roleId = process.env.YOUR_ROLE_ID;

    if (!botToken || !guildId || !roleId) {
        return res.status(500).json({ message: "Missing Discord API credentials" });
    }

    try {
        const response = await fetch(
            `https://discord.com/api/guilds/${guildId}/members/${discordUserId}/roles/${roleId}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bot ${botToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ message: errorData });
        }

        return res.status(200).json({ message: "Role assigned successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Discord API request failed", error });
    }
}
