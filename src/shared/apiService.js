import { useEffect, useState } from 'react';
import { createTrainUrlPost } from '../shared/apiUrls'; // Import the createTrainUrl function

const useApiResult = (request) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          setResults(await response.json());
          setError(null);
        } else {
          setError(await response.text());
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [request]);

  return [results, error];
};

// Update the createTrain function to use createTrainUrlPost for POST requests
const createTrain = async (data) => {
  try {
    const response = await fetch(createTrainUrlPost(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error creating train: ' + (await response.text()));
    }
  } catch (error) {
    throw new Error('Error creating train: ' + error.message);
  }
};

export { useApiResult, createTrain }; // Export the createTrain function
