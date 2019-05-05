# Rocket Community Build 2019

_Our implementation won first place!_

Rocket Community Build is a hackathon hosted by Rocket Software. 2019 is the first year Rocket hosted the hackathon, and this year's challenge was designed by [CarePortal](https://careportal.org), a non-profit organization that connects local organizations with families in need. Our objective was to create an interface where local volunteers can donate products (e.g. beds, rugs, etc.) or services (e.g. electrical or plumbing skills) to those in need. This application serves to bolster the support local organizations can provide to families in need by creating a catalogue of items that are in need of a home.

## Project Structure

- frontend - UI components that are rendered by backend
- backend  - data storage and routing logic

The backend is in charge of properly storing and accessing the data, while the frontend is responsible for representing the data in a form that is easy to use

## Running the project

The frontend and backend are integrated using handlebars, a templating engine. To run this project, you will need [node.js](https://nodejs.org/en/). Once you have node installed, clone or download this project. Then,

```bash
cd backend
npm install # Only run this once, this installs required dependencies to make the server functional
node index.js # This starts the server
# Navigate to http://localhost:3000 to view the project
```
