export default function GamePage({ params }: { params: { game_id: string }}) {
    return (
        <div>
            <h1>Game ID: {params.game_id}</h1>
            {/* rest of your page... */}
        </div>
    );
}
