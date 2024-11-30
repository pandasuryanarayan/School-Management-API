# School Management API

This project provides a set of APIs to manage school data, including adding new schools and retrieving a list of schools sorted by proximity to a user-specified location. The backend is built using **Node.js**, **Express.js**, and **MySQL**.

## Project Overview

### Features:
- **Add School**: Add a new school with details like name, address, latitude, and longitude.
- **List Schools**: Retrieve a list of schools, sorted by proximity to the user's specified latitude and longitude.

## Technologies Used:
- Node.js
- Express.js
- MySQL

## Database Setup

1. **MySQL Database**:
   Create a database called `school_management` in MySQL and set up the required `schools` table using the following schema:

   ```sql
   CREATE TABLE schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );
   ```

2. **Configuration**:
   - Replace the database configuration in the `.env` file (see below for details).

## Installation

### Prerequisites:
- Node.js
- MySQL
- npm or yarn for package management

### Steps to Setup:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
   ```

2. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add your MySQL database credentials:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=school_management
   ```

4. **Start the Server**:

   Run the application:

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints
`NOTE: all endpoints are served from /api`
`Eg: /api/addSchool and /api/listSchools`

### 1. Add School

- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload** (JSON):
   ```json
   {
     "name": "Springfield High School",
     "address": "123 Elm Street, Springfield",
     "latitude": 39.7817,
     "longitude": -89.6501
   }
   ```
- **Response** (Success):
   ```json
   {
     "message": "School added successfully",
     "schoolId": 1
   }
   ```
- **Response** (Error):
   ```json
   {
     "error": "Invalid input data"
   }
   ```

- **Functionality**: Adds a new school to the database. The API validates the input fields to ensure that all required fields are provided and are of the correct type.

- **Validation**:
   - `name`: Non-empty string.
   - `address`: Non-empty string.
   - `latitude`: Float value.
   - `longitude`: Float value.

---

### 2. List Schools

- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
   - `latitude` (required): The user's latitude (float).
   - `longitude` (required): The user's longitude (float).

- **Example Request**:

   ```
   GET http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060
   ```

- **Response**:
   ```json
   [
     {
       "id": 1,
       "name": "Springfield High School",
       "address": "123 Elm Street, Springfield",
       "latitude": 39.7817,
       "longitude": -89.6501,
       "distance": 12.34
     },
     {
       "id": 2,
       "name": "Riverdale Academy",
       "address": "456 Maple Avenue, Riverdale",
       "latitude": 39.8044,
       "longitude": -89.6490,
       "distance": 15.12
     }
   ]
   ```

- **Functionality**: Fetches all schools from the database and sorts them by proximity to the user's location (latitude, longitude). The distance is calculated using the Haversine formula.

- **Sorting Mechanism**: The schools are sorted based on the geographical distance between the user's coordinates and each school's coordinates.
---

## Directory Structure

```
/school-management-api
│
├── .env                # Environment configuration file
├── server.js            # Main server entry point
├── routes              # Contains API route definitions
│   ├── schoolRoutes.js # Routes for school management
├── controllers         # Contains logic for handling requests
│   ├── schoolController.js
├── models              # Database models and ORM setup
│   ├── schoolModel.js
├── config
|   ├── db.js           # Connecting to Database
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```

---

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.