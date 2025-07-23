import { ContactsCollection } from '../models/contact.js';

export async function getAllContacts() {
    const contacts = ContactsCollection.find();
    return contacts;
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