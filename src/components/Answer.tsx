export default function Answer({ choice, correctAnswer, onSubmit }: { choice: string, correctAnswer: string, onSubmit: (correct: boolean) => void }) {
    return (
        <button
            className="text-lg px-6 py-3 rounded bg-blue-500 text-white my-2"
            onClick={() => onSubmit(choice === correctAnswer)}
        >
            {choice}
        </button>
    );
}