class BronzeFrameSizeAPI {
  constructor() {
    this.baseUrl = '/api/bronze-frame-sizes';
  }

  // Get all bronze frame sizes
  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch frame sizes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching frame sizes:', error);
      throw error;
    }
  }

  // Get unique shape options
  async getShapeOptions() {
    try {
      const data = await this.getAll();
      return [...new Set(data.map(item => item.name))];
    } catch (error) {
      console.error('Error fetching shape options:', error);
      throw error;
    }
  }

  // Add new bronze frame size
  async add(item) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!response.ok) throw new Error('Failed to add frame size');
      return await response.json();
    } catch (error) {
      console.error('Error adding frame size:', error);
      throw error;
    }
  }

  // Update existing bronze frame size
  async update(id, item) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!response.ok) throw new Error('Failed to update frame size');
      return await response.json();
    } catch (error) {
      console.error('Error updating frame size:', error);
      throw error;
    }
  }

  // Delete bronze frame size
  async delete(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete frame size');
      return true;
    } catch (error) {
      console.error('Error deleting frame size:', error);
      throw error;
    }
  }

  // Change status of bronze frame size
  async changeStatus(id, status) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to change status');
      return await response.json();
    } catch (error) {
      console.error('Error changing status:', error);
      throw error;
    }
  }
}

export default new BronzeFrameSizeAPI();