<h1 align="center">
INPRES Scraper API
</h1>
<p align="center">
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
    <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white" alt="Puppeteer">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize">
</p>

This is an API that scrapes the INPRES website for earthquake events and stores them in a database, acting as a cache to improve subsequent responses. The INPRES (Instituto Nacional de Prevención Sísmica) is an Argentine organization that monitors seismic activity in the country. 
Link to the website: [INPRES](https://www.inpres.gob.ar/)

This project aims to provide a simple API for using the data in a frontend application.

## Technologies
This project has been built using the following technologies:
- Express.js
- SQLite and Sequelize (ORM)
- Puppeteer

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/inpres-scraper-api.git
    cd inpres-scraper-api
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## API Endpoints
- **GET** `/inpres/events`: Retrieve all events scraped from the INPRES website between the specified dates and store them in the database. Dates should be in the format `DD/MM/YYYY`.
- **GET** `/inpres/events/db`: Retrieve all events stored in the database between the specified dates. If some or all of the dates are not in the database, the API will scrape the INPRES website for the missing dates. Dates should be in the format `DD/MM/YYYY`.

## Features
- Scrapes the INPRES website for earthquake events.
- Stores the scraped events in a database.
- Retrieves events from the database between specified dates.

## Scripts
- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode using Nodemon.
- `npm run lint:check`: Runs ESLint to check for code errors.
- `npm run lint`: Runs ESLint to fix code errors.
- `npm run format`: Formats the code using Prettier.
- `npm run format:check`: Checks the code formatting using Prettier.

## Time Zone
The time zone used in the API is `America/Argentina/Buenos_Aires` (-3:00). 

## Contributing
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.
