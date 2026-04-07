const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = process.env.VERCEL_TOKEN || "";
const PROJECT_ID = "prj_xNg27bn2XqFEAq1thzbKJrgv7ID2";
const TEAM_ID = "team_aaLvxsiCK2kFZDroGCvfe32g";

const IGNORE = [
  'node_modules',
  '.next',
  '.vercel',
  '.git',
  '.agents',
  'plugins',
  '.claude-plugin',
  'dev_logs.txt',
  'package-lock.json',
  'balverio.zip',
  'dirty-stains.zip'
];

function getFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    if (IGNORE.includes(file)) continue;
    let filePath = path.join(dir, file);
    let stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      results.push({
        file: relativePath,
        content: fs.readFileSync(filePath).toString('base64'),
        encoding: 'base64'
      });
    }
  }
  return results;
}

(async () => {
  console.log("Reading files...");
  const files = getFiles(process.cwd());
  console.log(`Read ${files.length} files.`);

  const deploymentData = {
    name: "bagitall",
    project: PROJECT_ID,
    target: "production",
    files: files.map(f => ({
      file: f.file,
      data: f.content,
      encoding: f.encoding
    }))
  };

  const body = JSON.stringify(deploymentData);
  console.log(`Payload size: ${(body.length / 1024 / 1024).toFixed(2)} MB`);

  const options = {
    hostname: 'api.vercel.com',
    path: `/v13/deployments?teamId=${TEAM_ID}`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  console.log("Starting deployment...");
  const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => { responseBody += chunk; });
    res.on('end', () => {
      console.log('Response Status:', res.statusCode);
      try {
        const result = JSON.parse(responseBody);
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('SUCCESS! Deployment URL:', result.url);
          console.log('Inspect URL:', `https://vercel.com/mehulsharma314s-projects/bagitall/${result.id}`);
        } else {
          console.error('FAILED:', result);
        }
      } catch (e) {
        console.error('Error parsing response:', responseBody);
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request Error:', e);
  });

  req.write(body);
  req.end();
})();
