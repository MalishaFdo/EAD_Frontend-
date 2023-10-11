export const BASE_URL = 'https://localhost:44346/';


// Define the endpoint for creating a train
export const createTrainUrl = () => createUrl('api/Train');
export const createTrainUrlPost = () => createUrl('api/Train'); // Add a new constant for POST

// Define the endpoint for creating a train schedules
export const createTrainScheduleUrl = () => createUrl('api/TrainSchedule/create');
export const createTrainScheduleUrlPost = () => createUrl('api/TrainSchedule/create');
export const getAllTrainSchedules = () => createUrl('api/TrainSchedule/getAll');
export const getByIdTrainSchedules = (id) => createUrl(`api/TrainSchedule/getById/${id}`);
export const updateByIdTrainSchedules = (id) => createUrl(`/api/TrainSchedule/update/${id}`);

// Define the endpoint for creating a User
export const createUserUrl = () => createUrl('api/User');
export const createUserUrlPost = () => createUrl('api/User');
export const getAllUsers = () => createUrl('api/User');

// Define the endpoint for creating a Resrvattions
export const createResrvationUrl = () => createUrl('api/Reservation/create');
export const createReservationUrlPost = () => createUrl('api/Reservation/create');
export const getAllReservations = () => createUrl('api/Reservation/getAll');
export const getByIdReservations = (id) => createUrl(`api/Reservation/getById/${id}`);
export const updateByIdReservations = (id) => createUrl(`/api/Reservation/update/${id}`);

const createUrl = (path) => `${BASE_URL}${path}`;

