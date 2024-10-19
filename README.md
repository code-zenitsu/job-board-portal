# Job Posting Board with Email Automation

This project is a full-stack job posting board where companies can register, verify their accounts via email, post jobs, and send automated emails to candidates.

## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js

## Features
- User Registration (Company)
- Email and mobile verification
- Company Login with JWT authentication
- Job Posting
- Candidate Email Automation

## Setup Instructions
1. Clone the repository
   ```
   git clone https://github.com/robocoder-repo/job-board-portal.git
   cd job-board-portal
   ```

2. Install dependencies
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Set up environment variables
   Create a .env file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   BASE_URL=http://localhost:5000
   ```

4. Run the application
   ```
   npm run dev
   ```

## Future Improvements
- Implement email templates for a more personalized candidate experience
- Add more robust error handling and user feedback
- Enhance the UI design according to the provided Figma file
- Implement unit and integration tests

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
