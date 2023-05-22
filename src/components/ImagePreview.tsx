import { useState } from 'react';

export default function ImagePreview({ file: image, onRemoveClick }: PreviewProps) {
  const [src, setSrc] = useState('');

  const fileReader = new FileReader();
  fileReader.onload = () => setSrc(fileReader.result as string);
  fileReader.readAsDataURL(image);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onRemoveClick}
        type="button"
        style={{
          position: 'absolute',
          background: 'var(--danger)',
          right: '0.2rem',
          top: '0.2rem',
          boxShadow: '0px -1px 2px #fff',
        }}
      >
        <i style={{ color: '#ffffff' }} className="bi bi-x-lg"></i>
      </button>
      <img width={100} src={src} alt={image.name} />
    </div>
  );
}
