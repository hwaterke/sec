import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/database/schema.ts',
  out: './src/database/drizzle',
})
