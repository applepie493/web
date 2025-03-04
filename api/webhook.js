const express = require('express');
const { verifySignature, getNonce } = require('../services/signatureService');
const { verifyWalletOwnership } = require('../services/walletService');
const { assignRole } = require('../services/roleService');

const app = express();
app.use(express.json());

app.post('/api/webhook', async (req, res) => {
    const { userId, address, signature } = req.body;

    // nonceを取得
    const nonce = getNonce(userId);
    if (!nonce) {
        return res.status(400).json({ error: '認証メッセージが見つかりません。' });
    }

    // 署名を検証
    if (!verifySignature(address, signature, nonce)) {
        return res.status(400).json({ error: '署名の検証に失敗しました。' });
    }

    // NFTチェック
    const isEligible = await verifyWalletOwnership(address);
    if (isEligible) {
        const member = await discordClient.guilds.cache.get(GUILD_ID).members.fetch(userId);
        await assignRole(member);
        return res.json({ success: true, message: 'NFTを確認し、ロールを付与しました。' });
    } else {
        return res.status(400).json({ error: 'NFTを確認できませんでした。' });
    }
});
/*app.post('/api/webhook', async (req, res) => {
    console.log("✅ Webhook リクエスト受信");
    console.log("🔹 受信したデータ:", req.body);

    const { userId, address, signature } = req.body;

    if (!userId || !address || !signature) {
        console.error("❌ 必要なデータが不足しています:", { userId, address, signature });
        return res.status(400).json({ error: "リクエストに必要なデータが不足しています。" });
    }

    // nonceを取得
    console.log("🔹 取得する userId:", userId);
    console.log("🔹 getNonce の結果:", getNonce(userId));

    const nonce = getNonce(userId);
    if (!nonce) {
        console.error("❌ 認証メッセージが見つかりません");
        return res.status(400).json({ error: '認証メッセージが見つかりません。' });
    }

    // 署名を検証
    if (!verifySignature(address, signature, nonce)) {
        console.error("❌ 署名の検証に失敗:", { address, signature });
        return res.status(400).json({ error: '署名の検証に失敗しました。' });
    }

    console.log("✅ 署名が正しく検証されました");
    res.json({ success: true, message: '署名検証成功' });

      // NFTチェック
    const isEligible = await verifyWalletOwnership(address);
    if (isEligible) {
        const member = await discordClient.guilds.cache.get(GUILD_ID).members.fetch(userId);
        await assignRole(member);
        return res.json({ success: true, message: 'NFTを確認し、ロールを付与しました。' });
    } else {
        return res.status(400).json({ error: 'NFTを確認できませんでした。' });
});*/


app.listen(3000, () => console.log('Webhookサーバー起動！'));
