import createExpress, * as express from "express"
import bodyParser from "body-parser";
import https from '@small-tech/https';
import { errorHandler } from "./errorHandler.js";
import { logRequestMiddleware } from "./logRequestMiddleware.js";
import robotsParser from "robots-parser"

const options = {
  domains: ["mc.drazisil.com"],
  settingsPath: "data"
};

const app = createExpress()

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/.well-known/webfinger", (request, response, next) => {
  const resource = String(request.query.resource)

  const acctURI = resource.split(":", 2)[1]
  const options = {
    root: "data"
  }

  response.setHeader("content-type", "application/json")
  response.sendFile(acctURI, options, (err) => {
    next(err)
  })
})

app.post("/explore", async (request, response) => {
  /** @type {{exploreSiteURI: string}} */
  const bodyAsJson = request.body

  const { exploreSiteURI } = bodyAsJson

  console.log(exploreSiteURI)

  const requestHeaders = new Headers()
  requestHeaders.set("User-Agent", `${process.env[""]}`)

  /** @type {RequestInit} */
  const robotsTextRequestInit = {
    headers: requestHeaders
  }

  const robotsTxtURL = new URL("/robots.txt", exploreSiteURI).toString()

  const responseForRobotsText = await (await fetch(robotsTxtURL, robotsTextRequestInit)).text()

  const robots = robotsParser(robotsTxtURL, responseForRobotsText)

  console.log(robots.isAllowed(exploreSiteURI))

  response.redirect(202, "/")
})

app.use(express.static('public'))

app.use(logRequestMiddleware())

app.use(errorHandler)

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