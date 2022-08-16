import { Client } from 'pg';

const client = new Client({
  host: process.env.HOST as string,
  user: process.env.USER as string,
  port: parseInt(process.env.DBPORT as string),
  password: process.env.DBPASSWORD as string,
  database: process.env.DATABASE as string
})

export default client;