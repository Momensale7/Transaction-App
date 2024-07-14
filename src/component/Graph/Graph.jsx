import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext'; 

export default function Graph() {
  const { customers, transactions } = useContext(DataContext);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [chartData, setChartData] = useState(null);

  const chartContainer = useRef(null); 
  const chartInstance = useRef(null); 

  useEffect(() => {
    if (transactions.length === 0 || !selectedCustomerId) {
      return;
    }

    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === selectedCustomerId
    );

    const dailyTransactionAmounts = customerTransactions.reduce((acc, transaction) => {
      const date = transaction.date;
      const amount = transaction.amount;
      if (acc[date]) {
        acc[date] += amount;
      } else {
        acc[date] = amount;
      }
      return acc;
    }, {});

    const labels = Object.keys(dailyTransactionAmounts);
    const data = Object.values(dailyTransactionAmounts);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Total Transaction Amount',
          data: data,
          fill: false,
          backgroundColor: 'rgba(33, 55, 155, 0.8)', 
          borderColor: 'rgba(192, 192, 192, 1)', 
          borderWidth: 1,
        },
      ],
    });
  }, [transactions, selectedCustomerId]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }


    if (chartContainer.current && chartData) {
      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              mode: 'index',
              intersect: true,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date',
              },
              grid: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Amount',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', 
              },
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return '$' + value.toFixed(2);
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  useEffect(() => {
    handleCustomerSelect(customers.length > 0 ? customers[0].id : null);
  }, [customers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Transaction Graph</h2>
      <div className="w-full max-w-lg mx-auto mb-6">
        <select
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => handleCustomerSelect(parseInt(e.target.value))}
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-lg mx-auto">
        <canvas ref={chartContainer} id="transaction-chart" width="400" height="200" className='border border-slate-950 shadow-sm shadow-slate-800'></canvas>
      </div>
    </div>
  );
}
