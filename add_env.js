const https = require('https');

const TOKEN = process.env.VERCEL_TOKEN || "";
const PROJECT_ID = "prj_xNg27bn2XqFEAq1thzbKJrgv7ID2"; // bagitall

const envVars = [
  {
    key: "DATABASE_URL",
    value: "postgresql://neondb_owner:npg_M1dUOc5fvVXI@ep-gentle-sea-anoly7qo.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
    type: "plain",
    target: ["production", "preview", "development"]
  },
  {
    key: "ADMIN_PASSWORD",
    value: "bagitall2026",
    type: "plain",
    target: ["production", "preview", "development"]
  },
  {
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://bagitall.vercel.app",
    type: "plain",
    target: ["production", "preview", "development"]
  }
];

function addEnv(env) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(env);
    const req = https.request(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  for (const env of envVars) {
    console.log(`Adding ${env.key}...`);
    const result = await addEnv(env);
    console.log(`Result for ${env.key}:`, result);
  }
  console.log("Environment variables updated!");
})();
