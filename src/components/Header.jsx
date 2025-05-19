import React from 'react';

const Header = ({ user }) => {
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div className="header bg-light py-2 mb-3 border-bottom d-flex justify-content-between align-items-center">
      <h4 className="m-0">Dashboard</h4>
      <div>
        <span className="text-muted">Welcome, {fullName}</span>&nbsp;&nbsp;&nbsp;
        <span className="ml-3 text-muted">Last refreshed on: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Header;
