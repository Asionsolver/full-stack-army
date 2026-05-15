import type { Lottery } from '../types';

export const exportToCSV = (data: Lottery[], filename = 'lotteries.csv') => {
  const headers = ['ID', 'Username', 'Price', 'Created At', 'Updated At', 'Is Winner'];
  const rows = data.map((lottery) => [
    lottery.id,
    lottery.username,
    lottery.price.toString(),
    new Date(lottery.createdAt).toLocaleString(),
    new Date(lottery.updatedAt).toLocaleString(),
    lottery.isWinner ? 'Yes' : 'No',
  ]);

  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportToJSON = (data: unknown, filename = 'lotteries.json') => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportToPDF = async (data: Lottery[], _filename = 'lotteries.pdf') => {
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lotteries Export</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>Lotteries Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((lottery) => `
            <tr>
              <td>${lottery.id.slice(0, 8)}</td>
              <td>${lottery.username}</td>
              <td>$${lottery.price}</td>
              <td>${new Date(lottery.createdAt).toLocaleDateString()}</td>
              <td>${lottery.isWinner ? 'Yes' : 'No'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }
};