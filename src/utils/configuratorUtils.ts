const handleLeftCheckboxes = (
  value: boolean,
  setCheck1: any,
  setCheck2: any,
  handleOtherCheckboxes: any
) => {
  setCheck1(value);
  setCheck2(!value);

  handleOtherCheckboxes();
};

const handleRightCheckboxes = (
  value: boolean,
  setCheckbox: any,
  checkbox1: boolean,
  checkbox2: boolean,
  checkbox3: boolean,
  dispatch: any,
  configuratorAction: any,
  payload: object
) => {
  if (checkbox1 || checkbox2 || checkbox3) {
    setCheckbox(value);
    dispatch(configuratorAction(payload));
  } else {
    setCheckbox(true);
  }
};

const updateConfiguratorStateAndGeneratePassword = (dispatch: any, generatePassword: any) => {
  dispatch(generatePassword());
};

export { handleLeftCheckboxes, handleRightCheckboxes, updateConfiguratorStateAndGeneratePassword };
