import { FIREBASE_STORAGE_BUCKET, FIREBASE_STORAGE_URL, imagesTokens } from 'utils/constants';

const {
  FIREBASE_FIRESTORAGE_WELCOME_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_PASSWORD_GENERATOR_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_SIGNUP_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_EASY_SIGNUP_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_FREE2USE_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_PASSWORDS_LISTED_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_INITIAL_PASSWORD_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_PASSWORD_EDIT_IMAGE_TOKEN,
  FIREBASE_FIRESTORAGE_ONBOARDING_COMPLETE_IMAGE_TOKEN,
} = imagesTokens;
const FIREBASE_STORAGE_FINAL_URL = `${FIREBASE_STORAGE_URL}/v0/b/${FIREBASE_STORAGE_BUCKET}/o`;

export const slides = [
  {
    id: 1,
    title: 'Welcome to Passvault!',
    description: 'The main goal of this app is to generate secure and configurable passwords',
    image: `${FIREBASE_STORAGE_FINAL_URL}/welcome.png?alt=media&token=${FIREBASE_FIRESTORAGE_WELCOME_IMAGE_TOKEN}`,
  },
  {
    id: 2,
    title: 'Password Generator',
    description: 'Configure and generate a password is very simple!',
    image: `${FIREBASE_STORAGE_FINAL_URL}/password_generator.gif?alt=media&token=${FIREBASE_FIRESTORAGE_PASSWORD_GENERATOR_IMAGE_TOKEN}`,
  },
  {
    id: 3,
    title: 'Storing Generated Passwords',
    description: 'Optionally you can enroll up and store many generated passwords',
    image: `${FIREBASE_STORAGE_FINAL_URL}/sign-up.png?alt=media&token=${FIREBASE_FIRESTORAGE_SIGNUP_IMAGE_TOKEN}`,
  },
  {
    id: 4,
    title: 'Signup is very easy!',
    description:
      "No passwords required, duh! you only need a username with more than 6 characters for signup and login. That's it!",
    image: `${FIREBASE_STORAGE_FINAL_URL}/easy-signup.gif?alt=media&token=${FIREBASE_FIRESTORAGE_EASY_SIGNUP_IMAGE_TOKEN}`,
  },
  {
    id: 5,
    title: 'Free to use',
    description:
      "If you don't feel comfortable creating an account, you can still generate passwords but those wont't be stored",
    image: `${FIREBASE_STORAGE_FINAL_URL}/free-to-use.png?alt=media&token=${FIREBASE_FIRESTORAGE_FREE2USE_IMAGE_TOKEN}`,
  },
  {
    id: 6,
    title: 'Check your Generated Passwords listed',
    description:
      "If you're an authenticated user all your passwords will be listed (latest listed first), and navigate with a sidebar menu",
    image: `${FIREBASE_STORAGE_FINAL_URL}/passwords-listed.png?alt=media&token=${FIREBASE_FIRESTORAGE_PASSWORDS_LISTED_IMAGE_TOKEN}`,
  },
  {
    id: 7,
    title: 'Place your initial password',
    description:
      "If you prefer, you can place an initial password when you're creating a new entry, otherwise generate a password",
    image: `${FIREBASE_STORAGE_FINAL_URL}/initial-password.gif?alt=media&token=${FIREBASE_FIRESTORAGE_INITIAL_PASSWORD_IMAGE_TOKEN}`,
  },
  {
    id: 8,
    title: 'Update your existing passwords',
    description:
      'In order to avoid to create more entries, you can update an existing password and save the changes',
    image: `${FIREBASE_STORAGE_FINAL_URL}/password-edit.gif?alt=media&token=${FIREBASE_FIRESTORAGE_PASSWORD_EDIT_IMAGE_TOKEN}`,
  },
  {
    id: 9,
    title: "Let's go with it!",
    description: "Now we're ready to start to use Passvault!",
    image: `${FIREBASE_STORAGE_FINAL_URL}/onboarding-completed.png?alt=media&token=${FIREBASE_FIRESTORAGE_ONBOARDING_COMPLETE_IMAGE_TOKEN}`,
  },
];
