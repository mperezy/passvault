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
  checkbox3: boolean
) => {
  if (checkbox1 || checkbox2 || checkbox3) {
    setCheckbox(value);
  } else {
    setCheckbox(true);
  }
};

const updateConfiguratorStateAndGeneratePassword = (
  dispatch: any,
  configuratorAction: any,
  passwordAction: any,
  payload: object
) => {
  dispatch(configuratorAction(payload));
  dispatch(passwordAction());
};

export { handleLeftCheckboxes, handleRightCheckboxes, updateConfiguratorStateAndGeneratePassword };
