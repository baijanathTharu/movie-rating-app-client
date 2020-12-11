const validateLength = (len, name) => {
  if (!len) {
    return `${name} required`;
  }
  return false;
};

const validateEmail = (val) => {
  const pattern = /\S+@\S+\.\S+/;
  if (!pattern.test(val)) return 'invalid email address';
  return false;
};

const validateConfirmPassword = (pass, cpass) => {
  if (pass !== cpass) {
    return 'passwords do not match';
  }
  return false;
};

export const validateForm = (name, value, passVal) => {
  switch (name) {
    case 'username':
      return validateLength(value.length, 'username');
    case 'password':
      return validateLength(value.length, 'password');
    case 'confirm-password':
      return validateLength(value.length, 'confirm-password');
    case 'confirm-password-match':
      return validateConfirmPassword(value, passVal);
    case 'email':
      if (!validateLength(value.length, 'email')) return validateEmail(value);
      return validateLength(value.length, 'email');
    default:
      break;
  }
  return false;
};
