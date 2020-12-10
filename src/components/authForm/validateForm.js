const validateLength = (len, name) => {
  if (!len) {
    console.log(`${name} required`);
    return `${name} required`;
  }
  return false;
};

export const validateForm = (name, value) => {
  switch (name) {
    case 'username':
      return validateLength(value.length, 'username');
    case 'password':
      return validateLength(value.length, 'password');
    default:
      break;
  }
  return false;
};
