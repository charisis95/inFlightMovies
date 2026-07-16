import { useMemo, useState } from "react";
import moviesData from "../../assets/moviesData.json";
import { LibraryFilters } from "../../components/LibraryFilters/LibraryFilters";
import type { SortOrder } from "../../components/LibraryFilters/LibraryFilters.types";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import type { Movie } from "../../types/Movie";
import { FLIGHT_DURATION_MINUTES } from "./MovieLibraryScreen.types";
import "./MovieLibraryScreen.css";

const movies = moviesData as Movie[];

export function MovieLibraryScreen() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [expandedMovieTitle, setExpandedMovieTitle] = useState<string | null>(
    null,
  );

  const categories = useMemo(
    () => [...new Set(movies.flatMap((movie) => movie.Category))].sort(),
    [],
  );

  const filteredMovies = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return movies
      .filter(
        (movie) =>
          selectedCategory === "all" ||
          movie.Category.includes(selectedCategory),
      )
      .filter((movie) => {
        const searchableText = [movie.Title, movie.Director, ...movie.Starring]
          .join(" ")
          .toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .sort((firstMovie, secondMovie) => {
        const comparison = firstMovie.Title.localeCompare(secondMovie.Title);
        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [searchQuery, selectedCategory, sortOrder]);

  const handleToggleMovie = (title: string) => {
    setExpandedMovieTitle((currentTitle) =>
      currentTitle === title ? null : title,
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="movie-library-screen">
      <div className="movie-library-toolbar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <header className="movie-library-header">
        <div>
          <p className="movie-library-eyebrow">SkyScreen entertainment</p>
          <h1>Your cinema at 30,000 feet.</h1>
          <p className="movie-library-intro">
            Browse the onboard collection and see what fits within your
            remaining flight time.
          </p>
        </div>
        <div className="movie-library-flight-card">
          <span>Time remaining</span>
          <strong>
            {FLIGHT_DURATION_MINUTES}
            <small> min</small>
          </strong>
          <p>ATH → LHR</p>
        </div>
      </header>

      <LibraryFilters
        categories={categories}
        movieCount={filteredMovies.length}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
        onSortChange={setSortOrder}
      />

      {filteredMovies.length > 0 ? (
        <section className="movie-library-grid" aria-label="Available movies">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.Title}
              movie={movie}
              flightDuration={FLIGHT_DURATION_MINUTES}
              isExpanded={expandedMovieTitle === movie.Title}
              onToggle={handleToggleMovie}
            />
          ))}
        </section>
      ) : (
        <section className="movie-library-empty">
          <span aria-hidden="true">⌕</span>
          <h2>No movies found</h2>
          <p>Try a different title, cast member, or genre.</p>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </section>
      )}
    </div>
  );
}
