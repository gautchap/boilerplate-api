import { defineConfig } from '@adonisjs/transmit'
import { redis } from '@adonisjs/transmit/transports'

export default defineConfig({
  pingInterval: '1m',
  transport: {
    driver: redis({
      host: 'redis-boilerplate-cache',
      port: 6379,
      keyPrefix: 'transmit:',
    }),
  },
})
