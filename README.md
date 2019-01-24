# FEND Udacity – Project 7 – Neighborhood Map React

## Introduction and features:

The aim of this project to use all skills learned :sunglasses: in the Frontend Developer Nanodegree Program by Udacity to create a React application. The Neighborhood Map Application has the following features:

1. Responsiveness :sparkles: – All the features of the application are easily usable across all hand-held devices like Mobiles, Tablets, Laptops, Desktops etc.

1. Accessibility :sparkles: – Semantic HTML Tags are used, ARIA Attributes are included to explain the role of non-semantic elements, Keyboard accessibility is made easier with meaningful navigation across the application with the Tab Key.

1. Offline-first :sparkles: – The addition of a Service Worker to the application makes at least some parts of it accessible when the user goes offline, thereby giving a static version of the information viewed and not displaying a blank page when the Internet access is temporarily or fully unavailable.

1. React :sparkles: - React’s composition strategy to building web applications has been implemented in this project. Javascript’s ES6 Syntax and React’s robust framework have been utilized to create a scalable web application with minimum but effective code.

## Project Description:

The Neighborhood Map Application shows a simple map of the neighborhood in Hamburg, and the museums that are popular in Hafencity. A click on the individual places shows a short info dialog with information from Foursquare API. A hamburger menu toggles a list of places that are shown in the map. This menu also has a filter feature where the user can type into an Input to filter the displayed list of places. The corresponding markers in the map will also be filtered and displayed.

## Installation instructions:

1. Clone the Repository or download and unpack the zip file in a folder.

1. Goto the terminal and change to the directory or folder where the project is located. 

1. If you have not installed npm and node already, you can download and install them at https://nodejs.org/en/download/.

### Development mode:

1. After installing node and npm in the computer, run the following commands in order to run the application in the web browser at http://localhost:3000

`npm install`

`npm start`

The `npm install` command is to install the project dependencies, like babel and other packages needed for the application to run successfully. This may take a while, based on what you already have in your system. 

The `npm start` command compiles and runs the application in development mode.

Since this is a React application created with the ‘Create React App’ command, the application launches itself in the web browser after compilation.

However, if it does not start automatically, then goto the web browser and navigate to http://localhost:3000 after successful compilation. The page will reload if you make edits. You will also see any lint errors in the console.

### Production mode: 

1. Run the command `npm run build` for creating an optimized production build.

1. You can serve it in a static server using `serve -s build`

1. The application will be served at http://localhost:5000 locally, and at http://127.0.1.1:5000 in your network.

1. The above steps should be sufficient to run the application successfully. On the case of errors, feel free to create a pull request or report bugs in the respective sections of the project repository.

## Credits:

I am thankful to all the people :pray: and external sources for providing amazing resources :clap: so that I could complete this project on time and to my best abilities. The following is a list of people and sources I would like to thank for the wonderful help in my project:

1. Google - for the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
1. [Foursquare API](https://developer.foursquare.com/) - for the information about the venues used in this application
1. https://gps-coordinates.org/ - to help find GPS co-ordinates for many places given the address
1. Elharony's Tutorials - https://www.youtube.com/watch?v=_1RjbT5dIeM&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=5
1. Ryan’s Tutorial : https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be
1. Doing an off-canvas Menu properly: https://www.w3schools.com/howto/howto_js_off-canvas.asp
1. Conditionally setting class names based on state : https://stackoverflow.com/questions/30533171/react-js-conditionally-applying-class-attributes