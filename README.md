This is a role-based **Hospital Management System (HMS)** built using the **MERN stack** (MongoDB, Express, React, and Node.js). It allows administrators, doctors, lab technicians, and receptionists to manage patient records, appointments, and payments.

## Features
- **Admin**: Manage staff accounts, view payments, appointments, and patient records.
- **Doctor**: Access patient and lab records, schedule appointments.
- **Lab Technician**: Upload lab results.
- **Receptionist**: Register patients, book appointments, handle payments.

## Technology Stack
- **Frontend**: React (WIP)
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based with role-specific access

## Installation

1. Clone the repository:
   git clone https://github.com/ololadetemi/TrinityHospital_HMS.git

2. Install dependencies:
   cd TrinityHospital_HMS
   npm install

3. Create a `.env` file and add the following:
   PORT=5080
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret_key

4. Run the app:
   npm run dev

## Usage
- **Admin**: Manages users and hospital data.
- **Doctors**: View/edit patient records.
- **Lab Technicians**: Add lab results.
- **Receptionists**: Book appointments, handle payments.

## API Routes
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/api/patients`    | Create a new patient        |
| GET    | `/api/patients/:id`| Get patient by ID           |

