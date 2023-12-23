'use client';

import { useEffect, useState } from 'react';
import NavigationBar from "@/components/NavigationBar"
import Question from "@/components/Question"
import Answer from "@/components/Answer"

export default function GamePage({ params }: { params: { slug: string }}) {
    const [game, setGame] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        fetch(`/api/game?slug=${params.slug}&numQuestions=10`)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data, null, 4)); // Log the response
                setGame(data);
            })
            .catch(error => console.error('Error:', error));
    }, [params.slug]);

    if (!game) {
        return <div>Loading...</div>;
    }

    const question = game.body.questions[currentQuestionIndex];

    // If all questions have been answered, display the score
    if (currentQuestionIndex >= game.body.questions.length) {
        return (
            <div>
                <NavigationBar />
                <div className="flex flex-col items-center justify-center h-screen w-screen">
                    <div className="mb-20">
                        <h1 className="text-4xl font-bold">Score</h1>
                        <h2 className="text-2xl font-bold">{correctAnswers} / {game.body.questions.length}</h2>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <div className="mb-20">
                    <Question question={question.question}/>
                </div>
                <div className="grid grid-cols-2 gap-4 w-3/4">
                    {question.choices.map((choice, index) => (
                        <Answer 
                            key={index} 
                            choice={choice} 
                            correctAnswer={question.answer}
                            onSubmit={handleSubmit}
                            className="w-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}