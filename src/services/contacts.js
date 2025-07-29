import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from '../utilts/calculatePaginationData.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  const students = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
}

export async function getContactById(contactId) {
  const contactById = ContactsCollection.findById(contactId);
  return contactById;
}

export async function createContact(payload) {
  const contactById = ContactsCollection.create(payload);
  return contactById;
}

export async function patchContact(contactId, updateData) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    updateData,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(contactId) {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
}
