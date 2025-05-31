import React, { useState, useEffect } from 'react'; // Components (Function Components), useState, useEffect
// - Functional component is used (`BronzeFrameSizes`).
// - `useState` and `useEffect` hooks are used for managing local state and simulating data loading.

import { useNavigate } from 'react-router-dom'; // React Router (for navigation)
import DataTable from 'react-data-table-component'; // Lists and Keys (used in table rows with `row.id`)
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt, FaTimesCircle } from 'react-icons/fa';
import AppNavbar from '../components/AppNavbar'; // Components
import LoadingSpinner from '../components/LoadingSpinner'; // Components
import bronzeData from '../JSON/BFS.json'; // Working with APIs (local JSON for mock data loading)

function BronzeFrameSizes() 
{ // JSX Syntax, Function Components
  const [loading, setLoading] = useState(true); // useState for managing loading
  const [data, setData] = useState([]); // useState for managing table data
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bronzeFrameOptions, setBronzeFrameOptions] = useState([]); // useState for form dropdown
  const [formData, setFormData] = useState({ name: '', size: '' }); // Controlled Components (form inputs bound to state)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  useEffect(() => { // useEffect Hook
    // Simulate loading data
    setTimeout(() => {
      setData(bronzeData); // Working with APIs (here from static JSON, simulating API call)
      const uniqueNames = [...new Set(bronzeData.map(item => item.name))]; // Lists
      setBronzeFrameOptions(uniqueNames);
      setLoading(false);
    }, 500);
  }, []);

  const customStyles = {
    header: {
      style: {
        fontSize: '20px',  // header font size
        fontWeight: 'bold',
      },
    },
    headRow: {
      style: {
        fontSize: '18px',  // header row font size
      },
    },
    rows: {
      style: {
        fontSize: '18px',  // body rows font size
      },
    },
    cells: {
      style: {
        fontSize: '18px',  // cell font size (can also set padding here)
      },
    },
  };  

  const columns = [
    {
      name: 'Shape',
      selector: row => row.name,
      sortable: true,
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
          {/* <FaEdit className="text-primary me-2" title="Edit" role="button" onClick={() => openEditModal(row)} /> */}
          <FaEdit className="text-primary me-2" title="Edit" role="button" onClick={() => navigate(`/edit/${row.id}`)} />
          <FaTrashAlt className="text-danger me-2" title="Delete" role="button" onClick={() => confirmDelete(row)} />
          <FaTimesCircle className="text-danger" title="Change Status" role="button" onClick={() => alert(`Status changed for: ${row.name}`)} />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  /* const openAddModal = () => {
    setSelectedItem(null); // Event Handling
    setFormData({ name: '', size: '' }); // Event Handling + useState
    setShowModal(true);
  }; */

  /* const openEditModal = item => {
    setSelectedItem(item);
    setFormData({ name: item.name, size: item.size.toString() }); // Props (indirect usage of item)
    setShowModal(true);
  }; */

  const handleSave = () => { // Event Handling
    if (!formData.name || formData.name === '-1' || !formData.size.trim()) {
      alert('Please select a Bronze Frame and enter Size.');
      return;
    }

    if (selectedItem) {
      setData(prevData =>
        prevData.map(item =>
          item.id === selectedItem.id ? { ...item, name: formData.name, size: formData.size } : item
        )
      ); // Conditional Rendering (inside `if`)
    } else {
      const newItem = {
        id: data.length ? Math.max(...data.map(d => d.id)) + 1 : 1,
        name: formData.name,
        size: formData.size,
      };
      setData(prevData => [...prevData, newItem]);
    }
    setShowModal(false);
  };

  const confirmDelete = item => {
    setTargetItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    setData(prevData => prevData.filter(item => item.id !== targetItem.id));
    setShowDeleteModal(false);
  };

  if (loading) {
    return <LoadingSpinner />; // Conditional Rendering
  }

  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Bronze Frame Sizes</h2>
          
          { /*<Button variant="primary" onClick={openAddModal}>
            Add Bronze Frame Size
          </Button> */}

          <Button variant="primary" onClick={() => navigate('/AddBronzeFrameSize')}>
            Add Bronze Frame Size
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          dense
          defaultSortFieldId={1}
          customStyles={customStyles}
        /> {/* Lists and Keys (data displayed in list/table) */}

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Bronze Frame Size</Modal.Title> {/* Conditional Rendering */}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Bronze Frame<span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} // Controlled Components
                >
                  <option value="-1">-- Select Bronze Frame --</option>
                  {bronzeFrameOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))} {/* Lists and Keys */}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size<span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" maxLength="100" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} // Controlled Components
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong>{targetItem?.name}</strong>? {/* Conditional Rendering */}
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

export default BronzeFrameSizes;