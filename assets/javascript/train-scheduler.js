// Initialize Firebase
var config = {
    apiKey: "AIzaSyB6kb6WsTntgpMXd8wVRjHv0rY7anqkI9I",
    authDomain: "new-train-station.firebaseapp.com",
    databaseURL: "https://new-train-station.firebaseio.com",
    projectId: "new-train-station",
    storageBucket: "",
    messagingSenderId: "748630345318"
};
firebase.initializeApp(config);
var database = firebase.database();

// initializing variables
var trainName;
var destination;
var trainTime;
var frequency;
var tMinutesTillTrain;
console.log('test')

$("#Submit").on("click", function () {
    console.log('clicked the Submit button.');
    var trainName = $("#train-input").val();
    var destination = $("#destination-input").val();
    var trainTime = $("#time-input").val();
    var frequency = $("#frequency-input").val();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    })
})

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    trainTime = snapshot.val().trainTime;
    frequency = snapshot.val().frequency;

    var firstTimeConverted = moment(trainTime, "HH:mm");
    console.log("FIRST TIME: " + firstTimeConverted.format("HH:mm"));

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("TIME REMAINDER: " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrainwithMinutesAdded = moment().add(tMinutesTillTrain, "minutes");
    var nextTrain = moment(nextTrainwithMinutesAdded).format("hh:mm A")
    console.log('next train ', nextTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrainwithMinutesAdded).format("hh:mm"));

    $("#trainInfo").append("<tr><td>" + snapshot.val().trainName + "</td>" + "<td>" + snapshot.val().destination + "</td>" + "<td>" + snapshot.val().frequency + "</td>" + "<td>" + nextTrain + "</td>" + "<td>" + tMinutesTillTrain + "</tr></td>"

    );
});