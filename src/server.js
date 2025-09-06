import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVariable } from './utilts/getEnvVariable.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = getEnvVariable('PORT') || 8080;
const photosDir = path.resolve('src', 'uploads', 'photos');

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);
  app.use('/photos', express.static(photosDir));

  app.use(errorHandler);

  app.use(notFoundHandler);


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
