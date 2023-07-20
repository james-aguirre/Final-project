# ValTrade

A full stack JavaScript application for gamers who want to buy in game accessories.

## Why I Built This

To test my ability in building a full stack e-commerce application.

## Technologies Used

- React.js
- Bootstrap
- Node.js
- Express.js
- PostgreSql
- Webpack
- Babel
- HTML5
- CSS3
- Azure

 ## Live Demo

Try the application live at jamesaguirre.azurewebsites.net/sign-in 

## Features

- Fully functional shopping cart the customer can add items, remove items and view items
- Customer can browse the catalog and click items to view a product details page
- Customer can type search the catalog, or search with a dropdown menu
- Customer can create an account and sign in
- Responsive UI for customers to shop on both mobile and desktop

<!-- ## Preview

![SGT React](assets/sgt-react.gif) -->

## Development

### System Requirements

- Node.js
- NPM
- PostgreSQL

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/James-Aguirre/ValTrade
   ```

1. Install all dependencies with NPM.

   ```shell
   npm install
   ```

1. Set up your database.

   ```shell
     sudo service postgresql start
   ```

1. While you are editing server/.env, also change the value of TOKEN_SECRET to a custom value, without spaces.

1. Create database (replace name-of-database with a name of your choosing), once created, it can be viewed by opening http://localhost:8081 in your browser
   
   ```shell
   createdb name-of-database
   ```

1. In the server/.env file, in the DATABASE_URL value, replace changeMe with the name of your database, from the last step

1. Start your app. Once started you can view the application by opening http://localhost:3000 in your browser

   ```shell
   npm run dev
   ```
