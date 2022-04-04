export const dataToArray = (data) => {
  if (data && data.data) {
    const items = JSON.parse(data.data);
    if (items.length === 0) {
      return [];
    } else {
      return items;
    }
  } else {
    return [];
  }
}
