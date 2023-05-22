import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

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
      }}
    >
      {files.map((file, index) => {
        if (file.type.startsWith('image/'))
          return (
            <ImagePreview
              onRemoveClick={() => {
                const list = [...files];
                list.splice(index, 1);
                setList(list);
              }}
              file={file}
              key={index}
            />
          );
        else if (file.type.startsWith('video/'))
          return (
            <VideoPreview
              file={file}
              key={index}
              onRemoveClick={() => {
                const list = [...files];
                list.splice(index, 1);
                setList(list);
              }}
            />
          );
      })}
    </div>
  );
}
