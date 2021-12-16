export default function getNumberFn(string) {
  return +string.replace(/\,/, ".").replace(/₽/, "");
}
