import React from 'react';

const SalesPersonDropdown = ({ salesPersons, selected, onChange, user }) => {
  if (user.roleId === 20 || user.salesPersonCode) {
    return (
      <input type="hidden" name="selMSalesPerson" value={user.salesPersonCode} />
    );
  }

  return (
    <div className="form-group">
      <label>Sales Person:</label>
      <select className="form-control" value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {salesPersons.map((sp) => (
          <option key={sp.code} value={sp.code}>
            {sp.name} ({sp.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SalesPersonDropdown;
