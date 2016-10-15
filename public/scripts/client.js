console.log('inside client.js');



$(function() {
            console.log('inside client.j doc ready');
            //initial GET request
            getTask();
            //event listeners
            $('#taskForm').on('submit', createTask);



            //Create a front end experience that allows a user to create a Task.
            function createTask() {

                //ajax POST
                console.log('inside createTask function');
            }


            function getTask() {

                console.log('get task function goes here');
                $.ajax({
                    type: 'GET',
                    url: '/route1',
                    success: displayInfo
                }); //end ajax
            } //end getTask




        function displayInfo(response) {
           console.log("Response:", response);
          //  var $list = $('.dropdownList');
          //  $list.empty();
          //  response.forEach(function(task) {
          //    $list.append('<option>' + task.+ '</option>');
          //  });


     } //end of displayInfo function

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
