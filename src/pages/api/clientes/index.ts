import { mockclientes } from '@/mock';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, body, } = req;
    if (req.method === 'GET') {
        // Handle GET requests to fetch client data with the specific ID
        const clientData = await fetchClientsData(query);  // Replace with your logic to fetch data
        res.status(200).json(clientData);

    } if (req.method === 'POST') {
        // Handle GET requests to fetch client data with the specific ID
        const clientData = await fetchNewClient(body);  // Replace with your logic to fetch data
        res.status(200).json(clientData);
    }
    else {
        // Handle other HTTP methods (optional) or return an error
        res.status(405).json({ message: 'Method not allowed' });
    }
}
async function fetchClientsData(query: any) {
    const { nombre, currentPage = 1, pageSize = 10 } = query;
    const mock = mockclientes.filter(cliente => nombre ? cliente.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase()) : true);
    return {
        clientes: paginate(mock, currentPage, pageSize),
        currentPage: currentPage,
        pageSize: pageSize,
        count: mock.length
    };
}

async function fetchNewClient(data: any) {

    return { ...data };
}

function paginate<T>(array: T[], currentPage: number, pageSize: number): T[] {
    // Check for invalid page numbers
    if (currentPage < 1 || pageSize <= 0) {
        throw new Error('Invalid page or page size');
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, array.length);

    return array.slice(startIndex, endIndex);
}

