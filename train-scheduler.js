  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBTfOb_Ybwb44m7nfaMBJeZ5xUPO9BDaUQ",
      authDomain: "train-station-86d38.firebaseapp.com",
      databaseURL: "https://train-station-86d38.firebaseio.com",
      projectId: "train-station-86d38",
      storageBucket: "train-station-86d38.appspot.com",
      messagingSenderId: "373348168521"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // initializing variables
  var trainName;
  var destination;
  var train1;
  var frequency = 5;
  var minutes;
  var firstTime = '12:00AM';

  database.ref().on("child_added", function (snapshot) {
      console.log(snapshot);
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      train1 = snapshot.val().train1;
      frequency = snapshot.val().frequency;

      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted)

      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var newRow = "<tr>";
      newRow = newRow + "<td>" + trainName + "</td>";
      newRow = newRow + "<td>" + destination + "</td>";
      newRow = newRow + "<td>" + frequency + "</td>";
      newRow = newRow + "<td>" + nextTrain + "</td>";
      newRow = newRow + "<td>" + tMinutesTillTrain + "</td>";
  })

  $("#Submit").on("click", function () {
      trainName = $("#train-input");
      destination = $("#destination-input");
      timeInput = $("#time-input");
      frequency = $("#frequency-input");

      database.ref().push({
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency
      })

  });