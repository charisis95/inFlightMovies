import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import type { LibraryFiltersProps, SortOrder } from './LibraryFilters.types';
import './LibraryFilters.css';

export function LibraryFilters({
  categories,
  movieCount,
  searchQuery,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: LibraryFiltersProps) {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as SortOrder);
  };

  return (
    <section className="library-filters" aria-label="Movie filters">
      <label className="library-filters-search">
        <span>Search movies</span>
        <input
          type="search"
          placeholder="Title, director, or cast..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="library-filters-field">
        <span>Genre</span>
        <Select
          value={selectedCategory}
          IconComponent={isGenreOpen ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
          inputProps={{ 'aria-label': 'Genre' }}
          MenuProps={{ classes: { paper: 'library-filter-menu' } }}
          onChange={(event) => onCategoryChange(event.target.value)}
          onClose={() => setIsGenreOpen(false)}
          onOpen={() => setIsGenreOpen(true)}
        >
          <MenuItem value="all">All genres</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </div>

      <div className="library-filters-field">
        <span>Sort by</span>
        <Select
          value={sortOrder}
          IconComponent={isSortOpen ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
          inputProps={{ 'aria-label': 'Sort by' }}
          MenuProps={{ classes: { paper: 'library-filter-menu' } }}
          onChange={handleSortChange}
          onClose={() => setIsSortOpen(false)}
          onOpen={() => setIsSortOpen(true)}
        >
          <MenuItem value="asc">Title A–Z</MenuItem>
          <MenuItem value="desc">Title Z–A</MenuItem>
        </Select>
      </div>

      <p className="library-filters-count" aria-live="polite">{movieCount} movies</p>
    </section>
  );
}
