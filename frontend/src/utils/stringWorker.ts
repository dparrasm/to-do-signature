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

export const formatTitle = (inputString) => {
  const firstDashIndex = inputString.indexOf("-");
  if (firstDashIndex === -1) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  } else {
    const formattedString = inputString.substring(0, firstDashIndex);
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
  }
};

export const getTextBeforeDash = (text) => {
  const dashIndex = text.indexOf("-");
  if (dashIndex === -1) {
    return text;
  } else {
    return text.slice(0, dashIndex);
  }
};
