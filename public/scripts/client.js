//console.log('inside client.js');



$(function() {
    //console.log('inside client.j doc ready');
    //initial GET request
    getTask();
    //event listeners
    $('#taskForm').on('submit', addTask);
    $('#taskContainer').on('click', '.deleteButton', deleteTask);



    //Create a front end experience that allows a user to create a Task.
    function addTask(event) {
        event.preventDefault();
        //ajax POST
        console.log('inside addTask function');
        console.log("this", this);
        var taskData = $(this).serialize();
        console.log("task Data", taskData);
        $.ajax({
            type: 'POST',
            url: "/route1",
            data: taskData,
            success: getTask
        }); //end of ajax post
        $(this).find('input').val('');


    }


    function getTask() {

        //console.log('get task function goes here');
        $.ajax({
            type: 'GET',
            url: '/route1',
            success: displayInfo
        }); //end ajax
    } //end getTask




    function displayInfo(response) {
        console.log("Response:", response);
        var $listOfTasks = $('#taskContainer');
        $listOfTasks.empty();
        var $li = $('<li></li>');
        var $form = $('<form></form>');
        response.forEach(function(task) {
            $form.append('<input type = "text" name = "task_name" value = "' + task.task_name + '"/>');
            $li.append($form);

            $listOfTasks.append($li);
            var $updateButton = $('<button class = "updateButton">Update</button>');
            //console.log(task.id);
            $updateButton.data('id', task.id);

            //append to actual list itself
            $form.append($updateButton);

            var $deleteButton = $('<button class = "deleteButton">Delete</button>');
            $deleteButton.data('id', task.id);
            $form.append($deleteButton);

            $li.append($form);
            $listOfTasks.append($li);


        }); //end of forEach


    } //end of displayInfo function



    function deleteTask(event) {
      event.preventDefault();
//console.log('inside deleteTask function');
//console.log($(this)); !remember to use $!
//
var taskId = $(this).data('id');
//
//console.log(taskId);
      //
      $.ajax({
         type: 'DELETE',
         url: '/route1/' + taskId,
         success: getTask
       });
    }



    //When the Task is created, it should be stored inside of a database (SQL)
    //on server side, add created task to database

    //Whenever a Task is created the front end should refresh to show all tasks that need to be completed.


    //Each Task should have an option to 'Complete' or 'Delete'.
    //append complete or delete buttons to created task

    //When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
    //on click complete, remove class
    //Whether or not a Task is complete should also be stored in the database.

    //database should include column for status of complete or incomplete

    //Deleting a Task should remove it both from the front end as well as the Database.

    //delete should have query that removes from database





}); //end of doc ready function
