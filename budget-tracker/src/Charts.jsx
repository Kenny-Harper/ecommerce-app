// import the chart components we need from recharts
// recharts is the library we installed with npm install recharts
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

// Charts component — shows spending breakdown and income vs expenses
// receives monthlyTransactions, totalIncome and totalExpenses as props
function Charts({ monthlyTransactions, totalIncome, totalExpenses }) {

  // DERIVED VALUE: group expenses by category for the pie chart
  // reduce builds an object like { Food: 200, Transport: 150 }
  // then we convert it to an array recharts can use
  const expensesByCategory = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      // if category already exists add to it, otherwise start at 0
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // convert the object into an array of { name, value } objects
  // recharts needs this format to render the pie chart
  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // data for the bar chart — just income vs total expenses
  const barData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpenses },
  ];

  // colours for each slice of the pie chart
  const COLOURS = ['#1565c0', '#e65100', '#2e7d32', '#6c63ff', '#c62828', '#f9a825', '#00838f'];

  // if no expenses yet don't show the charts
  if (pieData.length === 0) {
    return (
      <div className="charts-card">
        <p className="empty-message">Add some expenses to see charts!</p>
      </div>
    );
  }

  return (
    <div className="charts-card">

      {/* pie chart — spending breakdown by category */}
      <div className="chart-section">
        <h3>Spending by Category</h3>
        {/* ResponsiveContainer makes the chart fill its parent width */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"    // which field has the number value
              nameKey="name"     // which field has the label
              cx="50%"           // centre x
              cy="50%"           // centre y
              outerRadius={80}
            >
              {/* each slice gets a colour from our COLOURS array */}
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLOURS[index % COLOURS.length]} />
              ))}
            </Pie>
            {/* Tooltip shows value when hovering a slice */}
            <Tooltip formatter={(value) => `£${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* bar chart — income vs expenses */}
      <div className="chart-section">
        <h3>Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `£${value.toFixed(2)}`} />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {/* income bar is blue, expenses bar is orange */}
              {barData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === 'Income' ? '#1565c0' : '#e65100'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;