// Import React and hooks
import React, { useState, useEffect } from 'react'; // useState to manage component state, useEffect to load initial data

// Import Bootstrap components
import { Form, Button } from 'react-bootstrap'; // For form UI and buttons

// Import routing hooks
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate for redirecting, useParams to read route parameters

// Import custom components
import AppNavbar from '../components/AppNavbar'; // Top navigation bar
import LoadingSpinner from '../components/LoadingSpinner'; // Spinner shown while loading

// Import local JSON data (mock database)
import bronzeData from '../JSON/BFS.json'; // Static data file (mocked)

function AddBronzeFrameSize() {
    // Local loading state to simulate spinner
    const [loading, setLoading] = useState(true);

    // Navigation handler (used to go back or redirect)
    const navigate = useNavigate();

    // Get the ID from the route if it exists
    const { id } = useParams(); // Will be undefined for add, set for edit

    // Determine if we're editing (true if id exists)
    const isEditMode = !!id;

    // Form fields (controlled input)
    const [formData, setFormData] = useState({ name: '', size: '' });

    // Dropdown options for "Bronze Frame" selection
    const [bronzeFrameOptions, setBronzeFrameOptions] = useState([]);

    // Load initial data and pre-fill form if in edit mode
    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false); // Hide spinner after delay
        }, 500);

        // Extract unique frame names from JSON data for the dropdown
        const uniqueNames = [...new Set(bronzeData.map(item => item.name))];
        setBronzeFrameOptions(uniqueNames);

        // If editing, load the item to pre-fill form
        if (isEditMode) {
            // Find the item with matching ID
            const existingItem = bronzeData.find(item => item.id === parseInt(id));
            
            if (existingItem) {
                // Fill form with existing data
                setFormData({ name: existingItem.name, size: existingItem.size });
            } else {
                // If item not found, show alert and redirect back
                alert('Item not found');
                navigate('/BronzeFrameSize');
            }
        }
    }, [id]); // Run only on initial mount or if ID changes

    // Handle form submission (Save or Update)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Simple form validation
        if (!formData.name || formData.name === '-1' || !formData.size.trim()) {
            alert('Please select a Bronze Frame and enter a Size.');
            return;
        }

        if (isEditMode) {
            // Edit logic: update the record in the data array
            const itemIndex = bronzeData.findIndex(item => item.id === parseInt(id));

            if (itemIndex !== -1) {
                // Modify the item directly
                bronzeData[itemIndex] = {
                    ...bronzeData[itemIndex],
                    name: formData.name,
                    size: formData.size,
                };
                alert('Bronze Frame Size Updated!'); // Show success message
            }
        } else {
            // Add logic: create new item with unique ID
            const newItem = {
                id: bronzeData.length ? Math.max(...bronzeData.map(d => d.id)) + 1 : 1,
                name: formData.name,
                size: formData.size,
            };

            // Push new item to array (in-memory only)
            bronzeData.push(newItem);
            alert('Bronze Frame Size Added!'); // Show success message
        }

        // Navigate back to the main list screen
        navigate('/BronzeFrameSize');
    };

    // Show spinner while loading
    if (loading) {
        return <LoadingSpinner />; // Show loader temporarily
    }

    // Render form
    return (
        <>
            <AppNavbar /> {/* Top nav bar */}
            <div className="container mt-4">
                <h2>{isEditMode ? 'Edit' : 'Add'} Bronze Frame Size</h2> {/* Dynamic title */}
                
                <Form onSubmit={handleSubmit}>
                    {/* Dropdown for Bronze Frame */}
                    <Form.Group className="mb-3">
                        <Form.Label>Bronze Frame<span className="text-danger">*</span></Form.Label>
                        <Form.Select 
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        >
                            <option value="-1">-- Select Bronze Frame --</option>
                            {bronzeFrameOptions.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Input for Size */}
                    <Form.Group className="mb-3">
                        <Form.Label>Size<span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                            type="text"
                            maxLength="100"
                            value={formData.size}
                            onChange={e => setFormData({ ...formData, size: e.target.value })}
                        />
                    </Form.Group>

                    {/* Submit and Cancel buttons */}
                    <Button type="submit" variant="success">
                        {isEditMode ? 'Update' : 'Save'}
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => navigate('/BronzeFrameSize')}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default AddBronzeFrameSize; // Export component so it can be used in routing