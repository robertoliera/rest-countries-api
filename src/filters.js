const amount = function(value) {
  let quantity = new Intl.NumberFormat().format(value);
  return quantity;
};

export { amount };
