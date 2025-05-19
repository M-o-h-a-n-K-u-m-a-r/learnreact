import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt, FaTimesCircle } from 'react-icons/fa';
import AppNavbar from '../components/AppNavbar';
import LoadingSpinner from '../components/LoadingSpinner';
import bronzeData from '../JSON/PPS.json';

function ProductionProcessStatus() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ code: '', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(bronzeData);
      setLoading(false);
    }, 500);
  }, []);

  const customStyles = {
  headRow: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      border: '1px solid #dee2e6',
      backgroundColor: '#f8f9fa',
    },
  },
  headCells: {
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      borderRight: '1px solid #dee2e6',
    },
  },
  rows: {
    style: {
      fontSize: '16px',
      border: '1px solid #dee2e6',
    },
  },
  cells: {
    style: {
      borderRight: '1px solid #dee2e6',
      padding: '12px 16px',
    },
  },
};



  const columns = [
    {
      name: 'Process Status Code',
      selector: row => row.Process_Status_Code,
      sortable: true,
    },
    {
      name: 'Process Description',
      selector: row => row.Process_Status_Description,
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
            onClick={() => confirmStatusChange(row)}
          />
        </>
      ),
    },
  ];

  const openAddModal = () => {
    setSelectedItem(null);
    setFormData({ code: '', description: '' });
    setShowModal(true);
  };

  const openEditModal = item => {
    setSelectedItem(item);
    setFormData({
      code: item.Process_Status_Code,
      description: item.Process_Status_Description,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedItem) {
      setData(prevData =>
        prevData.map(item =>
          item.PPS_Id === selectedItem.PPS_Id
            ? {
                ...item,
                Process_Status_Code: formData.code,
                Process_Status_Description: formData.description,
              }
            : item
        )
      );
    } else {
      const newItem = {
        PPS_Id: data.length + 1,
        Process_Status_Code: formData.code,
        Process_Status_Description: formData.description,
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
    setData(prevData => prevData.filter(item => item.PPS_Id !== targetItem.PPS_Id));
    setShowDeleteModal(false);
  };

  const confirmStatusChange = item => {
    // Implement your status change logic here
    alert(`Status changed for: ${item.Process_Status_Code}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <div style={{ backgroundColor: '#fffbe6', minHeight: '100vh' }}>
      <AppNavbar />
      <div className="container mt-4 mb-5">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Production Process Status</h2>
          <Button variant="primary" onClick={openAddModal}>
            Add Production Process Status
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
            <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Production Process Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Process Status Code</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Process Description</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSave}>
              <FaEdit className="me-2" /> Save
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>

        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong>{targetItem?.Process_Status_Code}</strong>?
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
      </div>
    </>
  );
}

export default ProductionProcessStatus;
