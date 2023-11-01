export const getFormattedDate = (date: Date) => {
  const zeroHandler = (input: number) => {
    if (input < 10) {
      return `0${input}`;
    } else {
      return `${input}`;
    }
  };

  return `${zeroHandler(date.getDate())}-${zeroHandler(
    date.getMonth() + 1
  )}-${date.getFullYear()}`;
};
