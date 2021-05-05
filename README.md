# eImovina

eImovina is the Montenegro's web based cadastral survey system. It enables users to search their real estate property by its plot number, real estate list number or address. Registered users can also track any changes for selected properties.

## Project

This project is formed from two key sub-repositories:
- eimovina-be,
- eimovina-fe.

### eimovina-be
Backend part of this project which is written in Serverless framework  with AWS services.
In order to run it, use command
```
npm run sls -- deploy
```
> Before running the project, install dependencies with the command
> **npm install**

### eimovina-fe
Frontend part of this project which is written in React framework using Typescript.
In order to run it, use command
```
npm start
```
> Before running the project, install dependencies with the command
> **npm install**

## Features roadmap

1. [x] Search by plot number or real estate list number.
2. [x] Search by address as well.
3. [x] Basic user registration and login.
4. [x] Daily fetching of real estate data from ekatastar.me.
5. [x] Select favourite properties for registered users.
6. [ ] Notify users once change has happened on their favourite properties.
7. [ ] Basic manipulation from registered users on additional fields on properties.
8. [ ] Payment service for favoriting more then three properties.
