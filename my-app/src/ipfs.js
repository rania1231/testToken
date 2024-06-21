/*import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

//const ipfsClient = require('ipfs-http-client');
const projectId = '7fb474094d8742ff83608f5986fe7986';
const projectSecret = '2udFlJw2Rfm5bk5ciFuCy1cXLYYN540XGX0uzyy9sS9BUbMMoW2Kow';  

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// Initialize IPFS client
const ipfs = create({ host: 'ipfs.infura.io',
   port: 5001,
    protocol: 'https'  ,
     headers: {
    authorization: auth,
  },
});

export async function uploadToIPFS(content) {
  const { path } = await ipfs.add(content);
  return path; // This is the CID
}*/

import { create } from 'ipfs-http-client';

// Connect to the local IPFS node
const client = create({
  host: 'localhost',
  port: '5001',
  protocol: 'http'
});

export async function uploadToIPFS(content) {
  const { path } = await client.add(content);
  return path; // This is the CID
}
