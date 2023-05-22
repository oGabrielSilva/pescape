import { useEffect, useState } from 'react';

export default function VideoPreview({ file: video, onRemoveClick }: PreviewProps) {
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    if (!videoURL) {
      const videoObjectURL = URL.createObjectURL(video);
      setVideoURL(videoObjectURL);
    }

    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

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
      <video controls width="100" height="auto">
        <source src={videoURL} type={video.type} />
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
}
