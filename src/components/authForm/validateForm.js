const validateLength = (len, name) => {
  if (!len) {
    console.log(`${name} required`);
    return `${name} required`;
  }
  return false;
};

const validateEmail = (val) => {
  const pattern = /\S+@\S+\.\S+/;
  if (!pattern.test(val)) return 'invalid email address';
  return false;
};

export const validateForm = (name, value) => {
  switch (name) {
    case 'username':
      return validateLength(value.length, 'username');
    case 'password':
      return validateLength(value.length, 'password');
    case 'confirm-password':
      return validateLength(value.length, 'confirm-password');
    case 'email':
      if (!validateLength(value.length, 'email')) return validateEmail(value);
      return validateLength(value.length, 'email');
    default:
      break;
  }
  return false;
};
