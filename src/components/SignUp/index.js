import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SignUp(){
    const navigate = useNavigate()
    const [userSignUp, setUserSignUp] = useState({name: "", password: ""})
    const [error, setError] = useState(false)
    return(
        <SignUpPage>
            <img src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="logo"/>
            <h1>NGBANK</h1>
            {error ? <ErrorMessage>Revise suas informações!</ErrorMessage> : null}
            <form onSubmit={createAccount}>
                <InfoInput onChange={(e) => setUserSignUp({...userSignUp, name: e.target.value})} type="text" placeholder="Nome (minimo 3 dígitos)"/>
                <InfoInput onChange={(e) => setUserSignUp({...userSignUp, password: e.target.value})} type="password" placeholder="Senha (minimo 8 dígitos)"/>
                <SubmitButton type="submit" value="Cadastrar"/>
            </form>
            <AlreadyHaveAccount>Já tem conta?<LinkPage to="/login"> Clique aqui!</LinkPage></AlreadyHaveAccount>
        </SignUpPage>
    )

    function createAccount(e){
        e.preventDefault()
        const promise = axios.post(`${process.env.REACT_APP_URL}/signup`, userSignUp)
        promise.catch((e) => {
            setError(true)
            console.log(e)
        })
        promise.then(() => {
            navigate("/login")
        })
        
    }
}

const ErrorMessage = styled.p`
    color: red;
    font-size: 20px;   
`

const InfoInput = styled.input`
    margin-bottom: 10px;
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #000000;
    padding-left: 10px;
    font-size: 20px;
    color: #000000;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`

const SignUpPage = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    h1{
        font-size: 50px;
        font-weight: 700;
        margin: 20px 0px;
        color: #A328D6;
    }

    img{
        width: 200px;
        height: 200px;

    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

`

const AlreadyHaveAccount = styled.p`
    color: #000000;
    font-size: 20px;
    margin-top: 10px;
`
    

const LinkPage = styled(Link)`
    text-decoration: none;
    margin-top: 10px;
    font-weight: 700;
`

const SubmitButton = styled.input`
    background-color: #A328D6;
    color: #ffffff;
    font-weight: 700;
    border: 1px solid #A328D6;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

    &:active{
        background-color: #ffffff;
        color: #A328D6;
    }
    
    &:hover{
        background-color: #ffffff;
        color: #A328D6;
    }
`