import React, { useState } from 'react';
import './MemberVerificationForm.css'; // Import your CSS file

function MemberVerificationForm() {
  const [formData, setFormData] = useState({
    memberId: '',
    groupId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to Azure Function).
    console.log('Member verification data submitted:', formData);
  };

  return (
    <div>
      <h2>Member Verification Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="memberId">Member ID:</label>
          <input
            type="text"
            name="memberId"
            id="memberId"
            value={formData.memberId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupId">Group ID:</label>
          <input
            type="text"
            name="groupId"
            id="groupId"
            value={formData.groupId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MemberVerificationForm;
