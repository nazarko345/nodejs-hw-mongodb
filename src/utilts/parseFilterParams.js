const contactsType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const validTypes = ['work', 'home', 'personal'];
  if (validTypes.includes(contactType)) return contactType;
};

const favouriteContacts = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  const validValues = ['true', 'false'];
  if (validValues.includes(isFavourite)) return isFavourite;
};

export const parseFilteredParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedType = contactsType(contactType);
  const parsedFavourite = favouriteContacts(isFavourite);

  return {
    contactType: parsedType,
    isFavourite:
      parsedFavourite === 'true'
        ? true
        : parsedFavourite === 'false'
        ? false
        : undefined,
  };
};
