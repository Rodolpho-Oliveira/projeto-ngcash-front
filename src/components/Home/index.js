import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Home(){
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [newTransaction, setNewTransaction] = useState({value: 0, description: ""})

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

    }, [])    
    return(
        <HomePage>
            <Balance>
                <h1>Saldo Total</h1>
                <h1>R$ {balance},00</h1>
            </Balance>
            <Transactions>
                <h1>Transações</h1>
                <TransactionsList>
                    {transactions.length > 0 ? transactions.map((transaction, index) => {
                        return(
                            <Transaction key={index}>
                                <p>{transaction.debitedAccountId === localStorage.getItem("name") ? "Enviado" : "Pago"}</p>
                                <p>R${transaction.value},00</p>
                            </Transaction>
                        )
                    }): <p>Vazia 😥</p>}
                </TransactionsList>
            </Transactions>
        </HomePage>
    )
}

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

const Balance = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
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
    width: 100%;
    height: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
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