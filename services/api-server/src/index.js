const fastify = require('fastify')({ logger: true })

// Health check route
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'ok',
    service: 'pingboard-api-server',
    timestamp: new Date().toISOString()
  }
})

// Root route
fastify.get('/', async (request, reply) => {
  return { 
    message: 'PingBoard API Server is running',
    version: '1.0.0'
  }
})

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('PingBoard API Server running on port 3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()