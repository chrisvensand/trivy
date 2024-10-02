Here is the documented code with added comments and function docstrings for clarity:

```javascript
import { useState } from 'react';

/**
 * Question component renders a quiz question with multiple choice answers.
 * It allows the user to select an answer and provides feedback on whether
 * the selected answer is correct or not.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.question - The question text to be displayed.
 * @param {string[]} props.choices - An array of possible answer choices.
 * @param {string} props.correctAnswer - The correct answer for the question.
 * @param {function} props.onAnswer - Callback function to handle answer submission.
 * @param {string} props.selectedAnswer - The currently selected answer by the user.
 * @param {function} props.setSelectedAnswer - Function to update the selected answer.
 */
function Question({ question, choices, correctAnswer, onAnswer, selectedAnswer, setSelectedAnswer }: { question: string, choices: string[], correctAnswer: string, onAnswer: (isCorrect: boolean) => void, selectedAnswer: string, setSelectedAnswer: (choice: string) => void }) {
    // State to track if the answer has been submitted
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    /**
     * Handles the click event when an answer choice is selected.
     * It updates the selected answer, checks if it is correct,
     * and triggers the onAnswer callback.
     *
     * @param {string} choice - The answer choice selected by the user.
     */
    const handleAnswerClick = (choice: string) => {
        setSelectedAnswer(choice); // Update the selected answer
        const isCorrect = choice === correctAnswer; // Check if the selected answer is correct
        onAnswer(isCorrect); // Trigger the callback with the result
        setAnswerSubmitted(true); // Mark the answer as submitted
    };

    return (
        <div>
            <h2 className="text-3xl text-center mb-8">{question}</h2>
            <div className="grid grid-cols-2 gap-4">
                {choices.map((choice, index) => {
                    // Determine the button color based on the selected answer and correctness
                    let buttonColor = "bg-blue-500"; // Default color for unselected answers
                    if (selectedAnswer) {
                        if (choice === correctAnswer) {
                            buttonColor = "bg-green-500"; // Correct answer color
                        } else if (choice === selectedAnswer) {
                            buttonColor = "bg-red-500"; // Incorrect answer color
                        }
                    }
                    return (
                        <button
                            key={index}
                            className={`text-lg px-6 py-3 rounded text-white my-2 ${buttonColor}`}
                            onClick={() => handleAnswerClick(choice)} // Handle answer selection
                            disabled={selectedAnswer !== ""} // Disable button if an answer is already selected
                        >
                            {choice} {/* Display the answer choice */}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Question;
```

### Changes Made:
- Added a detailed function docstring for the `Question` component to describe its purpose and parameters.
- Added a docstring for the `handleAnswerClick` function to explain its functionality.
- Included inline comments to clarify the logic behind button color determination and the handling of answer selection.