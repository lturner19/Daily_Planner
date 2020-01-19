$(document).ready(function () {



    const currentDate = moment().format('MMMM Do YYYY');
    let currentHour = moment().hour();
    let plannerTasks = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  
    // let storeTasks = localStorage.setItem("plannerTasks", JSON.stringify(plannerTasks));
    //let getTasks = localStorage.getItem("plannerTasks", JSON.parse('plannerTasks') || []);
  
    // <div class="row">
    //           <div class="col my-auto" id="hour">
    //           </div>
    //           <div class="col-6">
    //              <textarea rows="3" cols="74"></textarea>
    //           </div>
    //           <div class="col" id="saveBtn">
    //               <i class="fas fa-save"></i>
    //           </div>
    //         </div>
  
  
    $("#currentDay").text(currentDate);
    $("#hour").text(currentHour)
  
    function getTime() {
      for (let index = 0; index < plannerTasks.length; index++) {
        var row = $("<div class='row'>");
        var columnOne = $("<div class='col-sm-2 text-right'>");
  
        if (plannerTasks[index] >= 12) {
          var hour = plannerTasks[index] - 12;
          if (plannerTasks[index] === 12) {
            hour = 12;
          }
          columnOne.html(hour + ":00 pm")
        } else {
          columnOne.html(plannerTasks[index] + ":00 am")
        }
  
  
        var columnTwo = $("<div class='col-sm-8 bg-success'>");
  
        if (currentHour === plannerTasks[index]) {
          columnTwo = $("<div class='col-sm-8 bg-danger'>");
        }
  
        if (currentHour > plannerTasks[index]) {
          columnTwo = $("<div class='col-sm-8 bg-secondary'>");
        }
        var textarea = $("<textarea>");
        textarea.attr("id", "textarea" + index)
        var textareaList = [];
        textareaList = JSON.parse(localStorage.getItem("textareaList"))
  
        if (textareaList.length > 0) {
          textarea.html(textareaList[index])
        }
  
        columnTwo.append(textarea);
        var columnThree = $("<div class='col-sm-2'>");
        var button = $("<button class='save  btn-primary'>");
        var i = $("<i class='fas fa-save'>");
        button.append(i);
        button.append("save")
        columnThree.append(button);
        row.append(columnOne, columnTwo, columnThree);
        $(".planner").append(row);
  
        $(".save").on("click", function () {
          var textareaList = [];
          for (let index = 0; index < plannerTasks.length; index++) {
            var textValue = $("#textarea" + index).val();
            textareaList.push(textValue);
  
          }
          let storeTasks = localStorage.setItem("textareaList", JSON.stringify(textareaList));
        })
  
  
      }
  
    }
    getTime();
  
  
  
  
  })