import React, { useEffect, useState } from 'react';
import moviesData from '../assets/moviesData.json';
import MovieItem from './MovieItem';
import '../MovieList.css'; 


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);  // To track selected movie
  const [selectedCategory, setSelectedCategory] = useState('All'); // To track selected category
  const [sortOrder, setSortOrder] = useState('asc'); // To track sort order
  const [errorMessages, setErrorMessages] = useState([]);
  const [totalFlightDuration, setTotalFlightDuration] = useState(120); // flight duration in minutes
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const validatedMovies = moviesData.filter(movie => {
      const hasTitle = movie.Title && movie.Title.trim() !== '';
      const hasDescription = movie.Description && movie.Description.trim() !== '';

      if (!hasTitle || !hasDescription) {
        const messages = [];
        if (!hasTitle) messages.push(`Movie "${movie.Title || 'Unknown'}" is missing a title.`);
        if (!hasDescription) messages.push(`Movie "${movie.Title || 'Unknown'}" is missing a description.`);

        setErrorMessages(prev => [...prev, ...messages]);
      }
      return hasTitle && hasDescription; // Only keep valid movies
    });

    setMovies(validatedMovies); // Set validated movies
  }, []);

  const handleSelectMovie = (index) => {
    setSelectedMovieIndex(index === selectedMovieIndex ? null : index);  // Toggle movie selection
  };

  const allCategories = () => {
    const categories = moviesData.flatMap(movie => movie.Category);
    return ['All', ...new Set(categories)]; // Add all as an option
  };

  const filteredMovies = movies.filter(movie => {
    return selectedCategory === 'All' || movie.Category.includes(selectedCategory);
  });

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.Title.localeCompare(b.Title);
    }
    return b.Title.localeCompare(a.Title);
  });

  const remainingFlightDuration = totalFlightDuration;
  const exceedingMovies = sortedMovies.filter(movie => movie.Duration > remainingFlightDuration);


  return (
    <div className="movie-list">
      <h2>Movie List</h2>

      {/* Display error messages if there are any */}
      {errorMessages.length > 0 && (
        <div className='error-messages'>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      <div>

      {/* Category Filter */}
      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories().map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Sort Order */}
      <div className="sort-order">
        <label htmlFor="sortOrder">Sort by Title: </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
      </div>
      </div>

      <div className="remaining-flight-duration">
        <h3>Remaining Flight Duration: {remainingFlightDuration} minutes</h3>
        {exceedingMovies.length > 0 && (
          <div className="exceeding-movies">
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? 'Show Exceeding Movies' : 'Hide Exceeding Movies'}
            </button>
            <div className={`collapsible ${isCollapsed ? 'collapsed' : 'expanded'}`}>
              <h4>The following movies exceed your remaining flight duration:</h4>
              <ul>
                {exceedingMovies.map((movie, index) => (
                  <li key={index}>{movie.Title} ({movie.Duration} minutes)</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <ul>
        {sortedMovies.map((movie, index) => (
          <MovieItem
            key={index}
            movie={movie}
            index={index}
            selectedMovieIndex={selectedMovieIndex}
            handleSelectMovie={handleSelectMovie}
          />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;