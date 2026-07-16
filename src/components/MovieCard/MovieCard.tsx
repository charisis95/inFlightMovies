import type { MovieCardProps } from './MovieCard.types';
import './MovieCard.css';

export function MovieCard({ movie, flightDuration, isExpanded, onToggle }: MovieCardProps) {
  const duration = Number(movie.Duration);
  const fitsFlight = duration <= flightDuration;
  const detailsId = `${movie.Title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-details`;

  return (
    <article className="movie-card">
      <div className="movie-card-topline">
        <div className="movie-card-genres">
          {movie.Category.map((category) => <span key={category}>{category}</span>)}
        </div>
        <span className={`movie-card-fit ${fitsFlight ? 'movie-card-fit-available' : ''}`}>
          {fitsFlight ? 'Fits your flight' : 'Longer than flight'}
        </span>
      </div>

      <div className="movie-card-content">
        <p className="movie-card-duration">{duration} min</p>
        <h2>{movie.Title}</h2>
        <p className="movie-card-director">Directed by {movie.Director}</p>

        {isExpanded && (
          <div className="movie-card-details" id={detailsId}>
            <p>{movie.Description}</p>
            <p><strong>Starring</strong> {movie.Starring.join(', ')}</p>
          </div>
        )}
      </div>

      <button
        className="movie-card-button"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => onToggle(movie.Title)}
      >
        {isExpanded ? 'Hide details' : 'View details'}
        <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
      </button>
    </article>
  );
}
