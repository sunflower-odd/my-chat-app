import express from 'express';
import crypto from 'crypto';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(express.json());

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(cors());

let token = null;

console.log("Начинаем получать токен")

// Получение access_token по API key
const getToken = async () => {
  console.log('Получаем новый токен GigaChat...');
  const res = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    agent: httpsAgent,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'RqUID': crypto.randomUUID(),
      'Authorization': 'Basic MDE5ZDRlZjYtOGJmZS03NGM2LTgwOWYtZWQ5ZTY5NzgzOTU2OjlmMzc3MTliLTM5YzktNDY1Zi05N2M5LWRkOWIxYmNhMzZmZA==',
    },
    body: 'scope=GIGACHAT_API_PERS',
  });

  if (!res.ok) {
    throw new Error(`Ошибка получения токена: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Нет access_token в ответе: ${JSON.stringify(data)}`);
  }

  console.log('Токен получен:', data.access_token);
  return data.access_token;
};

// Endpoint для чата
app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.messages;

    // Проверка, что messages есть и это массив
    if (!messages || !Array.isArray(messages)) {
      console.log('Неверные данные в теле запроса:', req.body);
      return res.status(400).json({ error: 'messages отсутствуют или не массив' });
    }

    console.log('BODY запроса:', JSON.stringify(messages, null, 2));

    // Получаем токен, если его нет
    if (!token) {
      token = await getToken();
    }

    console.log('Используем токен:', token);

    // Отправка сообщений в GigaChat
    const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
      method: 'POST',
      agent: httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: "GigaChat-2",
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`GigaChat вернул ошибку: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Ответ GigaChat:', JSON.stringify(data, null, 2));

    res.json(data);
  } catch (e) {
    console.error('Ошибка на сервере:', e);
    res.status(500).json({ error: 'GigaChat error', details: String(e) });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));