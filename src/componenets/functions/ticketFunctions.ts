export const generateID = (length: number) => {
  return Math.floor(100000 + Math.random() * length);
}