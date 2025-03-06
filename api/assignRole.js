export default async function handler(req, res) {
    if (req.method !== "POST") {
        console.error("❌ Method Not Allowed:", req.method);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { discordUserId } = req.body;
    const botToken = process.env.YOUR_DISCORD_BOT_TOKEN;
    const guildId = process.env.YOUR_GUILD_ID;
    const roleId = process.env.YOUR_ROLE_ID;

    if (!botToken || !guildId || !roleId) {
        console.error("❌ 環境変数が設定されていません");
        return res.status(500).json({ message: "Missing Discord API credentials" });
    }

    console.log(`🔹 Discord APIリクエスト: ユーザーID ${discordUserId}, GuildID ${guildId}, RoleID ${roleId}`);

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

        // ✅ Discord APIのレスポンスの確認
        const text = await response.text(); // JSONでない場合の対策
        console.log("🔹 Discord API レスポンス:", text);

        if (!response.ok) {
            console.error(`❌ Discord API エラー: ${response.status} ${response.statusText}`, text);
            return res.status(response.status).json({ message: text });
        }

        console.log(`✅ ロールを付与しました: ${discordUserId}`);
        return res.status(200).json({ message: "Role assigned successfully" });
    } catch (error) {
        console.error("❌ Discord API へのリクエストに失敗:", error);
        return res.status(500).json({ message: "Discord API request failed", error });
    }
}
