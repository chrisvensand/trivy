import NavigationBar from '../components/NavigationBar'
import CategoryGameComponent from '../components/CategoryGameComponent'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <NavigationBar />
      <div className="text-center text-white py-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
          Welcome to Trivy!
        </h1>
        <p className="mt-2">Explore and play a wide variety of trivia games for free.</p>
      </div>
      <CategoryGameComponent />
    </div>
  )
}