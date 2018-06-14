var config = {
    apiKey: "AIzaSyAe8VVvvm5cnLoiiadtwu1IuNLMaS0ylfI",
    authDomain: "trilogy-train-schedules.firebaseapp.com",
    databaseURL: "https://trilogy-train-schedules.firebaseio.com",
    projectId: "trilogy-train-schedules",
    storageBucket: "trilogy-train-schedules.appspot.com",
    messagingSenderId: "724236428134"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#firstTrain-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: trainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    // Alert
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // Prettify the train firstTrain
    var trainTimePretty = moment.unix(trainTime).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var nextTrain = moment().diff(moment(trainTime, "X"), "months");
    console.log(nextTrain);
  
    // Calculate the total billed frequency
    var minutesAway = nextTrain * trainFrequency;
    console.log(minutesAway);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainTimePretty + "</td><td>" + nextTrain + "</td><td>" + trainFrequency + "</td><td>" + minutesAway + "</td></tr>");
  });