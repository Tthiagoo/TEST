import { Outlet } from 'react-router-dom'
import Navbar from '@features/navigation/components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 