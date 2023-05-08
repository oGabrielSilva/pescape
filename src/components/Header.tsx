import { AppContext } from '@PescaPE/context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import ButtonChangeTheme from './ButtonChangeTheme';

export default function Header() {
  const { strings, themeName } = useContext(AppContext);

  return (
    <header
      style={{
        background: 'var(--bg-variant)',
      }}
    >
      <div
        style={{
          background: themeName === 'light' ? 'var(--green)' : 'transparent',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Image
          style={{ width: '8em', height: 'auto' }}
          src="/if-logo.png"
          width={200}
          height={54}
          alt={strings.ifAlt}
        />
        <ButtonChangeTheme />
      </div>
    </header>
  );
}
