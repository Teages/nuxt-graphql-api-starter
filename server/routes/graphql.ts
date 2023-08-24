import { createHandler } from 'graphql-http/lib/use/http'
import { schema } from '../modules'
import { buildContext } from '../modules/context'

const handler = createHandler({
  schema,
  context(req, params) {
    return buildContext(req, params)
  },
})

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
