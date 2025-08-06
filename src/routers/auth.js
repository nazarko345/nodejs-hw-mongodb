import {
  loginController,
  logoutController,
  registerController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import ctrlWrapper from '../utilts/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

router.post(
  '/logout',
  validateBody(loginUserSchema),
  ctrlWrapper(logoutController),
);

router.post(
  '/refresh',
  validateBody(loginUserSchema),
  ctrlWrapper(refreshUserSessionController),
);

export default router;
