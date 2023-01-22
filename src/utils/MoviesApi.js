import { BASE_MOVIES_API_URL } from "./variables";

export const MoviesApi = async () => {
  const res = await fetch(BASE_MOVIES_API_URL,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return Promise.reject('Ошибка MoviesAPI');
}
