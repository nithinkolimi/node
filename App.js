import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setFormData({ firstName: '', lastName: '', email: '' });
      });
  };

  return (
    <div className="App">
      <h1>User Management System</h1>
      <div>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.firstName} {user.lastName} - {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
