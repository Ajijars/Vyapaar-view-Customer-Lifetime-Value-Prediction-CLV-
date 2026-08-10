const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = {
  get: async (url: string) => {
    const res = await fetch(`${baseURL}${url}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return { data };
  },
  post: async (url: string, body?: any) => {
    const res = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return { data };
  }
};

export default api;

