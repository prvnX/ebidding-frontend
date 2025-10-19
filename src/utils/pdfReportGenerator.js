// PDF Report Generation Utility for Auction Manager Analytics

export const generatePDFReport = (analyticsData, selectedMonth, selectedYear) => {
  // Validate data exists
  if (!analyticsData) {
    alert('No analytics data available to generate report.');
    return;
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Safe data accessors with defaults
  const safeData = {
    totalRevenue: analyticsData.totalRevenue || 0,
    totalProfit: analyticsData.totalProfit || 0,
    totalAuctions: analyticsData.totalAuctions || 0,
    totalBids: analyticsData.totalBids || 0,
    totalItems: analyticsData.totalItems || 0,
    successRate: analyticsData.successRate || 0,
    averageBidPerItem: analyticsData.averageBidPerItem || 0,
    topCategory: analyticsData.topCategory || 'N/A',
    monthlyComparison: {
      revenueChange: analyticsData.monthlyComparison?.revenueChange || 0,
      profitChange: analyticsData.monthlyComparison?.profitChange || 0,
      auctionsChange: analyticsData.monthlyComparison?.auctionsChange || 0,
      bidsChange: analyticsData.monthlyComparison?.bidsChange || 0
    },
    categoryBreakdown: analyticsData.categoryBreakdown || [],
    weeklyPerformance: analyticsData.weeklyPerformance || [],
    topItems: analyticsData.topItems || []
  };

  // Create HTML content for printing
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Monthly Auction Analytics Report</title>
      <style>
        @media print {
          body { margin: 0; padding: 20px; }
          .no-print { display: none !important; }
        }
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #1e3a5f;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #1e3a5f;
          margin: 0;
          font-size: 28px;
        }
        .header p {
          color: #666;
          margin: 5px 0;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .summary-card {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          background: #f9f9f9;
        }
        .summary-card h3 {
          color: #1e3a5f;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        .summary-card .value {
          font-size: 24px;
          font-weight: bold;
          color: #2d4a6b;
        }
        .summary-card .change {
          font-size: 12px;
          margin-top: 5px;
        }
        .summary-card .change.positive {
          color: #10b981;
        }
        .summary-card .change.negative {
          color: #ef4444;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background-color: #1e3a5f;
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 14px;
        }
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .section-title {
          color: #1e3a5f;
          font-size: 20px;
          margin: 30px 0 15px 0;
          border-bottom: 2px solid #1e3a5f;
          padding-bottom: 5px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .metric-highlight {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6b 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .metric-highlight h3 {
          margin: 0 0 15px 0;
          font-size: 18px;
        }
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }
        .metric-item {
          text-align: center;
        }
        .metric-item .label {
          font-size: 12px;
          opacity: 0.9;
        }
        .metric-item .value {
          font-size: 20px;
          font-weight: bold;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Sri Lanka Customs - Auction Analytics Report</h1>
        <p><strong>Report Period:</strong> ${months[selectedMonth - 1]} ${selectedYear}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <div class="metric-highlight">
        <h3>Executive Summary</h3>
        <div class="metric-grid">
          <div class="metric-item">
            <div class="label">Total Revenue</div>
            <div class="value">${formatCurrency(safeData.totalRevenue)}</div>
          </div>
          <div class="metric-item">
            <div class="label">Total Profit</div>
            <div class="value">${formatCurrency(safeData.totalProfit)}</div>
          </div>
          <div class="metric-item">
            <div class="label">Profit Margin</div>
            <div class="value">${safeData.totalRevenue > 0 ? ((safeData.totalProfit / safeData.totalRevenue) * 100).toFixed(1) : '0.0'}%</div>
          </div>
          <div class="metric-item">
            <div class="label">Success Rate</div>
            <div class="value">${safeData.successRate}%</div>
          </div>
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <h3>Total Auctions Conducted</h3>
          <div class="value">${safeData.totalAuctions}</div>
          <div class="change ${safeData.monthlyComparison.auctionsChange > 0 ? 'positive' : 'negative'}">
            ${safeData.monthlyComparison.auctionsChange > 0 ? '↑' : '↓'} 
            ${Math.abs(safeData.monthlyComparison.auctionsChange)}% from last month
          </div>
        </div>
        <div class="summary-card">
          <h3>Total Bids Received</h3>
          <div class="value">${safeData.totalBids.toLocaleString()}</div>
          <div class="change ${safeData.monthlyComparison.bidsChange > 0 ? 'positive' : 'negative'}">
            ${safeData.monthlyComparison.bidsChange > 0 ? '↑' : '↓'} 
            ${Math.abs(safeData.monthlyComparison.bidsChange)}% from last month
          </div>
        </div>
        <div class="summary-card">
          <h3>Items Sold</h3>
          <div class="value">${safeData.totalItems}</div>
        </div>
        <div class="summary-card">
          <h3>Average Bids per Item</h3>
          <div class="value">${safeData.averageBidPerItem.toFixed(2)}</div>
        </div>
      </div>

      <h2 class="section-title">Category Performance Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th style="text-align: right;">Revenue</th>
            <th style="text-align: right;">Profit</th>
            <th style="text-align: right;">Items Sold</th>
            <th style="text-align: right;">Market Share</th>
          </tr>
        </thead>
        <tbody>
          ${safeData.categoryBreakdown.length > 0 ? safeData.categoryBreakdown.map(category => `
            <tr>
              <td><strong>${category.name}</strong></td>
              <td style="text-align: right;">${formatCurrency(category.revenue)}</td>
              <td style="text-align: right; color: #10b981;">${formatCurrency(category.profit)}</td>
              <td style="text-align: right;">${category.items}</td>
              <td style="text-align: right;"><strong>${category.percentage}%</strong></td>
            </tr>
          `).join('') : '<tr><td colspan="5" style="text-align: center; color: #999;">No category data available</td></tr>'}
        </tbody>
      </table>

      <h2 class="section-title">Weekly Performance Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th style="text-align: right;">Revenue</th>
            <th style="text-align: right;">Auctions Conducted</th>
            <th style="text-align: right;">Avg. Revenue per Auction</th>
          </tr>
        </thead>
        <tbody>
          ${safeData.weeklyPerformance.length > 0 ? safeData.weeklyPerformance.map(week => `
            <tr>
              <td><strong>${week.week}</strong></td>
              <td style="text-align: right;">${formatCurrency(week.revenue)}</td>
              <td style="text-align: right;">${week.auctions}</td>
              <td style="text-align: right;">${week.auctions > 0 ? formatCurrency(week.revenue / week.auctions) : 'N/A'}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" style="text-align: center; color: #999;">No weekly data available</td></tr>'}
        </tbody>
      </table>

      <h2 class="section-title">Top Performing Items</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Item Name</th>
            <th>Category</th>
            <th style="text-align: right;">Final Bid Amount</th>
            <th style="text-align: right;">Total Bids</th>
          </tr>
        </thead>
        <tbody>
          ${safeData.topItems.length > 0 ? safeData.topItems.map((item, index) => `
            <tr>
              <td><strong>#${index + 1}</strong></td>
              <td>${item.name}</td>
              <td>${item.category}</td>
              <td style="text-align: right; color: #10b981;"><strong>${formatCurrency(item.finalBid)}</strong></td>
              <td style="text-align: right;">${item.bids}</td>
            </tr>
          `).join('') : '<tr><td colspan="5" style="text-align: center; color: #999;">No top items data available</td></tr>'}
        </tbody>
      </table>

      <div class="footer">
        <p><strong>Sri Lanka Customs - E-Bidding System</strong></p>
        <p>This is a computer-generated report. For inquiries, please contact the Auction Management Department.</p>
        <p>Report ID: AUC-${selectedYear}-${(selectedMonth).toString().padStart(2, '0')}-${Date.now()}</p>
      </div>
    </body>
    </html>
  `;

  // Open print dialog with the report
  try {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to download the report.');
      return;
    }
    
    printWindow.document.write(reportContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = function() {
      printWindow.print();
    };
  } catch (error) {
    console.error('Error generating PDF report:', error);
    alert('Failed to generate report. Please try again.');
  }
};
