
const firebaseConfig = {
  apiKey: "AIzaSyCZrLbFk77uAL4Mr-FECzLLroCPhL_n5NU",
  authDomain: "kwitter20-c45ac.firebaseapp.com",
  databaseURL: "https://kwitter20-c45ac-default-rtdb.firebaseio.com",
  projectId: "kwitter20-c45ac",
  storageBucket: "kwitter20-c45ac.appspot.com",
  messagingSenderId: "218294659837",
  appId: "1:218294659837:web:dbcffc7df55a8473beec94",
  measurementId: "G-FX60Q3C034"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name +"!";

function addRoom(){
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });
  
  localStorage.setItem("room_name",room_name);

  window.location = "kwitter_page.html";
}

function getData()
 {
   firebase.database().ref("/").on('value', function(snapshot) 
   {
     document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childSnapshot)
    {
      childKey  = childSnapshot.key;
       Room_names = childKey;
     row = "<div class = 'room_name' id="+Room_names+"onclick ='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
     document.getElementById("output").innerHTML += row;
     
      });});}
getData();
function redirectToRoomName(name){
  localStorage.setItem("room_name",name);
  window.location = "kwitter_page.html";
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}