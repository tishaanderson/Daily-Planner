// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  function saveEvent(hour, eventText) {
    localStorage.setItem("event-" + hour, eventText);
  }

  currentTime();
  updateBlockClasses();
  loadEvents();

  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    console.log(hour);
    console.log(eventText);

    saveEvent(hour, eventText);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function updateBlockClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("data-hour"));

      if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("data-hour");
      var eventText = localStorage.getItem("event-" + blockHour);

      if (eventText) {
        $(this).find(".description").val(eventText);
      }
    });
  }

  // TODO: Add code to display the current date in the header of the page.

  setInterval(currentTime, 1000);

  function currentTime() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY h:mm A");
    $("#currentDay").text(currentDate);

    currentDate.innerHTML = "currentDate.toLocaleTimeString()";
  }
});
