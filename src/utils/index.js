export function queryGenerator(filter) {
  const keys = [];
  Object.entries(filter).forEach(([key, value]) => {
    if (value) keys.push(key);
  });
  let result = "";
  keys.forEach((el, index) => {
    if (index === 0) result += el;
    else result += `|${el}`;
  });

  return result;
}
