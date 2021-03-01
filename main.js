 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCS9P77Qquqr8bHSiwhJzoa3mFmkJ-lFmU",
    authDomain: "nndevtesting.firebaseapp.com",
    databaseURL: "https://nndevtesting-default-rtdb.firebaseio.com",
    projectId: "nndevtesting",
    storageBucket: "nndevtesting.appspot.com",
    messagingSenderId: "231751595183",
    appId: "1:231751595183:web:13a3ac30ea29344720905a",
    measurementId: "G-1RLXYL6LRK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var d = new Date();
  var t = d.getTime();
  var counter= t;
  const form = document.querySelector("#Crudform"); 


  document.querySelector("#Crudform").addEventListener("submit", (e)=>{
    e.preventDefault(); 
    var task = document.querySelector("#task").value;
    var description = document.querySelector("#description").value;
    createTask(task, description);
    form.reset();
  });

  function createTask(taskName, description){
    counter+=1;
    console.log(counter);
    var task={
      id: counter,
      task: taskName,
      description: description
    }
    let dataBase = firebase.database().ref("tasks/"+counter);
    dataBase.set(task);
    document.querySelector("#cardSection").innerHTML="";
    readTasks();
  }
  
  function readTasks(){
    var task = firebase.database().ref("tasks/");
    task.on("child_added", (data)=>{
      var taskValue = data.val();
      console.log(taskValue);
      document.querySelector("#cardSection").innerHTML +=
      `
      <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">${taskValue.task}</h5>
        <p class="card-text">${taskValue.description} </p>
        <button type="submit" class="editButton btn btn-warning" onclick="updateTask(${taskValue.id}, '${taskValue.task}', '${taskValue.description}')">Edit Task</button>
        <button type="submit" class="btn btn-danger" onclick="deleteTask(${taskValue.id})">Delete Task</button>
      </div>
      </div>
      `;
    });
  }


  function reset(){

  }

  function updateTask(){
    document.querySelector("#firstSection").innerHTML=
    `
    <form class="border p-4 mb-4" id="Crudform">
      <div class="form-group">
        <label for="Task">
          <input type="text" class="form-control" id="task" placeholder="Enter task">
        </label>
      </div>
      <div class="form-group">
        <label for="Description">
          <input type="text" class="form-control" id="description" placeholder="Enter Description">
        </label>
      </div>

      <button type="submit" id="AddTask" class="btn btn-primary">Add task</button>
      <button style="display: none;" id="UpdateTask" class="btn btn-success">Update task</button>
      <button  style="display: none;" id="CancleTask" class="btn btn-danger">Cancle</button>

    </form>
    `;
  }
