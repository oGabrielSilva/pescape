import { AppContext } from '@PescaPE/context/AppContext';
import { useContext, useEffect, useRef, useState } from 'react';
import FilesPreview from './FilesPreview';

export default function FormReport() {
  const { formReportVisible: visible, setFormReportVisible: setVisible } = useContext(AppContext);

  const [files, setFiles] = useState<Array<File>>([]);

  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = '';
  }, [visible]);

  useEffect(() => console.log(files), [files]);

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
        <label htmlFor="file">
          Provas ou evidências{' '}
          <button
            type="button"
            onClick={() => {
              if (files.length > 0) setFiles([]);
            }}
          >
            Remover todas
          </button>
        </label>
        <div
          style={{
            minHeight: 100,
            marginTop: '0.5rem',
            borderRadius: 8,
            background: 'var(--bg-variant)',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            padding: '1rem',
            border: '2px solid transparent',
          }}
          id="drag"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'var(--variant)';
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'transparent';

            setFiles(
              Array.from(e.dataTransfer.files).filter(
                (item) =>
                  item.type.startsWith('image/') ||
                  item.type.startsWith('video/') ||
                  item.type.startsWith('audio/') ||
                  item.name.endsWith('.pdf') ||
                  item.name.endsWith('.txt') ||
                  item.name.endsWith('.doc') ||
                  item.name.endsWith('.docx')
              )
            );
          }}
          onClick={(e) =>
            inputFileRef.current &&
            typeof (e.target as HTMLDivElement).id === 'string' &&
            (e.target as HTMLDivElement).id.includes('drag')
              ? inputFileRef.current.click()
              : void 0
          }
        >
          <span id="drag-text" style={{ display: files.length > 0 ? 'none' : 'block' }}>
            Clique ou arraste e solte os arquivos aqui
          </span>
          <FilesPreview files={files} setList={setFiles} />
        </div>
        <input
          ref={inputFileRef}
          style={{ display: 'none' }}
          onInput={(e) => {
            setFiles(Array.from(e.currentTarget.files!));
            e.currentTarget.value = '';
          }}
          type="file"
          id="file"
          accept="image/*, video/*, audio/*, .txt,.doc,.docx,.pdf"
          multiple
        />
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
