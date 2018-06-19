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

  // Declare function to run when 'Submit' button is clicked:
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Assigns a variable to capture each field of user input:
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#firstTrain-input").val().trim(); 
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Combines those variables into an object:
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: trainTime,
      frequency: trainFrequency
    };
  
    // Pushes that data to the database using the reference created on line 11:
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
  
    // Empties user input out of the text boxes:
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });

  // The action on line 32 is what triggers this function to run.  The child being added to the database is the event, the child being added to the dom on lines 77-79 is just the visible effect of that.
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
  
    // Format the firstTrain
   // var trainTimeFormat = moment.unix(trainTime).format("HH:mm");
  
    // To calculate the next train
    //var nextTrain = moment().diff(moment(trainTime, "HH:mm"));
    //console.log(nextTrain);
  
    // Calculate the train frequency
   // var minutesAway = nextTrain * trainFrequency;
   // console.log(minutesAway);

     

     
     
 
     // First Time (pushed back 1 year to make sure it comes before current time)
     var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
     console.log(trainTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % trainFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var minutesAway = trainFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + minutesAway);
 
     // Next Train
     var nextTrain = moment().add(minutesAway, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
 
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesAway + "</td></tr>");
  });