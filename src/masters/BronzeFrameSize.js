// Import necessary hooks and libraries
import React, { useState, useEffect } from 'react'; // Functional components, state, and side effects
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import DataTable from 'react-data-table-component'; // Library to render data tables
import { Button, Modal } from 'react-bootstrap'; // Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { FaEdit, FaTrashAlt, FaTimesCircle } from 'react-icons/fa'; // FontAwesome icons

// Custom components
import AppNavbar from '../components/AppNavbar'; // Top navigation bar
import LoadingSpinner from '../components/LoadingSpinner'; // Spinner during loading

// Importing mock data from local JSON file
import bronzeData from '../JSON/BFS.json';

function BronzeFrameSizes() {
  // State to control loading spinner
  const [loading, setLoading] = useState(true);

  // State to hold table data (initially empty)
  const [data, setData] = useState([]);

  // State to show/hide delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State to track which item is selected for deletion
  const [targetItem, setTargetItem] = useState(null);

  // useEffect to simulate API call on component mount
  useEffect(() => {
    setTimeout(() => {
      setData(bronzeData); // Load data from JSON file
      setLoading(false);   // Hide spinner after loading
    }, 500); // 0.5s simulated delay
  }, []); // Empty dependency array = run once on mount

  // Define custom styles for the DataTable
  const customStyles = {
    header: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    headRow: {
      style: {
        fontSize: '18px',
      },
    },
    rows: {
      style: {
        fontSize: '18px',
      },
    },
    cells: {
      style: {
        fontSize: '18px',
      },
    },
  };

  // Define the columns for DataTable
  const columns = [
    {
      name: 'Shape', // Column heading
      selector: row => row.name, // Property from data to display
      sortable: true, // Enable sorting
    },
    {
      name: 'Size',
      selector: row => row.size,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          {/* Edit icon triggers navigation to edit page */}
          <FaEdit
            className="text-primary me-2"
            title="Edit"
            role="button"
            onClick={() => navigate(`/edit/${row.id}`)}
          />
          {/* Delete icon shows confirmation modal */}
          <FaTrashAlt
            className="text-danger me-2"
            title="Delete"
            role="button"
            onClick={() => confirmDelete(row)}
          />
          {/* Status icon shows dummy alert */}
          <FaTimesCircle
            className="text-danger"
            title="Change Status"
            role="button"
            onClick={() => alert(`Status changed for: ${row.name}`)}
          />
        </>
      ),
    },
  ];

  // React Router navigation
  const navigate = useNavigate();

  // Open the delete confirmation modal
  const confirmDelete = item => {
    setTargetItem(item); // Store item to delete
    setShowDeleteModal(true); // Show modal
  };

  // Handle actual deletion after confirmation
  const handleDeleteConfirmed = () => {
    // Filter out the deleted item by ID
    setData(prevData => prevData.filter(item => item.id !== targetItem.id));
    setShowDeleteModal(false); // Hide modal
  };

  // Show spinner while data is loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // Return the main component UI
  return (
    <>
      <AppNavbar /> {/* Render navbar at top */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Bronze Frame Sizes</h2>

          {/* Button to navigate to Add form */}
          <Button variant="primary" onClick={() => navigate('/AddBronzeFrameSize')}>
            Add Bronze Frame Size
          </Button>
        </div>

        {/* Display the data in a table */}
        <DataTable
          columns={columns}           // Table columns
          data={data}                 // Data to display
          pagination                  // Enable pagination
          highlightOnHover            // Highlight row on hover
          dense                       // Compact style
          defaultSortFieldId={1}      // Default sort by first column
          customStyles={customStyles} // Custom styles
        />

        {/* Delete confirmation modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong>{targetItem?.name}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
            <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

// Export the component
export default BronzeFrameSizes;