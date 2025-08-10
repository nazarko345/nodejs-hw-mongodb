import {
  loginController,
  logoutController,
  registerController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import ctrlWrapper from '../utilts/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { Router } from 'express';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';

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

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post('/reset-pwd',
  validateBody(),
  ctrlWrapper()
);

export default router;
