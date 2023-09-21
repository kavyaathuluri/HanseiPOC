import React, { useEffect, useState } from 'react';
import './AdminInterface.css'; 

const AdminInterface = () => {
  const [memberInputs, setMemberInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch member inputs for approval from your Azure Function.
        const response = await fetch('https://chatbotevafa.azurewebsites.net/api/GetMemberValidation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-functions-key': 'IfOY7krMmVBcaLrNsLWx6MYeTnj1DpCJWBcwK9kbHuavkrz2IBVZJw==',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const data = Array.isArray(responseData.Data) ? responseData.Data : [responseData.Data];
     
        //const data = responseData.Data;
console.info(data);
        setMemberInputs(data); // Assuming data is an array of member inputs.
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle approval logic here
  const approveMember = (memberId) => {
    // Implement logic to approve the member with memberId.
    // You may make an API call to update the approval status.
  };

  return (
    <div>
      <h2>Admin Interface - Member Inputs for Approval</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Group ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberInputs.map((member) => (
              <tr key={member.MemberId}>
                <td>{member.MemberId}</td>
                <td>{member.GroupId}</td>
                <td>{member.FirstName}</td>
                <td>{member.LastName}</td>
                <td>{member.DateOfBirth}</td>
                <td>
                  <button onClick={() => approveMember(member.memberId)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminInterface;
