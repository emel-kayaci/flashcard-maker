import React, { useState, useEffect } from 'react';

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const [buttonData] = useState([
    { button: 'Flip', key: 'Enter or Space Bar' },
    { button: 'Previous', key: 'Arrow Left' },
    { button: 'Next', key: 'Arrow Right' },
    { button: 'Shuffle', key: 'S' },
    { button: 'Change Languages', key: 'C' },
  ]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? 'visible' : 'invisible'
      } z-50`}
      onClick={handleClickOverlay}
    >
      <div className="bg-white rounded p-4">
        <h2 className="text-lg font-bold mb-4">Keyboard Shortcuts</h2>
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 bg-gray-200">
                Button
              </th>
              <th className="border border-gray-400 px-4 py-2 bg-gray-200">
                Key
              </th>
            </tr>
          </thead>
          <tbody>
            {buttonData.map(({ button, key }) => (
              <tr key={button}>
                <td className="border border-gray-400 px-4 py-2">{button}</td>
                <td className="border border-gray-400 px-4 py-2">{key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InformationModal;
