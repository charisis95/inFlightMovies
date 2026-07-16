export type SortOrder = 'asc' | 'desc';

export interface LibraryFiltersProps {
  categories: string[];
  movieCount: number;
  searchQuery: string;
  selectedCategory: string;
  sortOrder: SortOrder;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (order: SortOrder) => void;
}
