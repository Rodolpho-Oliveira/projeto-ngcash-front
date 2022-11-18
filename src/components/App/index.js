import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "../GlobalStyles"
import Home from "../Home"
import Login from "../Login"
import SignUp from "../SignUp"

export default function App(){
    return(
        <BrowserRouter>
        <GlobalStyle/>
            <Routes>
                <Route path="/" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/menu/:id" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}