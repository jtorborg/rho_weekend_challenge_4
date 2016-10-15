Create a front end experience that allows a user to create a Task.
When the Task is created, it should be stored inside of a database (SQL)
Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
Each Task should have an option to 'Complete' or 'Delete'.
When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
Whether or not a Task is complete should also be stored in the database.
Deleting a Task should remove it both from the front end as well as the Database.


CREATE TABLE todo
id SERIAL PRIMARY KEY
task_name varchar(200),
complete BOOLEAN,
remove BOOLEAN


tasks.id
tasks.task_name
task.complete
task.remove
