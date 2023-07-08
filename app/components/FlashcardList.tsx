import React from 'react';
import { motion } from 'framer-motion';
import { Flashcard } from '../interfaces/Flashcard';

interface FlashcardListProps {
  flashcards: Flashcard[];
  currentCardIndex: number;
  isFrontVisible: boolean;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  currentCardIndex,
  isFrontVisible,
}) => {
  const currentCard = flashcards[currentCardIndex];
  const hasImage = currentCard.image;

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <motion.div
          className={
            'relative bg-blue-600 rounded-lg text-white text-lg font-bold p-4 w-64 h-64 overflow-hidden shadow-md flex items-center justify-center'
          }
          animate={{ rotateY: isFrontVisible ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: '1000px' }}
        >
          {isFrontVisible ? (
            <div className="text-center">
              <div className="text-xs">{currentCard.frontLanguage}</div>
              <div className="flex flex-col h-full justify-center">
                {currentCard.front.split('\n').map((line, index) => (
                  <div key={index} className="text-center">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div className="transform" style={{ rotateY: '180deg' }}>
              <div className="text-center">
                <div className="text-xs">{currentCard.backLanguage}</div>
                <div className="flex flex-col h-full justify-center">
                  {currentCard.back.split('\n').map((line, index) => (
                    <div key={index} className="text-center">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              {hasImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={currentCard.image}
                    alt="Card"
                    className="max-h-48 max-w-full h-auto rounded shadow-md"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FlashcardList;
