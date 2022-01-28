// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    room_name = localStorage.getItem("room_name");
    function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html"
    }

    function send(){
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

      document.getElementById("message").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         like = message_data["like"];
         name = message_data["name"];
         message = message_data["message"];
         name_with_tag = "<h3>"+name+" <img id='tick' src='tick.png'></h3>";
         message_with_tag = "<h4>" + message + "</h4>";
         like_with_tag = "<button class='btn btn-danger' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>"

         row = name_with_tag + message_with_tag + like_with_tag + span_with_tag;

         document.getElementById("output").innerHTML += row;

      } });  }); }
getData();


function updateLike(message_id){
   button_id = message_id;
   likes = document.getElementById(button_id).value;
   update_likes = Number(likes) + 1;
   firebase.database().ref(room_name).child(message_id).update({
         like : update_likes
   });
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}