# Code Structure Overview

## Backend Structure
- **Controllers**
  - Handle incoming requests and define endpoints.
  - Examples: 
    - `AdminController`: Manages student and teacher operations.
    - `TeacherController`: Manages teacher-related operations.

- **Services**
  - Contain business logic and interact with repositories.
  - Examples:
    - `StudentService`: Manages student profiles and attendance.
    - `AdministratorService`: Handles administrative tasks.

- **Models**
  - Represent data structures used in the application.
  - Examples:
    - `StudentDetails`: Contains student information.
    - `TeacherDetails`: Contains teacher information.

- **Repositories**
  - Interface with the database to perform CRUD operations.
  - Examples:
    - `StudentDetailsRepository`: Manages student data persistence.
    - `ClassWiseAttendaceRepo`: Manages attendance records.

- **Configuration**
  - Contains application configuration settings.
  - Examples:
    - `SecurityConfig`: Configures security settings.
    - `CorsConfig`: Configures Cross-Origin Resource Sharing.

## Frontend Structure
- **Components**
  - UI elements built with React.
  - Examples:
    - `StudentProfile`: Displays student profile information.
    - `AddTeacher`: Form for adding a new teacher.

- **Services**
  - Handle API interactions with the backend.
  - Examples:
    - `StudentDashboardService`: Manages student-related API calls.
    - `UserService`: Manages user authentication and data.

- **Pages**
  - Represent different views or routes in the application.
  - Examples:
    - `StudentDashboard`: Main dashboard for students.
    - `AdminDashboard`: Main dashboard for administrators.

- **Resources**
  - Include CSS and other assets.
  - Examples:
    - CSS files for styling components.
    - Images and fonts used in the application.
