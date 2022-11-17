import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Login(){
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({name: "", password: ""})
    const [error, setError] = useState(false)
    return(
        <LoginPage>
            <img src="https://logomakercdn.truic.com/ux-flow/industry/bank-meta.png" alt="logo"/>
            <h1>NGBANK</h1>
            {error ? <ErrorMessage>Revise suas informações!</ErrorMessage> : null}
            <form onSubmit={acessAccount}>
                <InfoInput onChange={(e) => setUserLogin({...userLogin, name: e.target.value})} placeholder="Nome" type="text"/>
                <InfoInput onChange={(e) => setUserLogin({...userLogin, password: e.target.value})} placeholder="Senha" type="password"/>
                <SubmitButton type="submit" value="Entrar"/>
            </form>
            <DontHaveAccount>Não tem conta?<LinkPage to="/"> Clique aqui!</LinkPage></DontHaveAccount>
        </LoginPage>
    )
    
    function acessAccount(e){
        e.preventDefault()
        const promise = axios.post("http://localhost:5000/signin", userLogin)
        promise.catch((e) => {
            setError(true)
            console.log(e.response)
        })
        promise.then((response) => {
            console.log(response)
            localStorage.setItem("token", response.data[0])
            localStorage.setItem("name", response.data[1])
            navigate(`/menu/${localStorage.getItem("name")}`)
        })
    }
}

const LoginPage = styled.div` 
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

const DontHaveAccount = styled.p`
    color: #000000;
    font-size: 20px;
    margin-top: 10px;
`

const LinkPage = styled(Link)`
    text-decoration: none;
    margin-top: 10px;
    font-weight: 700;
`