import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utilts/parsePaginationParams.js';
import {
  getContactById,
  getAllContacts,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import { parseSortParams } from '../utilts/parseSortParams.js';
import { parseFilteredParams } from '../utilts/parseFilterParams.js';

export async function showContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { isFavourite, contactType } = parseFilteredParams(req.query);
  const { _id: userId } = req.user;
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    isFavourite,
    contactType,
    owner: userId,
  });

  if (!contacts || contacts.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No contacts found!',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function showContactByIdController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data: contact,
  });
}

// api operat

export async function postContactController(req, res, next) {
  const contact = await createContact(req.body, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await patchContact(contactId, req.body, req.user._id);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found!');
  }

  res.status(204).send();
}
