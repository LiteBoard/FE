export const truncateText = (text: string | null, maxLength: number) => {
  return text?.length && text.length > maxLength
    ? text.slice(0, maxLength) + '...'
    : (text ?? '');
};
