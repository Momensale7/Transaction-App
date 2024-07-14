import axios from "axios"
import { createContext, useEffect, useState } from "react"
export const  DataContext =createContext(0)

export default function DataContextProvider({children}) {
    let [customers, setCustomers] = useState([])
    let [transactions, setTransactions] = useState([])
    // *getting customers data
    async function getCustomer() {
        let { data } = await axios("https://momensale7.github.io/host_api/data.json")
        console.log(data);
        let {customers}=data
        console.log(customers);
        setCustomers(customers)
        return data
    }
     // *getting transattions data
    async function getTransactions() {
        let { data } = await axios("https://momensale7.github.io/host_api/data.json")
        console.log(data);
        let {transactions}=data
        setTransactions(transactions)
    }
    useEffect(() => {
        getCustomer()
        getTransactions()
    }, [])
  return <>
<DataContext.Provider value={{customers,setCustomers,transactions,setTransactions }}>
    {children}
  </DataContext.Provider>
    </>
}
