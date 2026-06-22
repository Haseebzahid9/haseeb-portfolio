const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS for resolving Atlas hostnames (bypasses ISP DNS blocks)
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

// Custom lookup: uses dns.resolve4 (Google DNS) instead of OS dns.lookup
function customLookup(hostname, options, callback) {
  dns.resolve4(hostname, (err, addresses) => {
    if (err) return callback(err);
    callback(null, addresses[0], 4);
  });
}

const connectDB = async () => {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`MongoDB connection attempt ${attempt}/${maxRetries}...`);
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 20000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 20000,
        family: 4,
        lookup: customLookup,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) {
        console.error('All connection attempts failed. Exiting.');
        process.exit(1);
      }
      console.log(`Retrying in 3 seconds...`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
};

module.exports = connectDB;
