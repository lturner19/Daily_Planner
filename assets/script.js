$(document).ready(function () {

  const currentDate = moment().format('MMMM D YYYY');//displays the current day
  let currentHour = moment().hour();  //displays the current hour
  let plannerTasks = [9, 10, 11, 12, 13, 14, 15, 16, 17];


  //Visual representation of what is being created dynamically
  /* 
<div class="planner container"  
   <div class="row">
     <div class="col-sm-1">
   </div>
   <div class="col-sm-9">
     <textarea></textarea>
   </div>
   <div class="col-sm-2">
     <i class="fas fa-save"></i>
   </div>
  </div>
</div>
  */

  $("#currentDay").text(currentDate);//displays the current date in the header

  function getTime() {
    for (let index = 0; index < plannerTasks.length; index++) {//running through the array to display hours
      var row = $("<div class='row'>"); //creating a dynamic row div to hold all 3 columns
      var columnOne = $("<div  class='col-sm-1 text-right'>"); // creating dynamic column div to hold hour info

      // determines if hour is am or pm
      if (plannerTasks[index] >= 12) {
        var hour = plannerTasks[index] - 12; // changing military time to standard to reflect pm hours 
        if (plannerTasks[index] === 12) { //if 12-12 = 0, then display 12 not 0
          hour = 12;
        }
        columnOne.html(hour + " pm")  //adding pm to the hour being displayed
      } else {
        columnOne.html(plannerTasks[index] + " am")
      }


      var columnTwo = $("<div id='future' class='col-sm-9'>"); //dynamic div to hold textearea

      if (currentHour === plannerTasks[index]) {// setting css for present
        columnTwo = $("<div id='present' class='col-sm-9'>");
      }

      if (currentHour > plannerTasks[index]) { //css for past
        columnTwo = $("<div id='past' class='col-sm-9'>");
      }
      var textarea = $("<textarea>"); //dynamically creating div for textarea
      textarea.attr("id", "textarea" + index) //setting the attribute for textarea variable
      var textareaList = []; //array to hold info from textarea
      textareaList = JSON.parse(localStorage.getItem("textareaList")) || [] //retrieve info from local storage

      if (textareaList.length > 0) { //display info textarea
        textarea.html(textareaList[index])
      }
      columnTwo.append(textarea); //attach second column to first

      var columnThree = $("<div class='col-sm-2'>");
      var button = $("<button class='saveBtn'>"); //creating button
      var i = $("<i class='fas fa-save'>"); // icon from "Font-Awesome"
      button.append(i);
      columnThree.append(button); //button/icon are now attached to column three
      row.append(columnOne, columnTwo, columnThree); //the complete row is put together
      $(".planner").append(row); //all rows will appear in this div

      $(".saveBtn").on("click", function () {//allows button to save hours and textarea info to local storage
        var textareaList = [];
        for (let index = 0; index < plannerTasks.length; index++) {
          var textValue = $("#textarea" + index).val();
          textareaList.push(textValue);

        }
        let storeTasks = localStorage.setItem("textareaList", JSON.stringify(textareaList));
      })


    }

  }
  getTime(); //calls the function

  $(".clear-data").on("click", function(){
    localStorage.clear("textareaList")
})


})