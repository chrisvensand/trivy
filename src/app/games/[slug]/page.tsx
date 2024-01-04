import NavigationBar from "@/components/NavigationBar"
import TriviaGame from "@/components/TriviaGame"

export default function GamePage({ params }: { params: { slug: string }}) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <NavigationBar />
            <TriviaGame slug={params.slug} />
        </div>
    );
}