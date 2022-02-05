import { generatePassword, resetPasswordGeneratorState } from 'reduxStore/slices/passwordSlice';
import { showInfoMessage } from 'utils/infoMessages';
import { infoMessages } from 'utils/constants';

/* Password Generator utils */
export const resetConfigurationState = (dispatch: any) => {
  dispatch(resetPasswordGeneratorState());
};

export const handleGeneratePassword = (passwordFromState: string, dispatch: any) => {
  if (!passwordFromState) {
    dispatch(generatePassword());
  }
};

export const showAuthenticatedMessage = (userId: string, isCreatedMode: boolean) => {
  if (userId && isCreatedMode) {
    showInfoMessage(infoMessages.about2CreatePassword);
  }
};

/* Password Generator Configurator utils */
export const handleLeftCheckboxes = (
  dispatch: any,
  setCheck1: any,
  setCheck2: any,
  selector1: string,
  selector2: string,
  value: boolean,
  handleOtherCheckboxes: any
) => {
  const payloadString1 = `{ "${selector1}": ${value} }`;
  const payloadString2 = `{ "${selector2}": ${!value} }`;
  const payload1 = JSON.parse(payloadString1);
  const payload2 = JSON.parse(payloadString2);

  dispatch(setCheck1(payload1));
  dispatch(setCheck2(payload2));

  handleOtherCheckboxes();
};

export const handleRightCheckboxes = (
  value: boolean,
  checkbox1: boolean,
  checkbox2: boolean,
  checkbox3: boolean,
  dispatch: any,
  configuratorAction: any,
  payload: object
) => {
  if (checkbox1 || checkbox2 || checkbox3) {
    dispatch(configuratorAction(payload));
  }
};

export const updateConfiguratorStateAndGeneratePassword = (dispatch: any) => {
  dispatch(generatePassword());
};
