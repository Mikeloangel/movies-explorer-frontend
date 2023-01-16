const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies/';

export const MoviesApi = async () => {
  const res = await fetch(BASE_URL,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(res.ok){
      const data = await res.json();
      return data;
    }

    return Promise.reject('Ошибка MoviesAPI');
}
