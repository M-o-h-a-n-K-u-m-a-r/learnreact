import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt, FaTimesCircle } from 'react-icons/fa';
import AppNavbar from '../components/AppNavbar';
import LoadingSpinner from '../components/LoadingSpinner';
import bronzeData from '../JSON/BFS.json'; // Your JSON data file

function BronzeFrameSizes() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bronzeFrameOptions, setBronzeFrameOptions] = useState([]); // Dropdown options
  const [formData, setFormData] = useState({ name: '', size: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setData(bronzeData);
      // Extract unique bronze frame names for dropdown
      const uniqueNames = [...new Set(bronzeData.map(item => item.name))];
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
          <FaEdit
            className="text-primary me-2"
            title="Edit"
            role="button"
            onClick={() => openEditModal(row)}
          />
          <FaTrashAlt
            className="text-danger me-2"
            title="Delete"
            role="button"
            onClick={() => confirmDelete(row)}
          />
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

  const openAddModal = () => {
    setSelectedItem(null);
    setFormData({ name: '', size: '' });
    setShowModal(true);
  };

  const openEditModal = item => {
    setSelectedItem(item);
    setFormData({ name: item.name, size: item.size.toString() });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.name === '-1' || !formData.size.trim()) {
      alert('Please select a Bronze Frame and enter Size.');
      return;
    }

    if (selectedItem) {
      setData(prevData =>
        prevData.map(item =>
          item.id === selectedItem.id ? { ...item, name: formData.name, size: formData.size } : item
        )
      );
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
    return <LoadingSpinner />;
  }

  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Bronze Frame Sizes</h2>
          <Button variant="primary" onClick={openAddModal}>
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
        />

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Bronze Frame Size</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Bronze Frame<span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                >
                  <option value="-1">-- Select Bronze Frame --</option>
                  {bronzeFrameOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  maxLength="100"
                  value={formData.size}
                  onChange={e => setFormData({ ...formData, size: e.target.value })}
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

export default BronzeFrameSizes;
