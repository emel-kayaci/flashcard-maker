'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import FlashcardList from './components/FlashcardList';
import CardButton from './components/CardButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import { read, utils } from 'xlsx';
import { Flashcard } from './interfaces/Flashcard';
import InformationModal from './components/InformationModal';
import { FaQuestionCircle } from 'react-icons/fa';

const IndexPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFrontVisible, setIsFrontVisible] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [showFlashcards, setShowFlashcards] = useState<boolean>(false);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInformationOpen, setIsInformationOpen] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];
    setFile(selectedFile || null);
    setIsFileSelected(!!selectedFile);
  };

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const fileData = e.target?.result;
        if (fileData) {
          const workbook = read(fileData as ArrayBuffer, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const jsonData: any[][] = utils.sheet_to_json(worksheet, {
            header: 1,
          });

          // Find the column index of the image column
          const imageColumnIndex = jsonData[0].findIndex(
            (column) => column.toLowerCase() === 'image'
          );

          // Generate flashcards for each row
          const cards: Flashcard[] = jsonData
            .slice(1)
            .filter((row) => row[0] && row[1]) // Filter out rows with empty values
            .map((row) => ({
              frontLanguage: jsonData[0][0],
              backLanguage: jsonData[0][1],
              front: row[0],
              back: row[1],
              image:
                imageColumnIndex !== -1 ? row[imageColumnIndex] : undefined,
            }));

          setFlashcards(cards);
          setCurrentCardIndex(0);
          setShowFlashcards(false);
        }
      };

      fileReader.readAsArrayBuffer(file);
    }
  }, [file]);

  const handleGenerateFlashcards = () => {
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    } else {
      setShowFlashcards(true);
    }
  };

  const handleFlipCard = () => {
    setIsFrontVisible((prevIsFrontVisible) => !prevIsFrontVisible);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcards.length - 1)
    );
    setIsFrontVisible(true);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsFrontVisible(true);
  };

  const handleShuffleCards = () => {
    const shuffledCards: Flashcard[] = [...flashcards];

    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    setFlashcards(shuffledCards);
  };

  const handleChangeLanguages = () => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) => ({
        frontLanguage: flashcard.backLanguage,
        backLanguage: flashcard.frontLanguage,
        front: flashcard.back,
        back: flashcard.front,
        image: flashcard.image,
      }))
    );
  };

  const handleToggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
  };

  const handleToggleInformation = () => {
    setIsInformationOpen((prevIsInformationOpen) => !prevIsInformationOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } flex items-center justify-center`}
    >
      <div className="flex flex-col items-center px-4">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold mr-2">Flashcard Maker</h1>
          <FaQuestionCircle
            className="text-blue-600 cursor-pointer"
            onClick={handleToggleInformation}
          />
          <InformationModal
            isOpen={isInformationOpen}
            onClose={handleToggleInformation}
          />
        </div>
        <div className="mb-4 w-full max-w-md flex flex-col items-center">
          <FileUploader onFileUpload={handleFileUpload} />
          {!isFileSelected && errorMessage && (
            <div className="mt-2">
              <span className="text-red-500">{errorMessage}</span>
            </div>
          )}
          <div className="mt-2">
            <button
              className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition-colors duration-300"
              onClick={handleGenerateFlashcards}
            >
              Generate Flashcards
            </button>
          </div>
        </div>

        {showFlashcards && flashcards.length > 0 && (
          <>
            <div className="w-full max-w-md">
              <FlashcardList
                flashcards={flashcards}
                currentCardIndex={currentCardIndex}
                isFrontVisible={isFrontVisible}
              />
            </div>

            <CardButton
              onFlip={handleFlipCard}
              onPrevious={handlePreviousCard}
              onNext={handleNextCard}
              onShuffle={handleShuffleCards}
              onChangeLanguages={handleChangeLanguages}
              currentCardIndex={currentCardIndex}
              flashcardsLength={flashcards.length}
            />
          </>
        )}
        <ThemeToggleButton
          isDarkTheme={isDarkTheme}
          onToggleTheme={handleToggleTheme}
        />
      </div>
    </div>
  );
};

export default IndexPage;
