const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN || "";

https.get(`https://api.vercel.com/v2/user`, {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(res.statusCode, body));
});
