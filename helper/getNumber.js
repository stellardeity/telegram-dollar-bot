export default function getNumberFn(number) {
  return +number.replace(/\,/, ".").replace(/₽/, "");
}
