// Extract username from command line
const username = process.argv[2];

if (!username) {
  console.error('❌ Please provide a GitHub username as a command line argument.');
  process.exit(1);
}

console.log(`🔍 Fetching activity for GitHub user: ${username}`);

// Construct the API URL
const apiUrl = `https://api.github.com/users/${username}/events/public`;

// Import the HTTPS module
const https = require('https');

// Make the GET request
https.get(apiUrl, { headers: { 'User-Agent': 'node.js' } }, (res) => {
  let data = '';

  // Collect data chunks
  res.on('data', (chunk) => {
    data += chunk;
  });

}).on('error', (err) => {
  console.error('❌ Request error:', err.message);
});