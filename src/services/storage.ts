export function get(key: string) {
  return window.localStorage.getItem(key);
}

export function set(key: string, value: string) {
  return window.localStorage.setItem(key, value);
}

export function remove(key: string) {
  return window.localStorage.removeItem(key);
}
