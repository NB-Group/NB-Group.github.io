export function size(selector, type) {
    return document.querySelector(selector).getBoundingClientRect()[type];
}
