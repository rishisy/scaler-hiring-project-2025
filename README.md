

# Evaluation Dashboard App - Mentor View

## Description

This application provides a comprehensive solution for mentors to evaluate students participating in semester-long projects in college. Mentors can assign students, evaluate them based on various parameters, edit or remove assigned students and their marks, and finally submit their evaluations. 

## Requirements

- Mentors can assign students to evaluate, adhering to the following conditions:
  - Each mentor can accommodate a minimum of 3 and a maximum of 4 students at a time.
  - No two mentors can assign the same student during the evaluation period.
- Mentors can assign marks to each student based on different parameters such as ideation, execution, viva/pitch, etc.
- Total marks should be visible to the mentor.
- Mentors can edit/remove assigned students and their marks, satisfying the same conditions as when adding new students.
- There should be a final submit functionality, locking the marks of all students after submission. Marks cannot be edited after submission.
- If some students have unassigned marks, mentors should not be able to submit/lock the marks.

## Usage

### Adding Students
1. Log in as a mentor.
2. Navigate to the add student page.
3. Select the students you wish to evaluate, ensuring you meet the accommodation criteria.
4. Assign marks to the selected students based on the specified parameters.
5. Save the assignments.

### Editing/Removing Students and Marks
1. Log in as a mentor.
2. Navigate to the edit/remove student page.
3. Find the student you wish to edit/remove and make the necessary changes.
4. Save the changes.

### Submitting Marks
1. Log in as a mentor.
2. Ensure all students have been assigned marks.
3. Navigate to the submit marks page.
4. Submit the marks, locking them in.

### Viewing Students and Marks
1. Log in as a mentor.
2. Navigate to the view page.
3. Use the available filters to view students whose marks are yet to be assigned or have already been assigned.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the database settings in `config.js`.
4. Run the application using `npm start`.

## Technologies Used

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB
