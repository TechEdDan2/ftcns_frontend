# React + Vite Frontend for FTCNS

## Tables of Contents
- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Future Improvements](#future-improvements)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Setup Instructions](#setup-instructions)
  - [Routes](#routes)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Overview
The frontend of the FTCNS application is built using React and Vite. It provides a user interface for users to interact with the application, including user authentication (sign up and log in), and simplified note management.

## Screenshots
![Screenshot Homepage](./public/screenshot_home.png)

## Features
- User Authentication: Users can sign up and log in to access their notes.
- Note Management: Users can create, view, edit, and delete notes.


## Future Improvements
- update the UI to be more visually appealing and user-friendly
- update a search feature to allow users to search for teams and notes more effectively
- explore new features such as team collaboration, note sharing, public notes, and more advanced note formatting options

## Built With
- React
- Vite
- CSS
- React Router
- Material UI

## Getting Started
To get a local copy of the project up and running, follow these steps:
### Setup Instructions
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies using `npm ci` - this will install the exact versions of dependencies specified in the `package-lock.json` file
4. Start the development server using `npm run dev`
5. Open your browser and navigate to `http://localhost:5173` to view the application

### Routes
- `/` - Homepage
- `/signup` - Sign Up page
- `/login` - Log In page
- `/profile` - User profile page (requires authentication)
- `/teams` - Teams page (requires authentication)
- `/teams/:team_number` - Team details page (requires authentication)
- `/notes` - Notes page (requires authentication)
- `/notes/:id` - Note details page (requires authentication)
-`/notes/:id/edit` - Edit note page (requires authentication)
-`/notes/create` - Create note page (requires authentication)
-`/notes/:id/edit` - Edit note page (requires authentication)

---

## Author
- Github - [TechEdDan2](https://github.com/TechEdDan2)
- Frontend Mentor - [@TechEdDan2](https://www.frontendmentor.io/profile/TechEdDan2)

## Acknowledgments
The YouTubers and other educational resources I have been learning from include: Coder Coder (Jessica Chan), BringYourOwnLaptop (Daniel Walter Scott), Kevin Powell, Dipesh Malvia (Scheduling Tasks - Cron Jobs), vairous Udemy courses, Geeks for Geeks, Stack Overflow, and Stony Brook University's Software Engineering Bootcamp (curriculum developed by Colt Steele) 

## License
This project is licensed under the ISC license