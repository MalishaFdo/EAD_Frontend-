import { useEffect, useState } from 'react';
import { createTrainUrlPost, createTrainScheduleUrlPost, createReservationUrlPost, createUserUrlPost, createLoginUrlPost } from '../shared/apiUrls'; // Import the createTrainUrl function

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


// Update the createTrainSchedule function to use createTrainScheduleUrlPost for POST requests
const createTrainSchedule = async (data) => {
  try {
    const response = await fetch(createTrainScheduleUrlPost(), {
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

// Craete User
const CreateTraveler = async (data) => {
  try {
    console.log(data);
    const response = await fetch(createUserUrlPost(), {
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

// Craete Reservation
const createTicket = async (data) => {
  try {
    const response = await fetch(createReservationUrlPost(), {
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

// Login
const Login = async (data) => {
  try {
    const response = await fetch(createLoginUrlPost(), {
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

export { useApiResult, createTrain, createTrainSchedule, createLoginUrlPost }; // Export the createTrain function
