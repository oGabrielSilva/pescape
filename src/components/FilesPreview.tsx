interface FilesPreviewProps {
  files: Array<File>;
  setList: (list: Array<File>) => void;
}

export default function FilesPreview({ files, setList }: FilesPreviewProps) {
  return (
    <div
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
        <div
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
            <span>{file.name}</span>
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
        </div>
      ))}
    </div>
  );
}
