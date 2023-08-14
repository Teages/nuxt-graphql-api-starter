import { createHandler } from 'graphql-http/lib/use/http'
import { schema } from '../modules'

const handler = createHandler({ schema })

export default defineEventHandler((event) => {
  const req = event.node.req
  const res = event.node.res

  // Redirect to playground if the request is from a browser
  if (req.method === 'GET' && req.headers.accept?.includes('text/html')) {
    return sendRedirect(event, '/playground', 302)
  }

  // Handle the graphql request
  return handler(req, res)
})
