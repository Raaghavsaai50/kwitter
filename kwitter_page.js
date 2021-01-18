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
Room_name = localStorage.getItem("Room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(Room_name).push({
            Username: username,
            Message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + Room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code.
                        console.log(firebase_message_id);
                        console.log(message_data);
                        username = message_data['Username'];
                        message = message_data['Message'];
                        Likes = message_data['likes'];
                        name_with_tag = "<h4>" + username + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value = " +Likes+ "    onclick='updatelike(this.id)'>";
                        span_with_button = "<span class='glyphicon glyphicon-thumbs-up'>  Likes:" + Likes + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_button;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updatelike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(Room_name).child(message_id).update({
            Likes: updated_likes
      });
}


function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("Room_name");
      window.location.replace("index.html");
}