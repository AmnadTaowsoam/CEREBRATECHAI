const crypto = require('crypto');

// Function to generate random keys
const generateKey = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate AUTH_SERVICE_API_KEY
const authServiceApiKey = generateKey(32); // 32-byte key, 64 characters in hex

// Generate CHATBOT_SERVICE_API_KEY
const chatbotServiceApiKey = generateKey(32); // 32-byte key, 64 characters in hex

// Generate JWT_SECRET
const jwtSecret = generateKey(64); // 64-byte key, 128 characters in hex

console.log("AUTH_SERVICE_API_KEY:", authServiceApiKey);
console.log("CHATBOT_SERVICE_API_KEY:", chatbotServiceApiKey);
console.log("JWT_SECRET:", jwtSecret);
