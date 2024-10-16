import React from 'react';

const MovieItem = ({ movie, index, selectedMovieIndex, handleSelectMovie }) => {
  return (
    <li key={index} className="movie-item">
      <h3>{movie.Title}</h3>
      <div className='text'><strong>Category:</strong> {movie.Category?.join(', ') || 'Unknown'}</div>
      <div className='text'><strong>Duration:</strong> {movie.Duration ? `${movie.Duration} minutes` : 'Unknown'}</div>
      <button onClick={() => handleSelectMovie(index)}>
        {selectedMovieIndex === index ? 'Hide Details' : 'View Details'}
      </button>

      {selectedMovieIndex === index && (
        <div className='movie-details'>
          <div className='text'><strong>Starring:</strong> {movie.Starring?.join(', ') || 'Unknown'}</div>
          <div className='text'><strong>Director:</strong> {movie.Director || 'Unknown'}</div>
          <div className='text'><strong>Description:</strong> {movie.Description || 'No description available'}</div>
        </div>
      )}
    </li>
  );
};

export default MovieItem;