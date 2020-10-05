function shortenString(text: string) {
  const MAX_LENGTH = 50;
  if (text.length <= MAX_LENGTH) {
    return text;
  }
  return text.substring(0, MAX_LENGTH - 3) + '...';
}
export default shortenString;
