import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CenteredModal({ navigate }) {
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please register or log in to use the cart feature</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={navigate}>Demo Account</Button>
      </Modal.Footer>
    </Modal>
  );
}
