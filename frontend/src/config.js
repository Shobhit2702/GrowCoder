const API_BASE_URL = import.meta.env.VITE_API_URL;

export { API_BASE_URL };

export const apiFetch = (path, options = {}) => {
  const base = API_BASE_URL || '';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${cleanBase}${cleanPath}`;
  return fetch(url, options);
};
