import { Outlet } from 'react-router-dom'
import Navbar from '@features/navigation/components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 