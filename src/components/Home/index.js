import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Home(){
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [newTransaction, setNewTransaction] = useState({value: "", name: ""})
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token){
            window.location.href = "/"
        }
        axios
        .get(`http://localhost:5000/transaction/${localStorage.getItem("name")}`, {headers: {Authorization: `Bearer ${token}`}})
        .catch((e) => {
            console.log(e.response)
        })
        .then((response) => {
            console.log(response)
            setTransactions(response.data)
        })

        axios
        .get(`http://localhost:5000/home/${localStorage.getItem("name")}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            setBalance(response.data.account.balance)
        })
        .catch((e) => {
            console.log(e)
        })

    }, [load])    
    return(
        <HomePage>
            <Balance>
                <h1>Saldo Total</h1>
                <h1>R$ {balance},00</h1>
            </Balance>
            <NewTransaction>
                <h1>Nova Transação</h1>
                <form onSubmit={(e) => sendTransaction(e)}>
                    <InfoInput onChange={(e) => setNewTransaction({...newTransaction, value: parseInt(e.target.value)})} value={newTransaction.value} placeholder="Valor" type="number"/>
                    <InfoInput onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})} value={newTransaction.name} placeholder="Nome" type="text"/>
                    <SubmitButton type="submit" value="Enviar"/>
                </form>
            </NewTransaction>
            <Transactions>
                <h1>Transações</h1>
                <TransactionsList>
                    {transactions.length > 0 ? transactions.map((transaction, index) => {
                        return(
                            <Transaction key={index}>
                                {transaction.debitedAccountId === localStorage.getItem("name") ? <Green>Enviado </Green>: <Red>Pago</Red>}
                                <p>R${transaction.value},00</p>
                            </Transaction>
                        )
                    }): <p>Vazia 😥</p>}
                </TransactionsList>
            </Transactions>
        </HomePage>
    )

    function sendTransaction(e){
        e.preventDefault()
        const token = localStorage.getItem("token")
        axios
        .post(`http://localhost:5000/transaction/${localStorage.getItem("name")}`, newTransaction, {headers: {Authorization: `Bearer ${token}`}})
        .catch((e) => {
            console.log(e.response)
        })
        .then((response) => {
            setLoad(!load)
            setNewTransaction({value: "", name: ""})
        })
    }
}

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`

const Balance = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 150px;
    background-color: #A328D6;
    color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    font-size: 30px;
    font-weight: 700;

    h1{
        margin: 10px;
    }
`

const Transactions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;

    h1{
        margin: 10px;
    }
`

const TransactionsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    margin-bottom: 30px;

`

const Transaction = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
    padding: 0px 10px;

    p{
        margin: 10px;
    }
`

const NewTransaction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;

    input{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

const InfoInput = styled.input`
    width: 250px;
    height: 50px;
    border-radius: 10px;
    border: none;
    margin: 10px;
    padding: 0px 10px;
    font-size: 20px;
    font-weight: 700;
    background-color: #F2F2F2;
`

const SubmitButton = styled.input`
    width: 250px;
    height: 50px;
    border-radius: 10px;
    border: none;
    margin-left: 20px;
    padding: 0px 10px;
    font-size: 20px;
    font-weight: 700;
    background-color: #A328D6;
    color: #FFFFFF;
`

const Red = styled.p`
    color: red;
`

const Green = styled.p`
    color: green;
`
