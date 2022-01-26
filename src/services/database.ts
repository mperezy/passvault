import { passwordsCollection, socialMediaCollection } from 'services/firebase';

const sortBy = (obj1: object, obj2: object, field: string, kind: string) => {
  const x = kind === 'asc' ? 1 : -1;
  // @ts-ignore
  return obj1[field] < obj2[field] ? -1 * x : obj1[field] > obj2[field] ? 1 * x : 0;
};

export const getPasswordsByUserId = async (userId: any) => {
  const passwordList: {
    id: string;
    password_generated: string;
    social_media: string;
    createdAt: number;
  }[] = [];

  await passwordsCollection
    .where('uid', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        passwordList.push({
          id: doc.id,
          password_generated: doc.data().password_generated,
          social_media: doc.data().social_media,
          createdAt: doc.data().createdAt,
        })
      )
    )
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return passwordList.sort((x, y) => sortBy(x, y, 'createdAt', 'asc'));
};

export const sendPassword2Firebase = async (
  userId: string,
  password: string,
  socialMedia: string
) => {
  await passwordsCollection
    .add({
      createdAt: new Date().getTime(),
      password_generated: password,
      social_media: socialMedia,
      uid: userId,
    })
    .then(() => console.log('A new password was added in database.'))
    .catch(() => console.log('Something went wrong trying to add a new password in database.'));
};

export const deletePasswordById = async (passwordId: string | undefined) => {
  await passwordsCollection
    .doc(passwordId)
    .delete()
    .then(() => console.log('A password was deleted from database.'))
    .catch(() => console.log('Something went wrong trying to delete a password from database.'));
};

export const updatePasswordByIdFromFirebase = async (
  passwordId: string,
  passwordGenerated: string,
  socialMedia: string
) => {
  await passwordsCollection
    .doc(passwordId)
    .update({
      password_generated: passwordGenerated,
      social_media: socialMedia,
    })
    .then(() => console.log('A password was updated from database.'))
    .catch(() => console.log('Something went wrong trying to update a password from database.'));
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