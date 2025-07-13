import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { showContacts, showContactById } from './controllers/contactsController.js';
import { getEnvVariable } from './utilts/getEnvVariable.js';

const PORT = getEnvVariable('PORT') || 8080;

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', showContacts);
  app.get('/contacts/:contactId', showContactById);

  app.get((req, res) => {
    res.status(404).json({ message: 'not found!' });
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
