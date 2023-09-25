import React, { useEffect, useState } from 'react';
//import * as microsoftTeams from "@microsoft/teams-js";
import { PublicClientApplication } from '@azure/msal-browser';
import './AdminInterface.css'; 
import axios from 'axios';

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
const tokenEndpoint = 'https://login.microsoftonline.com/6077507f-bcd4-4ca1-bebd-e4ac1d05ffa4/oauth2/token';
const clientId = 'cada5da6-b77b-4b71-a944-43d72face384';
const clientSecret = '7905c4b1-007e-4b5a-869a-18d12932d312';
const scope = 'https://graph.microsoft.com/.default';
let newAccessToken='';
const tokenRequestData = {
  grant_type: 'client_credentials',
  client_id: clientId,
  client_secret: clientSecret,
  scope: scope,
};
async function getToken() {
  axios.post(tokenEndpoint, new URLSearchParams(tokenRequestData))
  .then(response => {
    newAccessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
  })
  .catch(error => {
    console.error('Error obtaining access token:', error);
  });

 
  
}


/*async function refreshToken() {
  try {
    const accounts = msalInstance.getAllAccounts();
    const silentRequest = {
      scopes: ['openid', 'profile', 'ChannelMessage.Send', 'access_as_user'],
      account: accounts[0], // Use the first account for simplicity; you can choose an appropriate account.
    };
console.log('Before token :', silentRequest);
    const response = await msalInstance.acquireTokenSilent(silentRequest);
console.log('After token :', response);
    // Use the new access token for your API request

    newAccessToken = response.accessToken;
console.log('token 1:', newAccessToken);
    // Make your API request with the new access token
    // ...
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}*/

const approveMember = async (memberId) => {
  try {
    // Call refreshToken() to obtain the access token
    
    getToken();
console.log('token 2:', newAccessToken);
    // Now, you can safely use the newAccessToken
    const accessToken = newAccessToken;

    const channelId = 'b5e569d7055b4dc8a0a40ff5e150a7b2'; // Replace with your channel ID
    const message = {
      body: {
        content: 'Authorization is successful!',
      },
    };
    const url = `https://graph.microsoft.com/v1.0/teams/${channelId}/messages`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, message, { headers });

    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

 
 /* const approveMember = (memberId) => {
        if (window.microsoftTeams) {
        // Initialize the Microsoft Teams SDK
             microsoftTeams.initialize();
            // Function to send a constant message to a channel
            const sendConstantMessage = () => {
                const message = {
                type: 'message',
                text: 'Verified details, authorization is successful!',
                };

            // Replace 'channelId' with the actual ID of the target channel
            const channelId = 'your-channel-id';

            // Send the message to the specified channel
            microsoftTeams.app.sendMessageToChannel(channelId, message);
            };
        }
        else{
            const axios = require('axios');
//https://teams.microsoft.com/l/channel/19%3ab5e569d7055b4dc8a0a40ff5e150a7b2%40thread.tacv2/Member%2520Form?groupId=b0e35fe5-a737-4891-9a75-2b7e1e5ad92f&tenantId=6077507f-bcd4-4ca1-bebd-e4ac1d05ffa4
            const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token
            const channelId = 'YOUR_CHANNEL_ID';//19:b5e569d7055b4dc8a0a40ff5e150a7b2@thread.tacv2/Member%20Form?groupId=b0e35fe5-a737-4891-9a75-2b7e1e5ad92f&tenantId=6077507f-bcd4-4ca1-bebd-e4ac1d05ffa4
            // Replace with the channel's ID

            const message = {
            body: {
                content: 'Authorization is successful!',
            },
            };

            const url = `https://graph.microsoft.com/v1.0/teams/${channelId}/messages`;

            const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            };

            axios.post(url, message, { headers })
            .then((response) => {
                console.log('Message sent:', response.data);
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });

        }
        
  };*/
    // // Send a message to the specified channel
    // microsoftTeams
    //   .getContext()
    //   .then((context) => {
    //     const conversationId = "YOUR_PRIVATE_CHANNEL_ID"; // Replace with the actual channel ID
    //     const messagePayload = {
    //       type: "message",
    //       attachments: [
    //         {
    //           contentType: "text/html",
    //           content: "Verified details, authorization is successful!",
    //         },
    //       ],
    //     };
  
    //     microsoftTeams.sendMessageToConversation(conversationId, messagePayload);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending message to Teams:", error);
    //   });
  
  

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
