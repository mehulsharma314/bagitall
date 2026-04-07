const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN || "";
const PROJECT_ID = "prj_xNg27bn2XqFEAq1thzbKJrgv7ID2";

https.get(`https://api.vercel.com/v9/projects/${PROJECT_ID}`, {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(JSON.parse(body).accountId));
});
