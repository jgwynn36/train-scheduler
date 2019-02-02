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
  var trainTime; 
  var frequency;
//   var firstTime;
  var tMinutesTillTrain;

  database.ref().on("child_added", function (snapshot) {
              console.log(snapshot);
              trainName = snapshot.val().trainName;
              destination = snapshot.val().destination;
              trainTime = snapshot.val().trainTime;
              frequency = snapshot.val().frequency;

            //   var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
              var firstTimeConverted = moment(); 
              console.log("FIRST TIME: " + moment(trainTime).format("hh:mm"));

              var currentTime = moment();
              console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

              var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
              console.log("DIFFERENCE IN TIME: " + diffTime);

              // Time apart (remainder)
              var tRemainder = diffTime % frequency;
              console.log("TIME REMAINDER: " + tRemainder);

              // Minute Until Train
              var tMinutesTillTrain = frequency - tRemainder;
              console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

              // Next Train
              var nextTrain = moment().add(tMinutesTillTrain, "minutes");
              console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

              $("#trainInfo").append("<tr><td>" + snapshot.val().trainName + "</td" + "<td>" + snapshot.val().destination + "</td" + "<td>" + frequency + "</td>" + "<td>" + tMinutesTillTrain + "</td>" + "<td>" + nextTrain + " " + "</tr></td>"

                  //   newRow = newRow + "<td>" + trainName + "</td>";
                  //   newRow = newRow + "<td>" + destination + "</td>";
                  //   newRow = newRow + "<td>" + frequency + "</td>";
                  //   newRow = newRow + "<td>" + nextTrain + "</td>";
                  //   newRow = newRow + "<td>" + tMinutesTillTrain + "</td>";
                  //   newRow = newRow + "</tr>"
              );

          $("#Submit").on("click", function () {
              console.log('clicked the Submit button.');
              var train = $("#train-input");
              var destination = $("#destination-input");
              var trainTime = $("#time-input");
              var frequency = $("#frequency-input");

              console.log(train);
              console.log(destination);
              console.log(trainTime);
              console.log(frequency);

              database.ref().push({
                  train: trainName, 
                  destination: destination,
                  trainTime: trainTime,
                  frequency: frequency,
                  //nextTrain: nextTrain,
                  //tMinutesTillTrain: tMinutesTillTrain
              })
          })
        });