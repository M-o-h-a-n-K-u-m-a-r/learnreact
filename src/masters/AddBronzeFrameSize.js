import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import LoadingSpinner from '../components/LoadingSpinner'; // Components
import bronzeData from '../JSON/BFS.json';

function AddBronzeFrameSize() 
{
    const [loading, setLoading] = useState(true); // useState for managing loading
    const navigate = useNavigate();
    const { id } = useParams(); // If ID exists, we're in edit mode
    const isEditMode = !!id;
    const [formData, setFormData] = useState({ name: '', size: '' });
    const [bronzeFrameOptions, setBronzeFrameOptions] = useState([]);
  
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);

        const uniqueNames = [...new Set(bronzeData.map(item => item.name))];
        setBronzeFrameOptions(uniqueNames);
  
        if (isEditMode) {
            const existingItem = bronzeData.find(item => item.id === parseInt(id));
            if (existingItem) {
                setFormData({ name: existingItem.name, size: existingItem.size });
            } else {
                alert('Item not found');
                navigate('/BronzeFrameSize');
            }
        }
    }, [id]);
  
    const handleSubmit = (e) => {
        e.preventDefault();
  
        if (!formData.name || formData.name === '-1' || !formData.size.trim()) {
            alert('Please select a Bronze Frame and enter a Size.');
            return;
        }
  
        if (isEditMode) {
            const itemIndex = bronzeData.findIndex(item => item.id === parseInt(id));
            if (itemIndex !== -1) {
                bronzeData[itemIndex] = {
                    ...bronzeData[itemIndex],
                    name: formData.name,
                    size: formData.size,
                };
                alert('Bronze Frame Size Updated!');
            }
        } else {
            const newItem = {
                id: bronzeData.length ? Math.max(...bronzeData.map(d => d.id)) + 1 : 1,
                name: formData.name,
                size: formData.size,
            };
            bronzeData.push(newItem);
            alert('Bronze Frame Size Added!');
        }
  
        navigate('/BronzeFrameSize');
    };

    if (loading) {
        return <LoadingSpinner />; // Conditional Rendering
    }
  
    return (
      <>
      <AppNavbar />
      <div className="container mt-4">
        <h2>{isEditMode ? 'Edit' : 'Add'} Bronze Frame Size</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Bronze Frame<span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} >
              <option value="-1">-- Select Bronze Frame --</option>
              {bronzeFrameOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Size<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" maxLength="100" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} />
          </Form.Group>

          <Button type="submit" variant="success">{isEditMode ? 'Update' : 'Save'}</Button>{' '}
          <Button variant="secondary" onClick={() => navigate('/BronzeFrameSize')}>Cancel</Button>
        </Form>
      </div>
    </>
  );
}

export default AddBronzeFrameSize;