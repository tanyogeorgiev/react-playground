export default date => {
  let a = new Date(date);
  return a.toLocaleDateString();
};
