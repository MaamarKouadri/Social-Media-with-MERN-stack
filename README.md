# Social-Media-with-MERN
 
Click in the link bellow to see the Project demo


 
 [Project Demo Video](https://youtu.be/N2-7BHr0Q-4)
 
 ### Project Description and purpose
 
This project was not meant to be a Social Media App per say but more as a tool to demonstrate the usage of the MERN stack and mostly how we can build, create, and use our own RESTful API . The user can create a profile, log in, post on the feed, a post is made of a picture, a title, and a description, each post has also a comments section and a like button system. The user can also modify his or her own profile which contains a profile pic and a small description of the user as well.  You will notice that the app overall is quite concise and pragmatic, where most of the action is in the Feed page that serves to consult all the posts of the users and to discuss between themselves. Again, the goal was not to code  a full social media app per say, but rather to demonstrate how the MERN stack allows us to produce a full stack app from scratch. MERN stands for MongoDB, Express, React, Node, it is also important to mention that I also have extensively used Redux, mainly Redux toolkit to handle the global variables within the app. 

### Technologies used :

### Frontend:  HTML,CSS,Javascript 

#### React:

React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. I also used Material-UI which is simply a library that allows us to import and use different components to create a user interface in our React applications. Material-UI offers very interesting features such as easily applied and controlled screen responsiveness. 

#### Programming Concepts:

•	Components/Design and Creation

•	Screen Responsiveness  

•	Frontend Routing/Navigation 

•	Dynamic component rendering

### Redux/Redux-toolkit: 

Redux is an open-source JavaScript library for managing and centralizing application states. In other words, it allows the developer to handle global variables throughout the entire app, which is very useful since the more the project grows the more components we have. We simply modify and access the states defined in the toolkit slices.

#### Programming Concepts:

•	State management over the entire app

•	Redux Dev Tools for efficient debugging 

### Backend:  JavaScript ,MongoDB/Mongoose 

###Express js: 
Express.js, or simply Express, is a back-end web application framework for building RESTful APIs with Node.js. This framework was the backbone of this project and the most important part, it allowed us to set the different endpoints and routes of the Restful API, also manage the requests sent from the Frontend, and send back the appropriate Response from the backend. The RESTful API acted as a gateway between the Frontend and Backend. 

#### Programming Concepts:

•	Backend routing through HTTP requests such as PUT, GET, POST, and DELETE

•	User Authentication through JWT token

•	RESTful APIs endpoints for specific layers of the app 


### MongoDB/Mongoose :

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program. That is the main advantage, it is non relational and very efficient to implement which is a contrast with traditional SQL databases. Since I am working in a JavaScript / Node js environment I have used Mongoose which is a library in node js that allows us to code CRUD operations to manipulate the database.

#### Programming Concepts:

•	CRUD operations through Mongoose methods

•	Collection/Schema Design that holds the data  

### Node js:
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser. This is where I set up my server to run the app.

console.logs were used for the purpose of debugging in this project , you may ignore them.


 ### Project Usage
 
 #### 1.	Fork the repo and then clone it or download it. Use Visual Studio Code preferably.
 
 
 #### 2.	Make sure to have node js set up on your computer, https://nodejs.org/en/

 #### 3.	Install all dependencies, by typing the following in the terminal, you must do it for the outside path, the frontend, and the backend since they all have package.json files with their own dependencies.

 #### npm install
     
• \Social-Media-with-MERN-stack-main\Social-Media-with-MERN-stack-main\Frontend\my-app\npm install

• \Social-Media-with-MERN-stack-main\Social-Media-with-MERN-stack-main\Backend\npm install

• \Social-Media-with-MERN-stack-main\Social-Media-with-MERN-stack-main\npm install
         
 #### 4.	You must run the app on port 5000 or else you can modify this line in server.js in the Backend folder
     app.listen(5000, () => {
    console.log('Server started on  port 5000'); });

 #### 5.	Go to the .env file and change the Mongo URI once you have your database link  set up , follow the steps at the following link https://www.mongodb.com/cloud/atlas/register and once you have your own URI you can modify the variable  MONGO_URI in the .env file in the backend folder 

 #### 6.	Start the frontend server type cd Frontend/my-app  in the terminal then press enter 
then type npm start 

•\Social-Media-with-MERN-stack-main\Social-Media-with-MERN-stack-main\Frontend\my-app\ npm start 


 #### 7.	Start the Backend serve type cd Backend in the terminal then type npm run nodemon and press enter.

•\Social-Media-with-MERN-stack-main\Social-Media-with-MERN-stack-main\Backend \ npm run nodemon


