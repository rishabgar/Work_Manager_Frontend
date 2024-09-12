export const truncateText = (text: any, charLimit: any) => {
  if (text.length <= charLimit) {
    return text;
  }
  return text.slice(0, charLimit) + "...";
};
