export const fetchDashboardData = async () => {
  // Simulate a backend API call
  return {
    user: {
      firstName: 'Prabu',
      lastName: 'G',
      email: 'prabug@example.com',
      salesPersonCode: 'SP123',
      roleId: 5,
    },
    widgets: [1, 2, 3], // IDs that the user has permission to view
    salesPersons: [
      { code: 'SP123', name: 'Kishore' },
      { code: 'SP456', name: 'Mohan' },
    ],
  };
};