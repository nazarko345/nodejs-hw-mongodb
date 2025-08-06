import { Router } from 'express';
import {
  deleteContactController,
  patchContactController,
  postContactController,
  showContactByIdController,
  showContactsController,
} from '../controllers/contactsController.js';
import ctrlWrapper from '../utilts/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validationSchema } from '../validation/contacts.js';
import { isValidId } from '../validation/isValidId.js';
import { authenticate } from '../middlewares/autentification.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(showContactsController));

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(showContactByIdController),
);

// api operat

router.post(
  '/',
  validateBody(validationSchema),
  ctrlWrapper(postContactController),
);

router.patch(
  '/:contactId',
  validateBody(validationSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
