var firebaseConfig = {
      apiKey: "AIzaSyBN4_ilRpuTyaxFlva1FChSgwFLOe0u3nI",
      authDomain: "kwitter-ab16b.firebaseapp.com",
      databaseURL: "https://kwitter-ab16b-default-rtdb.firebaseio.com/",
      projectId: "kwitter-ab16b",
      storageBucket: "kwitter-ab16b.appspot.com",
      messagingSenderId: "1077272109310",
      appId: "1:1077272109310:web:3590f36899c13f7911c5af",
      measurementId: "G-DNTH6JP4CD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + username + " !";



function addroom() {
      Room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(Room_name).update({
            Purpose: "Adding room name"
      });
      localStorage.setItem("Room_name", Room_name);
      window.location = "kwitter_page.html";
}
//ADD YOUR FIREBASE LINKS HERE

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room names:" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick ='redirectToroomname(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();


function redirectToroomname(name){
      console.log(name);
      localStorage.setItem("room name",name);
      window.location="kwitter_page.html";
}

function logout() {
      window.location = "index.html";
      localStorage.removeItem("username");
      localStorage.removeItem("room name");
}