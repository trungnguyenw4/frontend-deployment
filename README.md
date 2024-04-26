## About this project

For this project, I created a web app where visitors can read newspapers about Healty&Fitness topic. Once they decided to login/register, they can explore nearby insurance firms/borkers near by through a embedded and customised Google Map. Besides, after login the Admin can monitor customer through a private section, where he can add, edit, and remove customer. 

In order to archive those functionality, I need to have the following main with sub components:

+] Customer: Form, Table, List, Details
+] Authentication: Login, Logout, Registration and a helper to handle generated tokens
+] Map
+] NewsBoard : News Item
+] Navigation Bar

Besides, I also needed .css files for styling.

During my project, I applied user validation on Registration phase where users have to enter a correct email format, a correct password format, and then confirm the password before they can complete their registration. Also, when they login, they can not leave the fields email and password blank.

A widget for date time is used on Customer page when Admin creates or edits customer details.

### Deployment
After I have fully built those functions, I created a CORS policy that allows my backend service to communicate with my frontend one.

Next step, I need to let this frontend service know about my previously deployed backend service on Azure ['https://fontendservice.azurewebsites.net/' ]. After the final pull request of this version successfully merged to the main Branch on GitHub, I can start delpoying this project to AWS.

Link to my deployed app: [https://main.d31rt24o4jlzps.amplifyapp.com/home]

##Required dependencies:

react
react-router-dom
axios
@react-google-maps/api
@fortawesome/react-fontawesome
@fortawesome/free-solid-svg-icons
bootstrap
react-bootstrap
