import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from '../utilts/calculatePaginationData.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  owner,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const queryConditions = { owner };

  const students = await ContactsCollection.find(queryConditions)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  if (filter.isFavourite) {
    queryConditions.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    queryConditions.where('contactType').equals(filter.contactType);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(queryConditions)
    .countDocuments();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
}

export async function getContactById(contactId, userId) {
  const contactById = ContactsCollection.findOne({ _id: contactId, userId });
  return contactById;
}

export async function createContact(payload, userId) {
  const contactById = ContactsCollection.create({ ...payload, userId });
  return contactById;
}

export const patchContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updatedContact || !updatedContact.value) return;

  return {
    contact: updatedContact.value,
    isNew: Boolean(updatedContact?.lastErrorObject?.upserted),
  };
};

export async function deleteContact(contactId, userId) {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
}
