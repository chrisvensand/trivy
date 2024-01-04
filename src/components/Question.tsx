import { useState } from 'react';

function Question({ question, choices, correctAnswer, onAnswer, selectedAnswer, setSelectedAnswer }: { question: string, choices: string[], correctAnswer: string, onAnswer: (isCorrect: boolean) => void, selectedAnswer: string, setSelectedAnswer: (choice: string) => void }) {
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const handleAnswerClick = (choice: string) => {
        setSelectedAnswer(choice);
        const isCorrect = choice === correctAnswer;
        onAnswer(isCorrect);
        setAnswerSubmitted(true);
    };

    return (
        <div>
            <h2 className="text-3xl text-center mb-8">{question}</h2>
            <div className="grid grid-cols-2 gap-4">
                {choices.map((choice, index) => {
                    let buttonColor = "bg-blue-500";
                    if (selectedAnswer) {
                        if (choice === correctAnswer) {
                            buttonColor = "bg-green-500";
                        } else if (choice === selectedAnswer) {
                            buttonColor = "bg-red-500";
                        }
                    }
                    return (
                        <button
                            key={index}
                            className={`text-lg px-6 py-3 rounded text-white my-2 ${buttonColor}`}
                            onClick={() => handleAnswerClick(choice)}
                            disabled={selectedAnswer !== ""}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Question;