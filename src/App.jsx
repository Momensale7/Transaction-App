
import './App.css'
import Graph from './component/Graph/Graph'
import Transaction from './component/Transaction/Transaction'
import DataContextProvider from './context/DataContext'
export default function App() {


  return (<>
  <DataContextProvider>
  <Transaction/>
  {/* <TransactionGraph/> */}
  <Graph />
  </DataContextProvider>
  </>)
}
