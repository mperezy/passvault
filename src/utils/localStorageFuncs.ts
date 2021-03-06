import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from 'react-native-logs';

const appName = 'passvault';
const isObject = (value: string) => typeof value === 'object';
const log = logger.createLogger();

const storeData = async (key: string, value: any) => {
  try {
    const finalValue = isObject(value) ? JSON.stringify(value) : value.toString();
    await AsyncStorage.setItem(key, finalValue);
  } catch (e) {
    log.error('From storeData: ', { asyncStorageException: e });
  }
};

// eslint-disable-next-line consistent-return
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return isObject(value) ? JSON.parse(value) : value;
    }
  } catch (e) {
    log.error('From getData: ', { asyncStorageException: e });
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    log.error('From removeItem: ', { asyncStorageException: e });
  }
};

const setUserData2LS = (userId: string | undefined, email: string | null | undefined) => {
  storeData(`${appName}.userId`, userId || '').then((data) => data);
  storeData(`${appName}.email`, email || '').then((data) => data);
};

const setPasswordGenerated = (password: string) => {
  storeData(`${appName}.password`, password).then((data: void) => data);
};

const getPasswordGenerated = () => {
  const empty = { password: '' };

  return getData(`${appName}.password`)
    .then((password: string) => ({ password }))
    .catch((err) => {
      log.error('From getPasswordGenerated: ', { err });
      return empty;
    });
};

const getUserDataFromLS = () => {
  const empty = { userId: '', email: '' };

  return getData(`${appName}.userId`)
    .then((userId: string) => {
      getData(`${appName}.email`)
        .then((email: string) => ({
          userId,
          email,
        }))
        .catch((err: any) => {
          log.error('From getData -> email: ', { err });
          return empty;
        });
    })
    .catch((err) => {
      log.error('From getData -> userId: ', { err });
      return empty;
    });
};

const clearUserDataFromLS = () => {
  removeItem(`${appName}.userId`).then((res: void) => res);
  removeItem(`${appName}.email`).then((res: void) => res);
};

const setOnBoardingViewed = (value: any) => {
  storeData(`${appName}.alreadyLaunched`, value).then((data: void) => data);
};

const getOnBoardingViewed = () =>
  getData(`${appName}.alreadyLaunched`)
    .then((firstLaunchFlag) => firstLaunchFlag)
    .catch((err) => {
      log.error('From getOnBoardingViewed: ', { err });
      return null;
    });

export {
  setUserData2LS,
  getUserDataFromLS,
  clearUserDataFromLS,
  setPasswordGenerated,
  getPasswordGenerated,
  setOnBoardingViewed,
  getOnBoardingViewed,
};
