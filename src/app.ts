import express from 'express';
import client from './config/db';
import route from './routes/filedirectory';
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

export const app = express();
app.use(express.json());

async function main() {
  cloudinary.config({
    cloud_name: process.env.CLOUD as string,
    api_key: process.env.API_KEY as string,
    api_secret: process.env.API_SECRET_KEY as string,
  });

  await client.connect();

  app.get('/livecheck', (req, res) => {
    res.status(200).send('Working');
  })

  app.use('/api/v1', route)
}
main();
