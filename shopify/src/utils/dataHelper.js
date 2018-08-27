export default entity => {
  return { [entity.target.name]: entity.target.value };
};

