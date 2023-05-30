const isNameValid = Name => Name?.length > 0;
const isEmailValid = Email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regEx.test(Email) && Email.length > 0;
};
const isMobileNumberValid = MobileNumber => {
  const regEx = /^([0|\+[0-9]{1,5})?([0-9][0-9]{9})$/;
  // return regEx.test(MobileNumber) && MobileNumber.length > 8;
  return MobileNumber.length > 8;
};
const isPasswordValid = Password => Password.length > 7;
const isSamePasswords = (Password, ConfirmPassword) =>
  Password === ConfirmPassword;
const isPINValid = PIN => PIN.length === 4;
const isSamePIN = (PIN, ConfirmPIN) =>
  PIN.length === 4 && ConfirmPIN.length === 4 && PIN === ConfirmPIN;
export default {
  isNameValid,
  isEmailValid,
  isMobileNumberValid,
  isPasswordValid,
  isSamePasswords,
  isPINValid,
  isSamePIN,
};
