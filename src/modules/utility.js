export const selector = (s) => document.querySelector(s);
export const selectorAll = (s) => document.querySelectorAll(s);
export const append = (parent, child) => parent.appendChild(child);

export const createElement = (tag, classname = '', text = '', id = '') => {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (id) element.id = id;
    if (classname) element.classList.add(classname);
    return element;
};

// template above

export function svgParser(string) {
    const parser = new DOMParser();
    const element = parser.parseFromString(string, 'image/svg+xml');
    return element.documentElement;
}

