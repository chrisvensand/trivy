import NavigationBar from '../../components/NavigationBar'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <NavigationBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
          Discover the Future of Trivia
        </h1>
        <p className="text-lg mt-4">
          Embark on an exhilarating trivia journey with <span className="font-bold">Trivy Trivia</span>, a next-generation web application crafted with the power of Next.js and TypeScript. Dive into the world of trivia like never before, fueled by the groundbreaking OpenAIs GPT-3.5-Turbo.
        </p>
        <p className="text-lg mt-4">
          At Trivy Trivia, each quiz is an adventure, pushing the boundaries of conventional gaming. Our AI-driven approach ensures a fresh, challenging, and captivating experience with every round you play. Prepare to have your knowledge tested and your curiosity sparked!
        </p>
        <p className="text-lg mt-4">
          Curious about the brains behind the game? Peek into the creative world of our founder. Connect on <Link href="https://github.com/chrisvensand"><span className="underline text-green-300">GitHub</span></Link> or <Link href="https://www.linkedin.com/in/chrisvensand/"><span className="underline text-green-300">LinkedIn</span></Link> to see where innovation meets passion.
        </p>
        <p className="text-lg mt-4">Your feedback is the catalyst for our growth. Share your thoughts or ask questions at <a href="mailto:chrisvensand@gmail.com" className="underline text-green-300">chrisvensand@gmail.com</a>.</p>
      </div>
    </div>
  )
}