import { mockclientes } from '@/mock';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // Access the client ID from the URL query parameters
    if (req.method === 'GET' && id) {
        // Handle GET requests to fetch client data with the specific ID
        const clientData = await fetchClientData(id);  // Replace with your logic to fetch data
        res.status(200).json(clientData);
    } else if (req.method === 'PUT') {
        // Handle PUT requests to update client data with the specific ID
        const updatedClientData = await updateClientData(req.body, id);  // Replace with your logic to update data
        res.status(200).json(updatedClientData);
    }
    else if (req.method === 'DELETE') {
        // Handle PUT requests to update client data with the specific ID
        const updatedClientData = await deleteClient(id);  // Replace with your logic to update data
        res.status(200).json(updatedClientData);
    }
    else {
        // Handle other HTTP methods (optional) or return an error
        res.status(405).json({ message: 'Method not allowed' });
    }
}

async function deleteClient(id: any) {
    return mockclientes.filter(cliente => cliente.id != id);
}

async function fetchClientData(id: any) {
    return mockclientes.filter(cliente => cliente.id)[0];
}

async function updateClientData(data: any, id: any) {
    return {
        ...data,
        id: id,
    };
}
