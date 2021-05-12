export const isValidEmail = (email: string): boolean => {
  return String(email).indexOf("@") >= 0;
};
