export default function tag(tagname = 'div', className = '', children = []) {
  const el = document.createElement(tagname);

  if (className.length > 0) {
    className.split(' ').forEach((classname) => el.classList.add(classname));
  }

  const fragment = document.createDocumentFragment();

  if (Array.isArray(children)) {
    children.forEach((childEl) => {
      if (typeof childEl === 'string') {
        const textEl = document.createTextNode(childEl);

        // textEl.textContent = childEl;
        fragment.appendChild(textEl);
      } else {
        fragment.appendChild(childEl);
      }
    });
  } else {
    const textEl = document.createTextNode(children);

    // textEl.textContent = children;
    fragment.appendChild(textEl);
  }

  el.appendChild(fragment);

  return el;
}
