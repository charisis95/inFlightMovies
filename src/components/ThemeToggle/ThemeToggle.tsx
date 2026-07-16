import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import type { ThemeToggleProps } from './ThemeToggle.types';
import './ThemeToggle.css';

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDarkMode = theme === 'dark';
  const nextTheme = isDarkMode ? 'light' : 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={onToggle}
    >
      {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      <span>{isDarkMode ? 'Light' : 'Dark'} mode</span>
    </button>
  );
}
