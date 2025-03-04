const { ROLE_ID } = require('../utils/config');

async function assignRole(member) {
  try {
    const role = member.guild.roles.cache.get(ROLE_ID);
    if (!role) {
      console.error('ロールが見つかりません:', ROLE_ID);
      return;
    }
    await member.roles.add(role);
    console.log(`ロールを付与しました: ${member.user.tag}`);
  } catch (error) {
    console.error('ロール付与エラー:', error);
  }
}

module.exports = { assignRole };
