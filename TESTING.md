#### Auth testing

* register with new user
* register with existing email
* login with correct credentials
* login with wrong password
* refresh with valid refresh token
* refresh with invalid refresh token
* logout with valid refresh token
* access protected route without token
* access protected route with invalid token

#### Task API testing

* create task with valid data
* create task with empty title
* get all tasks
* get tasks with pagination
* get tasks with status filter
* get tasks with title search
* get task by valid id
* get task by invalid id
* update task
* update another user’s task should fail
* toggle task status
* delete task
* delete another user’s task should fail

#### Frontend testing

* register page validation
* login page validation
* redirect flow works
* dashboard loads tasks properly
* create/edit/delete/toggle works from UI
* search works
* filter works
* pagination works
* logout works
* token refresh works after access token expiry

#### Responsive testing

Check at least:

* desktop view
* tablet view
* mobile view
