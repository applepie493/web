const express = require('express');
const { verifySignature, getNonce } = require('./services/signatureService');
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

app.listen(3000, () => console.log('Webhookサーバー起動！'));
