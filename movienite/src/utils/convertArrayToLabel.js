
const convertArrayToLabel = (items) => {
  const len = items.length;
  if (len === 0) return {};
  let arr = [len];
  for (let i = 0; i < len; i++) {
    arr[i] = {
      label: items[i]
    }
  }
  return arr;
}

export default convertArrayToLabel;

export const convertLabelToArray = (items) => {
  const len = items.length;
  if (len === 0) return {};
  let arr = [len];
  for (let i = 0; i < len; i++) {
    arr[i] = items[i].label;
  }
  return arr;
}
