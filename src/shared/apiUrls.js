export const BASE_URL = 'http://localhost:44346/';

const createUrl = (path) => `${BASE_URL}${path}`;

export const createTrainUrl = () => [
  createUrl('apo/train'),
  {
    method: 'POST',
  },
];

export const createTrainUrlPost = () => [
  createUrl('api/train'),
  {
    method: 'POST',
  },
];
