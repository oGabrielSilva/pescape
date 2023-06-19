import { AppContext } from '@PescaPE/context/AppContext';
import { useContext } from 'react';

export default function ButtonChangeTheme() {
  const { theme, strings, themeName, setThemeName } = useContext(AppContext);

  return (
    <button
      title={strings.changeTheme}
      onClick={() => {
        theme.toggleTheme();
        setThemeName(theme.getCurrentThemeName());
      }}
      id="change-theme"
    >
      <i
        style={themeName === 'dark' ? { color: '' } : { color: 'var(--bg)' }}
        className={themeName === 'light' ? 'bi bi-moon-fill' : 'bi bi-brightness-high-fill'}
      ></i>
    </button>
  );
}
