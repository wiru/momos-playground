# Momos-Playground

Steps
Create repo
Tutorial to make canvas and walking character (https://www.youtube.com/watch?v=EYf_JwzwTlQ)
Tutorial for socket.io websocket for how to set up multiplayer. (https://www.youtube.com/watch?v=JEYEpledOxs)
npm i express // server
npm i socket.io // websocket
npm i nodemon // for hot reload
package.json -> start -> nodemon app.js // so that we can hot reload app.js
npm install -g @vue/cli
set server listening on 3000. Socket.io uses https as arg. https uses express as server. express runs express like app = express().    
set up socket.io listener with .on and give it a task
back in root dir, vue create client. Doesnt need to be client. Can use any word. 
vue create client - I had to use bash here as powershell apparently does not like the syntax or something. Bash doesnt let me select things with arrows so just hit enter which i hope is default. This created a client folder with public, src, gitignore, app.vue etc etc. Left me with 2 package.json so for now i will just ignore and continue. 
Now i split the console in two and ran npm start from the server dir and npm i socket.io -- save from the client dir. 
Commented out all the previous canvas code as it was breaking things for now. Server running. 
Renamed the helloworld to our app title and removed contents of style. Removed some stuff from html.
Cleaned the Momos.vue file of all extranious nonsense.  
npm run serve. 
Erros abound. Spent a while chasing my mistakes. No problem! 


