import { AppContext } from '@PescaPE/context/AppContext';
import { useContext } from 'react';

export default function Footer() {
  const { langService, changeDisplayLang } = useContext(AppContext);

  return (
    <footer style={{ padding: '2rem 1rem', background: 'var(--bg-variant)' }}>
      <select
        onChange={(e) => changeDisplayLang(e.currentTarget.value)}
        style={{ background: 'var(--bg-variant)' }}
        id="select-lang"
      >
        {langService.languagesSupported.map((lang) => (
          <option key={lang} value={lang}>
            {langService.getLang(lang).displaySelect.label}
          </option>
        ))}
      </select>
    </footer>
  );
}
