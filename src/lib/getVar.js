const getVar = (property, element) =>
  getComputedStyle(element).getPropertyValue(property);

export default getVar;
