import {
  red,
  blue,
  lightBlue,
  indigo,
  green,
  amber,
  lightGreen,
} from "@mui/material/colors";
const colorShadePicker = (inputNumber: number) => {
  const minRange = 100;
  const maxRange = 900;
  const increment = 100;

  //* Calculate the number of increments required to reach or exceed inputNumber
  const incrementsRequired = Math.ceil((inputNumber - minRange) / increment);

  //* Calculate the resulting number within the range
  const result = minRange + incrementsRequired * increment;

  //* Ensure the result is within the specified range
  const clampedResult = Math.min(Math.max(result, minRange), maxRange);
  return clampedResult;
};

const colorPicker = (inputNumber: number) => {
  const colors: any = [red, blue, lightBlue, indigo, green, amber, lightGreen];

  return colors[inputNumber % 6];
};

export const colorMaker: any = (inputNumber: number): any => {
  return () => {
    const color = colorPicker(inputNumber);
    const shade = colorShadePicker(inputNumber);

    return color[shade];
  };
};
