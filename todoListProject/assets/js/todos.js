// Check off todo
// We need this to run when an li within a ul is clicked
// We use the ul because some of the lis (new todos) don't initally exist.
$("ul").on("click", "li", function(){
  // Toggle text decoration for checked/unchecked item
  $(this).toggleClass("completed");
});

// Delete the todo
// Same comment as above applies here
$("ul").on("click", "span", function(event){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  event.stopPropagation();
});

// Add a new todo
$("input[type=text]").keypress(function(event){
  if(event.which === 13){
    console.log("entered");
    todo = $(this).val();
    // Clear the input
    $(this).val("");
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todo + "</li>");
  }
});

$(".fa-plus").click(function(){
  $("input[type=text]").fadeToggle();
});
