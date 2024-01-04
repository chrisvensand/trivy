'use client';

import { useState, useEffect, useMemo } from 'react';
import Question from '@/components/Question';
import Score from '@/components/Score';

interface Question {
    question: string;
    choices: string[];
    answer: string;
}

function TriviaGame({ slug }: { slug: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const fetchQuestions = () => {
        fetch(`/api/game?slug=${slug}&numQuestions=10`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data.body.questions);
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        fetchQuestions();
    }, [slug]);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }
    
        setAnswerSubmitted(true);
    };

    const handleNextQuestion = () => {
        if (answerSubmitted) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedAnswer("");
                setAnswerSubmitted(false);
            } else {
                setGameFinished(true);
            }
        }
    };

    const resetGame = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer("");
        setGameFinished(false);
    };

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledQuestions = useMemo(() => questions.map((question: Question) => ({
        ...question,
        choices: shuffleArray([...question.choices])
    })), [questions]);

    if (gameFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white shadow-2xl rounded-lg p-8 w-1/2 h-1/2">
                    <Score score={score} resetGame={resetGame} />
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-2xl rounded-lg p-8 w-1/2 h-1/2">
                <Question
                    question={questions[currentQuestionIndex].question}
                    choices={shuffledQuestions[currentQuestionIndex].choices}
                    correctAnswer={questions[currentQuestionIndex].answer}
                    onAnswer={handleAnswer}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                />
            </div>
            <div className="mt-4">
                {selectedAnswer ? (
                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={handleNextQuestion}>
                        Next
                    </button>
                ) : (
                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 opacity-0 cursor-default">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default TriviaGame;