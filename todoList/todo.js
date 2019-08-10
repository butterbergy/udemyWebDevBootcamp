var todos = ["Buy New Turtle"];
var input = prompt("What you wanna do");

while(input !== "quit"){
  if(input === "list"){
    listTodos();
  }
  else if(input === "new"){
    newTodo();
  }
  else if (input === "delete"){
    deleteTodo();
  }
  input = prompt("What you wanna do");
}
console.log("OK YOU QUIT");

// Todo list command functions
function listTodos(){
  console.log("*******************");
  todos.forEach(function(todo, index){
    console.log(index +": " + todo)
  });
  console.log("*******************");
}

function newTodo(){
  var newTodo = prompt("Enter a new todo");
  todos.push(newTodo);
}

function deleteTodo(){
  deleteIndex = prompt("Enter index to delete");
  // Delete the number of items at index
  todos.splice(deleteIndex, 1);
}
