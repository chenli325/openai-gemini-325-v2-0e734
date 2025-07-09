import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'node:http'
import worker from "./src/worker.mjs";

const port = +(process.env.PORT || 8080);

const serverAdapter = createServerAdapter(worker.fetch)
const server = createServer({
  // 禁用压缩
  maxHeaderSize: 32768,  // 32KB
  insecureHTTPParser: false,
  noDelay: true,
}, serverAdapter)
server.listen(port, () => {
  console.log('Listening on:', server.address());
})
