$(document).ready(function () {
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

  function saveEvent(hour, eventText) {
    localStorage.setItem("event-" + hour, eventText);
  }

  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var eventText = localStorage.getItem("event-" + blockHour);

      if (eventText) {
        $(this).find(".description").val(eventText);
      }
    });
  }
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

  setInterval(currentTime, 1000);

  function currentTime() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY h:mm A");
    $("#currentDay").text(currentDate);

    currentDate.innerHTML = "currentDate.toLocaleTimeString()";
  }
});
