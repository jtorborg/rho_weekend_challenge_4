//console.log('inside client.js');



$(function() {
    //console.log('inside client.j doc ready');
    //initial GET request
    getTask();
    //event listeners
    $('#taskForm').on('submit', addTask);
    $('#taskContainer').on('click', '.deleteButton', deleteTask);

    $('#taskContainer').on('click', '.updateButton', updateTask);


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


    //     function addClass(response) {
    //
    //         console.log('inside addClass function');
    //         console.log("response", response);
    //         console.log("response [0]", response[0].complete);
    //         var status = response[0].complete;
    //         console.log("Status", status);
    //         console.log($(this));
    //         if (status == true) {
    // console.log('figure out how to .addClass');
    //
    //         }
    //
    //     } //end addClass

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
        var $div = $('<div></div>');
        var $form = $('<form id = "formContainer"></form>');
        response.forEach(function(task, index) {


            //////////////////
            if (task.complete != true) {
                $form.append('<input type = "text" size = "125" class = "taskInput" name = "task_name" value = "' + task.task_name + '"/>');
                $div.append($form);
                $listOfTasks.append($div);
                var $updateButton = $('<button class = "updateButton btn btn-default">Complete</button>');
                $updateButton.data('id', task.id);
                $form.append($updateButton);
                var $deleteButton = $('<button class = "deleteButton btn btn-default">Delete</button>');
                $deleteButton.data('id', task.id);
                $form.append($deleteButton);
                $div.append($form);
                $listOfTasks.append($div);
            } else if (task.complete === true) {
                $form.append('<input type = "text" size = "125" name = "task_name" class = "completeTask" "btn btn-default" value = "' + task.task_name + '"/>');
                $div.append($form);
                $listOfTasks.append($div);
                $form.append($updateButton);
                var $deleteButton = $('<button class = "deleteButton btn btn-default">Delete</button>');
                $deleteButton.data('id', task.id);
                $form.append($deleteButton);
                $div.append($form);
                $listOfTasks.append($div);
            } ////////////////////////////////////////////////////






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



    function updateTask(event) {
        event.preventDefault();
        //console.log('inside updateTask function');
        //console.log($(this)); !remember to use $!
        //
        var taskId = $(this).data('id');
        var formInputString = $(this).closest('form');
        var formData = $(formInputString).serialize();

        // //
        console.log(taskId);
        //       //
        $.ajax({
            type: 'PUT',
            url: '/route1/' + taskId,
            data: formData,
            success: getTask
        });
    } //end update Task function



    //When a Task is complete, its visual representation should change on the front end.
    //For example, the background of the task container could change from gray to green.
    //The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
    //on click complete, remove class







}); //end of doc ready function
