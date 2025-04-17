//import { Route, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Brand/Home'
import Create from './pages/Brand/Create'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<Home/>} />
      <Route path="/brand/create" element={<Create/>} />
    </Routes>
    </>
  )
}

export default App
