import { useState } from 'react';
import axios from 'axios';

const API_KEY = '22d8bf8a594425133da545f5638e7051';
const API_URL = 'https://api.themoviedb.org/3/discover/movie';

function Home() {
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('7');
  const [releaseYear, setReleaseYear] = useState('');
  const [language, setLanguage] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        with_genres: genre,
        vote_average: `gte:${parseFloat(rating)}`,
        primary_release_year: releaseYear,
        language: language,
        sort_by: 'popularity.desc',
      }
    });
    setMovies(response.data.results);
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) {
      return 'https://www.herbicat.com.br/imagens/uploads/produto/99/img/20160411140820hTm7j9njg7.jpg'; // Imagem padrão
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  const formatRating = (rating) => {
    return rating === 0 ? 'Ainda não lançado' : rating;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Recomendações de Filmes</h1>
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg mb-2">Escolha um gênero:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Selecione um gênero</option>
              <option value="28">Ação</option>
              <option value="35">Comédia</option>
              <option value="18">Drama</option>
              <option value="10749">Romance</option>
              <option value="16">Animação</option>
              <option value="99">Documentário</option>
            </select>
          </div>
          <div>
            <label className="block text-lg mb-2">Classificação mínima:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="7">7+</option>
              <option value="6">6+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-lg mb-2">Ano de lançamento:</label>
            <input
              type="number"
              placeholder="Ex: 2020"
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg mb-2">Idioma:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Selecione o idioma</option>
              <option value="pt-BR">Português</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none"
            onClick={handleSearch}
          >
            Buscar Filmes
          </button>
        </div>
      </div>

      <div className="mt-12">
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="relative">
                  <img
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full object-contain h-80 rounded-lg mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.overview}</p>
                <p className="text-purple-400">
                  Nota: {formatRating(movie.vote_average)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8">Nenhum resultado</p>
        )}
      </div>
    </div>
  );
}


export default Home;
