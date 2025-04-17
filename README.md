# PHP FULLSTACK TEST

## Commit Guidelines (English)

commit messages following this format:  `[TYPE] Brief description - YYYY-MM-DD HH:MM`

* `[FEAT]` for new features
* `[FIX]` for bug fixes
* `[REFACTOR]` for code improvements
* `[CHORE]` for other changes (e.g., documentation updates)

**Example:**

`[FEAT] Add user authentication - 2023-12-11 14:30`

## Install composer version 2.8.1

## RUN THE APP
* access the frontend directory : cd/Frontend
* build the docker image by running ./Docker.sh (N.B before that give execution mode to this file by typing chmod +X Docker.sh)

* access the backend directory : cd/Backend
* build the docker image by running ./Docker.sh (N.B before that give execution mode to this file by typing chmod +X Docker.sh)

*  access the Database directory : cd/Docker/Database
* build the docker image by running ./Docker.sh (N.B before that give execution mode to this file by typing chmod +X Docker.sh)

* to lunch the app on docker run **docker-compose up --build**

* An alternative to lunch the project is to : 
- access backend : cd Backend/
- run the command : **php artisan serve**
- access frontend : cd Frontend/
- run the command : **npm run dev**

node version v20.10.0
composer version 2.8.1
laravel version 10
php version 8.1.2