import { passwordsCollection, socialMediaCollection } from 'services/firebase';
import { defaultEmptyPasswordDescription } from 'utils/constants';

const sortBy = (obj1: any, obj2: any, field: string, kind: string = 'asc') => {
  const x = kind === 'asc' ? 1 : -1;
  return obj1[field] < obj2[field] ? -1 * x : obj1[field] > obj2[field] ? 1 * x : 0;
};

export const getPasswordsByUserId = async (userId: any) => {
  const passwordList: {
    id: string;
    passwordGenerated: string;
    socialMedia: string;
    description: string;
    createdAt: number;
  }[] = [];

  await passwordsCollection
    .where('uid', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        passwordList.push({
          id: doc.id,
          passwordGenerated: doc.data().password_generated,
          socialMedia: doc.data().social_media,
          description: doc.data().description || defaultEmptyPasswordDescription,
          createdAt: doc.data().createdAt,
        })
      )
    )
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error getting documents: ', error);
    });

  return passwordList.sort((x, y) =>
    sortBy(x, y, 'createdAt', process.env.PASSWORD_LIST_ORDER_TYPE)
  );
};

export const sendPassword2Firebase = async (
  userId: string,
  password: string,
  description: string,
  socialMedia: string
) => {
  await passwordsCollection
    .add({
      createdAt: new Date().getTime(),
      password_generated: password,
      social_media: socialMedia,
      description,
      uid: userId,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('A new password was added in database.');
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('Something went wrong trying to add a new password in database.');
    });
};

export const deletePasswordById = async (passwordId: string) => {
  await passwordsCollection
    .doc(passwordId)
    .delete()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('A password was deleted from database.');
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('Something went wrong trying to delete a password from database.');
    });
};

export const updatePasswordByIdFromFirebase = async (
  passwordId: string,
  passwordGenerated: string,
  description: string,
  socialMedia: string
) => {
  await passwordsCollection
    .doc(passwordId)
    .update({
      password_generated: passwordGenerated,
      description,
      social_media: socialMedia,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('A password was updated from database.');
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('Something went wrong trying to update a password from database.');
    });
};

export const getSocialMedia = async () => {
  const socialMediaList: { id: string; name: string }[] = [];

  await socialMediaCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) =>
      socialMediaList.push({
        id: doc.id,
        name: doc.data().name,
      })
    );
  });

  return socialMediaList;
};
