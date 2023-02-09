import createExpress, * as express from "express"
import https from '@small-tech/https';

const options = {
  domains: ["mc.drazisil.com"],
  settingsPath: "data"
};

const app = createExpress()

app.use(express.static('public'))

const server = https.createServer(options, app);

server.listen(443);

// Using a single function to handle multiple signals
/**
 * @param {NodeJS.Signals} signal
 */
function handle(signal) {
  console.log(`\nReceived ${signal}`);
  server.close()
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);