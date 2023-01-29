export const generatePassword = (length: number): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};
export const shortenTitle = (chStart, chEnd, length, originalString) => {
  let newString = "";
  if (chStart + chEnd > length) {
    newString = "Unmodifiable title";
  } else {
    newString =
      originalString.substring(0, chStart) +
      ".." +
      originalString.substring(length - chEnd, length);
  }
  return newString;
};
