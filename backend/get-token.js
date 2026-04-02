import crypto from 'crypto';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false, 
});

(async () => {
  try {
    console.log('Получаем токен...');

    const res = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
      method: 'POST',
      agent, 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': crypto.randomUUID(),
        'Authorization': 'Basic MDE5ZDRlZjYtOGJmZS03NGM2LTgwOWYtZWQ5ZTY5NzgzOTU2OjlmMzc3MTliLTM5YzktNDY1Zi05N2M5LWRkOWIxYmNhMzZmZA==',
      },
      body: 'scope=GIGACHAT_API_PERS',
    });

    const text = await res.text();

    console.log('STATUS:', res.status);
    console.log('BODY:', text);

  } catch (e) {
    console.error('ERROR:', e);
  }
})();