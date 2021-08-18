# moveis-project
The server contains movies file and users file.
<br />
To login to the app. for regular user => name: user, password: 1234. for admin ==> name: admin, password: admin
<br />
<br />
1. Client side implemented using Angular.
to run client side use the following command: 1. npm install. 2. npm start

2. Server side implemented using express.
to run client side use the following command: 1. npm install. 2. npm start

3. Delete, Add, Edit movie available on Client and Server side.

4. Example for adding correct movie: 
<br />
title: <any>
<br />
category: <from dropdown>
<br />
url: https://www.imdb.com/title/tt6334354/mediaviewer/rm2855063297/
<br />
image: https://m.media-amazon.com/images/M/MV5BNGM3YzdlOWYtNjViZS00MTE2LWE1MWUtZmE2ZTcxZjcyMmU3XkEyXkFqcGdeQXVyODEyMTI1MjA@._V1_.jpg

5. Auth guard available

6. The website is responsive

7. API routes: 
<br />
A. /api/login (post)
<br />
B. /api/movies (CRUD operation)

8. App is running as an angular reactive app using rxjs

9. Docker files added to BE and FE accordingly
  <br />
  <br />
  9.a ==> Docker for BE - run the following commands:
  <br />
  1. make sure your're inside the server directory 
  <br />
  2. run docker build . -t moshe/node-web-app
  <br />
  3. docker run -p 3000:3000 -d moshe/node-web-app
  
  <br />
  <br />
  9.b ==> Docker for FE - run the following commands:
  <br />
  1. make sure your're inside the client directory 
  <br />
  2. run docker build . -t moshe/angular-app
  <br />
  3. docker run -p 9000:80 -d moshe/node-web-app 
