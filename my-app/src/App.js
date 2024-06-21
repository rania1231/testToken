import React, { useState, useEffect } from 'react';
import { uploadToIPFS } from './ipfs';
import { setCID, getCID } from './ethereum';

function App() {
  const [inputString, setInputString] = useState('');
  const [storedCID, setStoredCID] = useState('');
  const [retrievedString, setRetrievedString] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    async function connectMetamask() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else {
        console.log('Metamask not detected');
      }
    }
    connectMetamask();
  }, []);

  const handleUpload = async () => {
    try {
      const cid = await uploadToIPFS(inputString);
      await setCID(cid, account);
      
      // Verify that the storedCID has been updated
      const updatedCID = await getCID();
      console.log('Updated storedCID from contract:', updatedCID);
      
      if (updatedCID === cid) {
        console.log('CID successfully updated in contract.');
      } else {
        console.error('Failed to update CID in contract.');
      }

      setStoredCID(updatedCID);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  const handleRetrieve = async () => {
    try {
      console.log('Attempting to fetch CID from contract...');
      const cid = await getCID();
      console.log('CID fetched from contract:', cid);

      if (!cid) {
        console.error('No CID found in the contract.');
        return;
      }

      setStoredCID(cid);
      console.log('Fetching data from IPFS using CID:', cid);

      const response = await fetch(`http://localhost:8081/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`IPFS fetch failed: ${response.statusText}`);
      }

      const data = await response.text();
      console.log('Data fetched from IPFS:', data);

      setRetrievedString(data);
      console.log('Data set in state.');
    } catch (error) {
      console.error('Error retrieving from IPFS:', error);
    }
  };

  return (
    <div>
      <h1>IPFS and Ethereum Integration</h1>
      <div>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <button onClick={handleUpload}>Upload to IPFS</button>
      </div>
      <div>
        <button onClick={handleRetrieve}>Retrieve from IPFS</button>
      </div>
      <div>
        <h3>Connected Account: {account}</h3>
        <h3>Stored CID: {storedCID}</h3>
        <h3>Retrieved String: {retrievedString}</h3>
      </div>
    </div>
  );
}

export default App;




















/*import React, { useState, useEffect } from 'react';
import { uploadToIPFS } from './ipfs';
import { setCID, getCID } from './ethereum';

function App() {
  const [inputString, setInputString] = useState('');
  const [storedCID, setStoredCID] = useState('');
  const [retrievedString, setRetrievedString] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    async function connectMetamask() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else {
        console.log('Metamask not detected');
      }
    }
    connectMetamask();
  }, []);

  const handleUpload = async () => {
    try {
      const cid = await uploadToIPFS(inputString);
      await setCID(cid, account);
      
      setStoredCID(cid);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  const handleRetrieve = async () => {
    try {
      console.log('Attempting to fetch CID from contract...');
      const cid = await getCID();
      console.log('CID fetched from contract:', cid);

      if (!cid) {
        console.error('No CID found in the contract.');
        return;
      }

      setStoredCID(cid);
      console.log('Fetching data from IPFS using CID:', cid);

      const response = await fetch(`http://localhost:8081/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`IPFS fetch failed: ${response.statusText}`);
      }

      const data = await response.text();
      console.log('Data fetched from IPFS:', data);

      setRetrievedString(data);
      console.log('Data set in state.');
    } catch (error) {
      console.error('Error retrieving from IPFS:', error);
    }
  };

  return (
    <div>
      <h1>IPFS and Ethereum Integration</h1>
      <div>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <button onClick={handleUpload}>Upload to IPFS</button>
      </div>
      <div>
        <button onClick={handleRetrieve}>Retrieve from IPFS</button>
      </div>
      <div>
        <h3>Connected Account: {account}</h3>
        <h3>Stored CID: {storedCID}</h3>
        <h3>Retrieved String: {retrievedString}</h3>
      </div>
    </div>
  );
}

export default App;




/*
import React, { useState } from 'react';
import { uploadToIPFS } from './ipfs';

function App() {
  const [inputString, setInputString] = useState('');
  const [storedCID, setStoredCID] = useState('');
  const [retrievedString, setRetrievedString] = useState('');

  const handleUpload = async () => {
    const cid = await uploadToIPFS(inputString);
    setStoredCID(cid);
  };

  const handleRetrieve = async () => {
    // Fetch the string from IPFS using the CID
   
    const response = await fetch(`http://localhost:8081/ipfs/${storedCID}`);
    const data = await response.text();
    setRetrievedString(data);
  };

  return (
    <div>
      <h1>Local IPFS and React Integration</h1>
      <div>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <button onClick={handleUpload}>Upload to IPFS</button>
      </div>
      <div>
        <button onClick={handleRetrieve}>Retrieve from IPFS</button>
      </div>
      <div>
        <h3>Stored CID: {storedCID}</h3>
        <h3>Retrieved String: {retrievedString}</h3>
      </div>
    </div>
  );
}

export default App;
*/