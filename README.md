# Loom

Loom is an e-commerce site that enables selling products p2p.

[Click here for live view of site.](https://gather.city)

# Wiki Links
  * [API Documentation](https://github.com/cgrq/Loom/wiki/API-Documentation)
  * [Database Schema](https://github.com/cgrq/Loom/wiki/Database-Schema)
  * [Feature List](https://github.com/cgrq/Loom/wiki/Features)
  * [User Stories](https://github.com/cgrq/Loom/wiki/User-Stories)
  * [Wireframes](https://github.com/cgrq/Loom/wiki/Wireframes)
  * [Redux Store Shape](https://github.com/cgrq/Loom/wiki/Redux-Store-Shape)

# Tech Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# UI

## Homepage

![home page](assets/docs/loom-ui.png)

## Storefront Page

![storefront](assets/docs/storefront-ui.png)

## Product Page

![product](assets/docs/product-ui.png)

# Running project locally

## Step 1 (Run backend)

* Install python dependencies by running the `pipenv install -r requirements.txt` command.

* Install node dependencies by running the `npm install --prefix frontend`

* Make sure to create a `.env` file by following the `.env.example` given.

* Set up database by running the following commands:

   ```
   pipenv shell
   flask db upgrade
   flask seed all
   ```

* Start backend server by running the `flask run` command.

* Start frontend server by running the following commands:
   ```
   cd frontend
   npm start
   ```

# Contact

Feel free to message me on [LinkedIn](https://www.linkedin.com/in/c--r/)!
