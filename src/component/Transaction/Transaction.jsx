import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

export default function Transaction() {
    const { customers, transactions } = useContext(DataContext);
    let [filter, setFilter] = useState('')
    const [minAmountFilter, setMinAmountFilter] = useState('');
    const [filterType, setFilterType] = useState("name"); 
    const [maxAmountFilter, setMaxAmountFilter] = useState('');
    let [filteredTransactions, setFilteredTransactions] = useState([])
    
    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };
    function filterTable() {
        if (filterType == "name") {
            if (filter.trim() === '') {
                setFilteredTransactions(transactions);
            } else {
                const filtered = transactions.filter(transaction =>
                    customers.find(customer => customer.id == transaction.customer_id)
                        .name.toLowerCase()
                        .includes(filter.toLowerCase())
                );
                setFilteredTransactions(filtered);
            }
        }
        else {
            if (minAmountFilter.trim() === '' || maxAmountFilter.trim() === '') {
                setFilteredTransactions(transactions);
            } else {
                const filtered = transactions.filter(transaction => transaction.amount <= maxAmountFilter && transaction.amount >= minAmountFilter)
                setFilteredTransactions(filtered);
            }
        }
    }
    useEffect(() => {
        if (filter.trim() === '') {
            setFilteredTransactions(transactions);
        }
    }, [filter, transactions, customers]);
    // *filtering by transaction amount
    useEffect(() => {
        if (minAmountFilter.trim() === '' || maxAmountFilter.trim() === '') {
            setFilteredTransactions(transactions);
        }
    }, [minAmountFilter, maxAmountFilter, transactions, customers]);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-center text-blue-600 mt-8 mb-6">Customer Transactions Dashboard</h1>
            <div className="text-left text-xs font-medium text-gray-800 uppercase tracking-wider mb-4 flex">
            <span className="block text-center text-sm text-blue-800 me-8">Choose Filter Type</span>
                <div className="flex justify-center items-center pe-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="radio"
                        name="filterType"
                        value="name"
                        id="name"
                        checked={filterType === "name"}
                        onChange={handleFilterTypeChange}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="radio"
                        name="filterType"
                        value="amount"
                        id="amount"
                        checked={filterType === "amount"}
                        onChange={handleFilterTypeChange}
                    />
                </div>
            </div>
            {filterType === "name" && (
                <div>
                    <input
                        type="text"
                        placeholder="Filter by customer name"
                        className="px-3 py-2 mb-3 border col-span-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={filterTable} className="px-3 ms-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Search</button>
                </div>
            )}

            {filterType === "amount" && (
                <div className=" gap-3">
                    <input
                        type="text"
                        placeholder="Min"
                        className="px-3 me-3 py-2 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={minAmountFilter}
                        onChange={(e) => setMinAmountFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Max"
                        className="px-3 py-2 me-3 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={maxAmountFilter}
                        onChange={(e) => setMaxAmountFilter(e.target.value)}
                    />
                    <button onClick={filterTable} className="px-3  py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Search</button>
                </div>
            )}
                <div className="overflow-auto">
            <table className="min-w-full divide-y divide-zinc-800 shadow-md">
                <thead className="bg-gray-950">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                            Transaction Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white ">
                    {filteredTransactions.length == 0 && <tr><td colSpan={3} className="bg-yellow-100 text-center border-l-4 border-yellow-500 text-yellow-700 p-4">
                        No transactions matched your search criteria.
                    </td></tr>}
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {customers.find(customer => customer.id == transaction.customer_id)?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {transaction.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

    )
}
