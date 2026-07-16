import type { Theme } from '../../types/Theme';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}
