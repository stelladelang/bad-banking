import React, { useContext, useState } from 'react';
import { Card, Button, Col, Alert } from 'react-bootstrap';
import { BankContext } from './context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAccount() {
  const { accounts, addAccount } = useContext(BankContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !password) {
      setStatus('Please fill in all fields');
      return;
    }
    // Check if email already exists
    const existingAccount = accounts.find((account) => account.email === email);
    if (existingAccount) {
      setAlertMessage('User already exists with the same email.');
      return;
    }

    // Call addAccount from context
    addAccount({ name, email, password });
    setAlertMessage('');
    setStatus('Account created successfully');
    setShow(false);
    toast.success('Successfully Created Account');
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setStatus('');
    setShow(true);
  };

  return (
    <div className="container mt-5">
      <h2>Create Account</h2>
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card className="bg-custom">
          <Card.Body>
            {show ? (
              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
                <Button type="submit" variant="primary" className="mt-3">
                  Create Account
                </Button>
              </form>
            ) : (
              <div>
                <h5>Success</h5>
                <Button variant="primary" onClick={clearForm}>
                  Add another account
                </Button>
              </div>
            )}
          </Card.Body>
          {status && <Card.Footer className="text-muted">{status}</Card.Footer>}
        </Card>
      </Col>
    </div>
  );
}

export default CreateAccount;
