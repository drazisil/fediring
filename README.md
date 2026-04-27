# FediRing

Web rings for the Fediverse.

Webrings are an old idea: a ring of related websites, each linking to the next, that you could follow to discover new corners of the internet. FediRing brings that idea to the modern independent web, built on top of [ActivityPub](https://www.w3.org/TR/activitypub/) and [WebFinger](https://webfinger.net/).

## Philosophy

- **Respect autonomy.** Before exploring a site, FediRing checks its `robots.txt`. If crawling isn't allowed, it stops there.
- **Small technology.** Built with [Small Tech Foundation's](https://small-tech.org/) HTTPS library. Runs as a single personal server, not a platform.
- **The old web was good, actually.** Webrings predate algorithmic feeds, engagement optimization, and the silo era. They worked because people chose to be in them.

## What's implemented

- WebFinger endpoint (`.well-known/webfinger`) — serves identity files for fediverse lookup
- Site submission form — accepts a URL, checks `robots.txt`, queues it for async processing (202 Accepted)
- Express server with HTTPS, request logging, and error handling

## What's not implemented yet

- Background processing of submitted sites (the async half of the 202 flow)
- Ring navigation — next/previous links between members
- Member listing
- Actual webfinger data beyond a test fixture

## Running

\`\`\`bash
npm install
node server.js
\`\`\`

Expects to run on a domain with HTTPS. The domain and settings path are configured in \`server.js\`.

## License

GPL-3.0 — see \`COPYING\`.
