import GameGrid from '@/components/GameGrid'
import NavigationBar from '../components/NavigationBar'

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <NavigationBar />
      <GameGrid />
    </div>
  )
}