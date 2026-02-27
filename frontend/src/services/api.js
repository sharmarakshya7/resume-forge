const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Central fetch wrapper.
 * Automatically attaches Authorization header if a token exists in localStorage.
 * Throws an Error with the server's message on non-2xx responses.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('rb_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  get:    (endpoint)         => request(endpoint, { method: 'GET'    }),
  post:   (endpoint, body)   => request(endpoint, { method: 'POST',   body }),
  put:    (endpoint, body)   => request(endpoint, { method: 'PUT',    body }),
  delete: (endpoint)         => request(endpoint, { method: 'DELETE'  }),
};
