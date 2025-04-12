# Candidates Management Project

## Objective
Develop a web application to display, search, filter, and manage candidates' data using modern web technologies.

## Features

### Table View for Candidates
- Displays a list of candidates in a table format with the following columns:
  - **Name**: Full name of the candidate
  - **Phone**: Contact number
  - **Email**: Email address
  - **Gender**: Male, Female, or Other
  - **Experience**: 1 Year, 2 Years, 3 years, etc.
  - **Skills**: A list of candidate's skills (e.g., JavaScript, Python)

### Add Candidate
- A button labeled "Add Candidate" allows user to add new candidates.
- Opens a form (modal or separate page) with the following fields:
  - Name (Text field)
  - Phone (Number field)
  - Email (Email field)
  - Gender (Dropdown: Male, Female, Other)
  - Experience (Dropdown: 1 Year, 2 Years, 3 years, etc.)
  - Skills (Multi-select field to add multiple skills)
- On submission, the new candidate is saved to the backend database and displayed in the table.

### Search Functionality
- A search bar allows searching by **name**, **phone**, or **email**.
- The table updates dynamically as the user types.

### Pagination
- Display a limited number of candidates per page (e.g., 10 candidates).
- Includes **Next** and **Previous** buttons for navigation.

### Filtering Options
- A filter icon allows filtering candidates based on:
  - **Gender**: Male, Female, Other
  - **Experience**: 1 Year, 2 Years, 3 years, etc.
  - **Skills**: Select one or more skills
- The table updates dynamically based on the selected filter criteria.

## Technologies Used

### Frontend
- **React.js**: For building the user interface.

### Backend
- **Node.js** with **Express.js** or **Python** with **Flask/Django**: For creating routes and APIs.

### Database
- **MongoDB**, **MySQL**, or **PostgreSQL**: For storing candidate data.

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** (if using Node.js for the backend)
- **Python** and **pip** (if using Python for the backend)
- **MongoDB**, **MySQL**, or **PostgreSQL** installed and running locally or on a server.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Skvahida/Candidates-Management-Project.git
   cd Candidates-Management-Project/backend
   ```
2. Install dependencies:
   - For Node.js:
     ```bash
     npm install
     ```
   - For Python:
     ```bash
     pip install -r requirements.txt
     ```
3. Configure the database connection in the `.env` file.
4. Start the backend server:
   - For Node.js:
     ```bash
     npm start
     ```
   - For Python:
     ```bash
     python app.py
     ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Database Setup
- For **SQL-based databases**: Import the provided database dump.
- For **MongoDB**: Use the provided seed file to populate the database.

## Usage
1. Open your browser and navigate to `http://localhost:3000` (or the port specified in your frontend configuration).
2. Use the **Add Candidate** button to add new candidates.
3. Use the **Search** bar to find candidates by name, phone, or email.
4. Use the **Filter** icon to filter candidates by gender, experience, or skills.
5. Use the **Pagination** controls to navigate through the candidate list.

## Sample Data
- A sample database dump or seed file is available in the `database` directory.

## Submission
- Ensure the repository contains both the frontend and backend code.
- Provide clear instructions for running the application locally (as outlined above).

## License
This project is licensed under the MIT License. See the LICENSE file for details.
