import Link from 'next/link';

function Score({ score, resetGame }: { score: number, resetGame: () => void }) {

    const handlePlayAgain = () => {
        resetGame();
    };

    let message;
    if (score < 7) {
        message = "Try again!";
    } else if (score < 10) {
        message = "Great job!";
    } else {
        message = "Congratulations, perfect!";
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-4xl font-bold text-blue-600">{message}</h2>
            <p className="text-2xl text-gray-700">Your final score is: <span className="text-3xl text-red-500">{score}/10</span></p>
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={handlePlayAgain}>Play Again</button>
            <Link href="/">
                <button className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">Home</button>
            </Link>
        </div>
    );
}

export default Score;