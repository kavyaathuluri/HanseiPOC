import React, { useState } from 'react';

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
        <div>
          <label>Member ID:</label>
          <input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Group ID:</label>
          <input
            type="text"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
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
