# Geo Path

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribution Guidelines](#contribution-guidelines)
* [Testing Instructions](#testing-instructions)
* [Questions](#questions)
## Description
As an avid long distance skater, I want an app that can show the path I took on a map and keep track of stats like distance and speed. In order to create this, I am utilizing React and Leaflet to recreate and add to the functionality I have created <a href='https://github.com/Glitch0320/skatepath'>here</a>. This new version adds statistics for speed and time, and allows logged in users to save their paths and track their overall stats. The creation of this project has given me a fair ammount of practice with the MERN stack, and has introduced me to the possibilities that Leaflet provides.
## Installation
`If you would like to work on this project with me, send me an email and I will be happy to teach and or learn from you. If you want to take this project in your own direction, you are welcome to clone or fork this repository.`
## Usage
When you visit the current live page, you can create an account if you want to save your overall statistics and paths themselves. Otherwise, you can click the Draw Path button to test it out. When you allow location access, if you see a circle, the app is narrowing in on your location. When accurate enough, the circle will change to a marker and the path drawing begins. Moving past ~15 m will add your new location, draw the line, and update your stats. Currently, I am still working out some bugs with the path saving function, but the path drawing works as expected.
## License
This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.
## Contribution Guidelines
Please reach out to me if you are interested in working together on this or if you have any ideas about what you would like to see on this app, although again anyone is welcome to clone this repo and push up their changes or open issues.
## Testing Instructions
In order to test the path drawing function without having to move, first, in Path.jsx (client/src/components/Path.jsx), uncomment the lines between all of the //TEST comments (Make sure to comment out any non-testing conditionals that throw an error). Next, add coordinates to the coords array in TestEvents.js (client/src/utils/TestEvents.js). Make sure they are in geojson format, [longitude, latitude]. <a href='https://geojson.io/'>Geojson.io</a> is a big help with this. Once you have all that done, run npm develop at the command line, navigate to the map page, and press start to draw the path.
## Questions
[Glitch0320](https://github.com/Glitch0320)

[glitch0320@gmail.com](glitch0320@gmail.com)
