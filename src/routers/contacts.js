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

const router = Router();

router.get('/contacts', ctrlWrapper(showContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(showContactByIdController),
);

// api operat

router.post(
  '/contacts',
  validateBody(validationSchema),
  ctrlWrapper(postContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(validationSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
