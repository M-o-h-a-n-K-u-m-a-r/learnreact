import React, { useState } from 'react';

const InvoicePanel = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [invoices, setInvoices] = useState([]);

  const mockData = [
    { id: 1, date: '2025-05-01', customer: 'Acme Corp', amount: 1200.50 },
    { id: 2, date: '2025-05-05', customer: 'Globex Ltd.', amount: 850.00 },
    { id: 3, date: '2025-05-10', customer: 'Soylent Inc.', amount: 430.75 },
  ];

  const searchInvoices = () => {
    // Simulate filtering by date
    const filtered = mockData.filter(invoice => {
      return invoice.date >= fromDate && invoice.date <= toDate;
    });
    setInvoices(filtered);
  };

  const downloadExcel = () => {
    alert('Downloading Excel...');
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Total Invoice</div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col">
            <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="col">
            <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={searchInvoices} disabled={!fromDate || !toDate}>Search</button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-success ml-2" onClick={downloadExcel}>Download Excel</button>
          </div>
        </div>
         <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {invoices.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.customer}</td>
                    <td>${invoice.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No invoices found for the selected date range.</p>
          )}
        </div>
      </div>
      </div>
  );
};

export default InvoicePanel;
