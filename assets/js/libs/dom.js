export function createElement(tagName, properties = {}) {
  const HTMLElement = document.createElement(tagName);
  Object.keys(properties).forEach((property) => {
    switch (property) {
      case "class":
        HTMLElement.classList.add(...properties[property]);
        break;
      default:
        if (property.startsWith("on")) {
          HTMLElement.addEventListener("click", properties[property]);
        } else {
          HTMLElement.setAttribute(property, properties[property]);
        }
        break;
    }
  });
  return HTMLElement;
}
