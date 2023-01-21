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
