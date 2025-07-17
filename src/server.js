import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import {
  showContactsController,
  showContactByIdController,
} from './controllers/contactsController.js';
import { getEnvVariable } from './utilts/getEnvVariable.js';
import contactRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

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

  app.get('/contacts', showContactsController);
  app.get('/contacts/:contactId', showContactByIdController);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.use(contactRouter);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
