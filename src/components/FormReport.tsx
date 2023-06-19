import { AppContext } from '@PescaPE/context/AppContext';
import { FormEventHandler, useContext, useEffect, useRef, useState } from 'react';
import FilesPreview from './FilesPreview';

export default function FormReport() {
  const {
    formReportVisible: visible,
    setFormReportVisible: setVisible,
    strings,
  } = useContext(AppContext);

  const [files, setFiles] = useState<Array<File>>([]);
  const [filesDataURL, setDataURL] = useState<Array<string>>([]);

  const selectTypeRef = useRef<HTMLSelectElement>(null);
  const inputDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const inputDetailsRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!selectTypeRef.current || !inputDescriptionRef.current || !inputDetailsRef.current) return;
    const { value: type } = selectTypeRef.current;
    const { value: descriptionOccurred } = inputDescriptionRef.current;
    const { value: detailsInvolved } = inputDetailsRef.current;
    const evidences = files.map(async (f) => {
      const func = () =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(f);
        });
      return await func();
    });
    Promise.all(evidences).then((e) => {
      fetch('/api/report', {
        method: 'POST',
        body: JSON.stringify({ type, descriptionOccurred, detailsInvolved, evidences: e }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  };

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
        onSubmit={onSubmit}
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
        <h2 style={{ marginBottom: '1rem' }}>{strings.formReportTitle}</h2>
        <div
          style={{
            width: '100%',
            borderBottom: '2px solid var(--text)',
            paddingBottom: '1rem',
            marginBottom: '2rem',
          }}
        >
          <span>{strings.formReportSubtitle}</span>
        </div>
        <label htmlFor="type">{strings.reportType}</label>
        <select name="type" ref={selectTypeRef} id="type">
          <option value="0">{strings.illegalFising}</option>
          <option value="1">{strings.predatoryFishing}</option>
          <option value="2">{strings.useOfProhibitedFishingMethods}</option>
          <option value="3">{strings.protectedAreaFishing}</option>
          <option value="4">{strings.other}</option>
        </select>
        <label htmlFor="description">{strings.formDescription}</label>
        <textarea
          name="description"
          ref={inputDescriptionRef}
          required
          placeholder="Forneça uma descrição detalhada do crime"
          id="description"
        />
        <label htmlFor="details">{strings.formDetails}</label>
        <textarea
          name="details"
          ref={inputDetailsRef}
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
          <span id="drag-text">Clique ou arraste e solte os arquivos aqui</span>
        </div>
        <FilesPreview files={files} setList={setFiles} />
        <input
          name="files"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onInput={(e) => setFiles(Array.from(e.currentTarget.files!))}
          type="file"
          id="file"
          accept="image/*, video/*, audio/*, .txt,.doc,.docx,.pdf"
          multiple
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="submit"
            style={{
              background: 'var(--variant)',
              color: 'var(--bg)',
              padding: '0.5rem 1rem',
              borderRadius: 8,
            }}
          >
            {strings.sendReport}
          </button>
          <button
            onClick={() => setVisible(false)}
            type="button"
            style={{
              background: 'transparent',
              color: 'var(--danger)',
              fontWeight: 700,
              padding: '0.5rem',
            }}
          >
            {strings.cancel}
          </button>
        </div>
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
