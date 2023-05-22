import { AppContext } from '@PescaPE/context/AppContext';
import { useContext } from 'react';

export default function Main() {
  const { strings, themeName, setFormReportVisible } = useContext(AppContext);

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: '2rem 1rem',
        flex: 1,
      }}
    >
      <section
        style={{
          background: 'var(--bg-variant)',
          width: '90vw',
          maxWidth: 900,
          padding: '1rem',
          borderRadius: 4,
          textAlign: 'justify',
        }}
      >
        <h1>{strings.appName}</h1>
        <p style={{ margin: '1rem 0' }}>{strings.welcomeText}</p>
        <p>{strings.welcomeText2}</p>
      </section>
      <section
        style={{
          gap: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90vw',
          maxWidth: 900,
          marginTop: '2rem',
          padding: '0 1rem',
        }}
      >
        <button
          onClick={() => setFormReportVisible(true)}
          style={{
            width: '50%',
            maxWidth: 200,
            background: 'var(--variant)',
            padding: '0.5rem 1rem',
            borderRadius: 4,
            color: themeName === 'light' ? 'var(--bg)' : '',
            fontWeight: 700,
            border: '2px solid var(--variant)',
          }}
        >
          {strings.makeYourReport}
        </button>
        <button
          style={{
            width: '50%',
            maxWidth: 200,
            background: 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: 4,
            fontWeight: 700,
            color: 'var(--variant)',
          }}
        >
          {strings.trackYourReport}
        </button>
      </section>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '50%',
          gap: '1rem',
          fontSize: '0.8em',
          fontWeight: 700,
          margin: '1rem 0',
        }}
      >
        <div className="line"></div>
        <span>{strings.or}</span>
        <div className="line"></div>
      </div>
      <section style={{ width: '90vw', maxWidth: 900, padding: '0 1rem', textAlign: 'justify' }}>
        <p>
          {strings.accessIbamaPage}{' '}
          <a
            title="Ibama"
            target="blank"
            href="https://www.gov.br/ibama/pt-br/assuntos/fiscalizacao-e-protecao-ambiental/fiscalizacao-ambiental/denuncias"
          >
            {strings.here}
          </a>
          .
        </p>
        <p>{strings.ibamaText}</p>
      </section>
    </main>
  );
}
