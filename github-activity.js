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

    // On end of response
    res.on('end', () => {
    if (res.statusCode === 200) {
        const events = JSON.parse(data);
        if (events.length === 0) {
          console.log(' No public activity found for this user.');
          return;
        }
        console.log(`Recent public activity for ${username}:`);
        events.slice(0, 5).forEach((event) => {
          const eventType = event.type;
          const repoName = event.repo.name;
          const createdAt = new Date(event.created_at).toLocaleString();
          console.log(`- [${createdAt}] ${eventType} on ${repoName}`);
        });
    } else {
        console.error(` Failed to fetch data: ${res.statusCode} ${res.statusMessage}`);
    }
    });

}).on('error', (err) => {
  console.error(' Request error:', err.message);
});