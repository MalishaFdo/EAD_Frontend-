export const BASE_URL = 'https://localhost:44346/';


// Define the endpoint for creating a train
export const createTrainUrl = () => createUrl('api/Train');
export const createTrainUrlPost = () => createUrl('api/Train'); // Add a new constant for POST

const createUrl = (path) => `${BASE_URL}${path}`;

