import type { Movie } from '../../types/Movie';

export interface MovieCardProps {
  movie: Movie;
  flightDuration: number;
  isExpanded: boolean;
  onToggle: (title: string) => void;
}
