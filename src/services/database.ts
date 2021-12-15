import { passwordsCollection } from 'services/firebase';

const sortBy = (obj1: object, obj2: object, field: string, kind: string) => {
  const x = kind === 'asc' ? 1 : -1;
  // @ts-ignore
  return obj1[field] < obj2[field] ? -1 * x : obj1[field] > obj2[field] ? 1 * x : 0;
};

const getPasswordsByUserId = async (userId: any) => {
  const tasks: {
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
        tasks.push({
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

  return tasks.sort((x, y) => sortBy(x, y, 'createdAt', 'asc'));
};

// Todo: Need to re-implement the next
const sendPassword2Firebase = async (taskText: any, userId: any) => {
  await passwordsCollection
    .add({
      task: taskText,
      uid: userId,
      createdAt: new Date().getTime(),
    })
    .then(() => console.log('A new task was added in database.'))
    .catch(() => console.log('Something went wrong trying to add a new task in database.'));
};

// Todo: Need to re-implement the next
const deletePasswordById = async (taskId: string | undefined) => {
  await passwordsCollection
    .doc(taskId)
    .delete()
    .then(() => console.log('A task was deleted from database.'))
    .catch(() => console.log('Something went wrong trying to delete a task from database.'));
};

export { getPasswordsByUserId, sendPassword2Firebase, deletePasswordById };
