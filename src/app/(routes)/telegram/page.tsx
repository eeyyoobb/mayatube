import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body;

        if (message && message.text) {
            const chatId = message.chat.id;
            const responseText = `You said: ${message.text}`;

            await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
                chat_id: chatId,
                text: responseText,
            });
        }

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
