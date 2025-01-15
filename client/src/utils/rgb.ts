export const generateRandomRGB = (): string => {
  let r: number = Math.floor(Math.random() * 200) + 55; // Between 55 and 255
  let g: number = Math.floor(Math.random() * 200) + 55; // Between 55 and 255
  let b: number = Math.floor(Math.random() * 200) + 55; // Between 55 and 255

  return `rgb(${r}, ${g}, ${b})`;
};
