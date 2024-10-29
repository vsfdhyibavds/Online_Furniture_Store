// Sample inventory data
const inventoryData = [
    { id: 1, product: 'Dining Table', quantity: 10, price: 300 },
    { id: 2, product: 'Sofa', quantity: 5, price: 500 },
    { id: 3, product: 'Coffee Table', quantity: 15, price: 150 },
    { id: 4, product: 'Bookshelf', quantity: 8, price: 200 },
    { id: 5, product: 'Chair', quantity: 20, price: 75 }
];

// Function to generate inventory report
function generateInventoryReport() {
    const inventoryReportDiv = document.getElementById('inventory-report');
    inventoryReportDiv.innerHTML = '<p>Generating inventory report...</p>';

    // Calculate total inventory value and prepare report data
    let totalInventoryValue = 0;
    let reportHtml = '<h4>Inventory Report</h4>';
    reportHtml += '<table><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total Value</th></tr>';

    inventoryData.forEach(item => {
        const itemTotalValue = item.quantity * item.price;
        totalInventoryValue += itemTotalValue;
        reportHtml += `<tr>
                          <td>${item.product}</td>
                          <td>${item.quantity}</td>
                          <td>$${item.price}</td>
                          <td>$${itemTotalValue}</td>
                       </tr>`;
    });

    reportHtml += '</table>';
    reportHtml += `<p>Total Inventory Value: $${totalInventoryValue}</p>`;

    // Display the report
    inventoryReportDiv.innerHTML = reportHtml;
}

// Function to generate sales report (already implemented)
function generateSalesReport() {
    const salesReportDiv = document.getElementById('sales-report');
    salesReportDiv.innerHTML = '<p>Generating sales report...</p>';

    // Sample sales data
    const salesData = [
        { id: 1, product: 'Dining Table', amount: 300, date: '2023-10-01' },
        { id: 2, product: 'Sofa', amount: 500, date: '2023-10-05' },
        { id: 3, product: 'Coffee Table', amount: 150, date: '2023-10-10' },
        { id: 4, product: 'Bookshelf', amount: 200, date: '2023-10-15' },
        { id: 5, product: 'Chair', amount: 75, date: '2023-10-20' }
    ];

    // Calculate total sales
    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);

    // Create a report
    let reportHtml = '<h4>Sales Report</h4>';
    reportHtml += `<p>Total Sales: $${totalSales}</p>`;
    reportHtml += '<ul>';
    salesData.forEach(sale => {
        reportHtml += `<li>Product: ${sale.product}, Amount: $${sale.amount}, Date: ${sale.date}</li>`;
    });
    reportHtml += '</ul>';

    // Display the report
    salesReportDiv.innerHTML = reportHtml;
}