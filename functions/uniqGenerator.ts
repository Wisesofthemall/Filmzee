export const uniqGenerator = () => {
  let num = "";
  for (let i = 0; i < 13; i++) {
    // Generate a random digit from 0 to 9 and convert it to a string
    const digit = Math.floor(Math.random() * 10).toString();
    num += digit;
  }
  return num;
};
