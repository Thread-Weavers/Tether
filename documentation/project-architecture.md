# Project Architecture: 

This project aims to create an app that facilitates meaningful connections among individuals facing mental health challenges by pairing them with accountability partners. The app will consist of several components, including a front-end user interface, a back-end server with APIs, and a secure database for user data. Below is an overview of how these components will interact and work together:

### Front-End Components (React and Socket.io):
* **User Interface (UI)**: The front-end will consist of the following components:

   * Welcome Screen:
     * Displays the Tether logo.
     * User can click Login or sign up button on the page to proceed to the login page or sign up page.
   * Login Page:
     * Input fields for:
       * Username
       * Password
   * "Create Account" button.
     * Input fields for:
       * First name
       * Last name
       * Username
       * Email
       * Password
       * Password confirmation
       * "Already have an account?" prompt with a "Sign In" button.
    * Questionnaire Page:
      * A dynamic multiple-choice questionnaire that updates after each selection.
      * Users answer 10 questions before progressing to the profile page.
    * Profile Page:
      * Navbar with the Tether logo and links to:
        * Chat
        * Personal Tether
        * Profile
      * Displays username, bio, and visibility options for goals, reminders and rituals.
    * Personal Tether Page:
        * Shows user account information and tethers public information.
        * Sections for reminders, routines, and appointments, each with buttons to add or check off items.
    * Chat Page:
      * Anyone signed in can talk in the live chat box
      * featuring usernames for each comment.
      * Input section for user participation in chat and access to conversations with accountability partners.
   
* **State Management**:
  * Task List Component:
    * Manages the state of tasks related to reminders, routines, and appointments.
    * Each task is an object with properties such as:
        * User ID
        * Description
        * Completion status
   * Input Forms:
     * Captures user input for creating accounts, adding reminders, routines, and appointments.
     * Validates required fields and manages the state of input values.
   * Navigation:
     * Utilizes React Router for seamless transitions between pages.
     * Navbar remains consistent across pages for easy access to core functionalities:
     * Chat
     * Personal Tether
     * Profile
     * Logout

### Back-End Components (Node.js with Express, Knex.js with SQL, PostGresSQL):
* **API Endpoints**: The back-end will expose several API endpoints to handle different actions such as fetching all tasks, adding a new task, updating a task, and deleting a task. These include:
* Goal Management:
  * POST /goals
  * GET /goals/:userId
  * GET /goals/public/:userId
  * GET /goals/:id
  * PATCH /goals/:id
  * DELETE /goals/:id
* Reminder Management:
  * POST /reminders
  * GET /reminders/:userId
  * GET /reminders/public/:userId
  * GET /reminders/:id
  * PATCH /reminders/:id
  * DELETE /reminders/:id
* Routine Management:
    * POST /routines
    * GET /routines/:userId
    * GET /routines/public/:userId
    * GET /routines/:id
    * PATCH /routines/:id
    * DELETE /routines/:id
* Chat Functionality:
    * GET /chat/global
* Questionnaire Management:
    * GET /questionnaire
    * POST /questionnaire

### Interaction Flow:
* When a user opens the app, the front-end will load and send an API request to fetch the user’s profile and associated data.
    * The back-end will retrieve this information from the database and return it as a response to the front-end.
    * The front-end will display the user’s profile, reminders, and routines on the UI.

* When a user creates a new reminder or routine, the front-end will send a request to the back-end’s API endpoint to create the new entry in the database.
    * The back-end will receive the request, validating that all required data is provided (user ID, reminder/routine details).
        * It will generate an ID and timestamp for the new entry, set its initial status, and store it in the database.
    * The new entry will be sent back to the front-end as a response.
    * The front-end will update the UI to display the newly added reminder or routine.

* When a user marks a reminder or routine as completed, the front-end will send a request to the respective back-end API endpoint to update the entry in the database.
    * The back-end will receive the request, ensuring that the required data is provided (user ID, reminder/routine ID).
        * It will update the entry’s status to completed and send back a success message.
    * The front-end will update the UI accordingly to reflect the change in status.

* When a user decides to delete a reminder or routine, the front-end will send a request to the back-end API endpoint to remove the entry from the database.
    * The back-end will process this request, verifying the required data (user ID, reminder/routine ID).
        * It will perform the deletion and send back a success/fail message in response.
    * The front-end will update the UI to remove the deleted entry.

* For chat functionalities, when a user enters a chat room, the front-end will send a request to retrieve the chat history.
    * The back-end will fetch the messages from the database and return them to the front-end.
    * The front-end will display the chat history on the UI.

* When a user sends a new message in the chat, the front-end will send a request to the back-end’s API endpoint to post the message.
    * The back-end will save the message to the database and return it as a response.
    * The front-end will update the chat UI to include the new message in the conversation.

Please note that this is a simplified architecture for a mental health accountability app. In real-world projects, you might consider adding features such as:

- **Authentication and Authorization**: 
    * Implement secure user authentication mechanisms (e.g., JWT, OAuth) to protect user data and ensure that only authorized users can access specific features.

- **Data Validation**: 
    * Use validation libraries to ensure that data sent to the server meets specific criteria, enhancing security and preventing malformed data from being processed.

- **Error Handling**: 
    * Implement comprehensive error handling on both the front-end and back-end to gracefully manage issues and provide informative feedback to users.

- **State Management**: 
    * For larger applications, you may use state management libraries like Redux or Context API to manage complex application states more efficiently.

- **More Complex Database Schemas**: 
    * Design database schemas that reflect more intricate relationships between users, partners, routines, and reminders, potentially utilizing features like indexing for performance.

- **APIs for External Resources**: 
    * Consider integrating third-party APIs for additional features such as mental health resources, articles, or professional support services.

These enhancements will improve the overall security, usability, and scalability of the application, making it more robust and user-friendly for those seeking mental health support.