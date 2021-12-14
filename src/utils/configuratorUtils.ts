const handleLeftCheckboxes = (
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

const handleRightCheckboxes = (
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

const updateConfiguratorStateAndGeneratePassword = (dispatch: any, generatePassword: any) => {
  dispatch(generatePassword());
};

export { handleLeftCheckboxes, handleRightCheckboxes, updateConfiguratorStateAndGeneratePassword };
