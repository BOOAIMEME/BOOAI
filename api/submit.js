import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { wallet, twitter } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

  if (!wallet || !twitter) {
    return res.status(400).json({ message: "Missing data" });
  }

  const text = `
  📥 *New BOOAI Airdrop Registration*
  ━━━━━━━━━━━━━━━━
  💳 *Wallet:* ${wallet}
  🐦 *Twitter:* @${twitter}
  `;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });

  return res.status(200).json({ message: "Success" });
}
