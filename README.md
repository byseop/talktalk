# TalkTalk  
> TalkTalk is a real-time chat web based on Firebase. Currently, this web service only Korean language.  
  
> This is an ongoing project. So not all codes are perfect. If there is a good way to develop this project, please contribute.

[![Netlify Status](https://api.netlify.com/api/v1/badges/82cedcab-8e7d-433d-a9f4-b4fbae35068e/deploy-status)](https://app.netlify.com/sites/talktalk/deploys)
  
Website link: https://talktalk.netlify.com  
  
## Project stack  
  
Following items are core technologies use in this project:

- Typescript 3.7 <=  
- React  
- Redux  
- CSS in JS (styled-components)  
- Google Web Fonts  
- Github oAuth login  
- Netlify  
- Netlify Lambda function  
- Will use cypress for testing  
  
## Running on your machine  
This instruction will get you copy of the project up and running on your machine for development or testing purposes.  
  
### Preparation  
- Node.js v10.17.0 <=  
- yarn
- Netlify account  
- Github oAuth login app
  
### Installation  
1. Clone the project
```
$ git clone https://github.com/byseop/talktalk.git
```  
2. Install packages from yarn  
```
$ cd talktalk
$ yarn
```
3. Rename .env.exmaple to .env.development and .env.production  
If you are concerned about uploading this file to your product, update your Netlife preferences.
```
# SET .env.development
# SET .env.production

# BASE
NODE_PATH = /
REACT_APP_BASE_HOST = http://localhost:YOUR_LOCAL_HOST

# GITHUB OAUTH APP
REACT_APP_CLIENT_ID = YOUR GITHUB OAUTH APP CLIENT ID
REACT_APP_CLIENT_SECRET = YOUR GITHUB OAUTH APP CLIENT SECRET
```
4. Start netlify lambda development server  
```
$ yarn start:lambda
```  
5. Start frontend development server  
```
$ yarn start
```
  
## Contributions  
Any kinds of contributions are welcomed. Since the test codes of the project is not completed yet, pull requests might take a while.