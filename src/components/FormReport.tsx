import { AppContext } from '@PescaPE/context/AppContext';
import { useContext, useEffect, useState } from 'react';
import FilesPreview from './FilesPreview';

export default function FormReport() {
  const { formReportVisible: visible, setFormReportVisible: setVisible } = useContext(AppContext);

  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    if (visible) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = '';
  }, [visible]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        left: visible ? 0 : '-100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'auto',
        paddingBottom: '2rem',
      }}
    >
      <form
        id="make-report"
        autoCapitalize="off"
        autoCorrect="off"
        style={{
          width: '90vw',
          maxWidth: 900,
          marginTop: '15vh',
          background: 'var(--bg)',
          minHeight: 200,
          borderRadius: 8,
          padding: '1rem',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Formulário de Denúncia Anônima - Crimes de Pesca</h2>
        <div
          style={{
            width: '100%',
            borderBottom: '2px solid var(--text)',
            paddingBottom: '1rem',
            marginBottom: '2rem',
          }}
        >
          <span>
            Por favor, preencha as informações abaixo para fornecer detalhes sobre a denúncia.
            Lembre-se de que suas respostas serão mantidas em sigilo.
          </span>
        </div>
        <label htmlFor="type">Tipo de crime</label>
        <select id="type">
          <option value="0">Pesca ilegal</option>
          <option value="1">Pesca predatória</option>
          <option value="2">Uso de métodos de pesca proibidos</option>
          <option value="3">Pesca em área protegida</option>
          <option value="4">Outro (especifique)</option>
        </select>
        <label htmlFor="description">Descrição do ocorrido</label>
        <textarea
          required
          placeholder="Forneça uma descrição detalhada do crime"
          id="description"
        />
        <label htmlFor="details">Detalhes sobre os envolvidos</label>
        <textarea
          required
          id="details"
          placeholder="Se você tiver informações sobre os indivíduos ou embarcações envolvidas, forneça detalhes como nomes, descrições físicas, números de registro, se disponíveis."
        ></textarea>
        <label htmlFor="file">Provas ou evidências</label>
        <input
          onInput={(e) => {
            setFiles(Array.from(e.currentTarget.files!));
          }}
          type="file"
          id="file"
          accept="image/*, video/*"
          required
          multiple
        />
        <FilesPreview files={files} setList={setFiles} />
      </form>
      <button
        style={{
          background: 'transparent',
          fontSize: '1.3em',
          position: 'absolute',
          top: '5vh',
          ...(visible ? { right: '5vw' } : { left: '-100vw' }),
        }}
        onClick={() => setVisible(false)}
      >
        <i
          style={{
            color: '#f5f5f5',
          }}
          className="bi bi-x-lg"
        ></i>
      </button>
    </div>
  );
}
