import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListAccounts from "../pages/ListAccounts"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListAccounts/>} />
      </Routes>   
    </BrowserRouter>
    
  )
}

export default App
