interface FilesPreviewProps {
  files: Array<File>;
  setList: (list: Array<File>) => void;
}

export default function FilesPreview({ files, setList }: FilesPreviewProps) {
  return (
    <ul
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        margin: '1rem 0',
      }}
    >
      {files.map((file, index) => (
        <li
          key={index}
          style={{
            width: '100%',
            padding: '1rem',
            margin: '0.5rem 0',
            background: 'var(--bg-variant)',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <strong>{index + 1}. </strong>
            <span>
              {file.name}{' '}
              <span style={{ color: 'var(--variant)' }}>
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </span>
          </div>
          <button
            onClick={() => {
              const nList = [...files];
              nList.splice(index, 1);
              setList(nList);
            }}
            type="button"
            className="del"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
