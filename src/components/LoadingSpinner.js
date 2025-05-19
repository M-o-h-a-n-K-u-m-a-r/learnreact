import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Button variant="primary" disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        &nbsp;{message}
      </Button>
    </div>
  );
}

export default LoadingSpinner;