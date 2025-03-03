import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import { ReleaseNotes } from './components/layout/releasenotes/Releasenotes'
import { Header } from './components/layout/header/Header'
import { Footer } from './components/layout/footer/Footer'
import { ThemeProvider } from './components/layout/themeSwitch/Themecontext'
import { Home } from './components/layout/home/Home'
import { Tictactoe } from './components/apps/tictactoe/Tictactoe'

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="app-wrapper">
          <Header/>
          <main className="app-wrap" id="main">
              <Routes>
                <Route path='/' element={ <Home/> }></Route>
                <Route path='/tictactoe' element={ <Tictactoe/> }></Route>
                <Route path='/releasenotes' element={<ReleaseNotes/>}></Route>
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </main>
          <Footer/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
