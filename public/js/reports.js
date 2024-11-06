document.getElementById('generateSalesReportBtn').addEventListener('click', generateSalesReport);
// ... other event listeners

function generateSalesReport() {
  // Show loading indicator
  document.getElementById('sales-report').innerHTML = '<div class="loader"></div>'; 

  getSalesData()
    .then(formatSalesData)
    .then(displaySalesReport)
    .catch(error => {
      console.error("Error fetching sales data:", error);
      document.getElementById('sales-report').innerHTML = "<p>Error generating report</p>";
    });
}

function getSalesData() {
  // Fetch data using fetch or XMLHttpRequest
  // ...
}

function formatSalesData(data) {
  // Format data 
  // ...
}

function displaySalesReport(formattedData) {
  document.getElementById('sales-report').innerHTML = formattedData;
}

// ... similar functions for inventory report and printReport