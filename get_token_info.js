const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN || "";

https.get('https://api.vercel.com/v2/user', {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log("User Info:", body);
    https.get('https://api.vercel.com/v2/teams', {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    }, (res2) => {
      let body2 = '';
      res2.on('data', d => body2 += d);
      res2.on('end', () => console.log("Teams Info:", body2));
    });
  });
});
