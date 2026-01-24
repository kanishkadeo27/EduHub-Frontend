import { useState } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import CourseFooter from './components/course/CourseFooter'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
