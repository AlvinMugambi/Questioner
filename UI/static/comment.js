// Validating Empty Field
function check_empty() {
  if (document.getElementById('msg').value == "") {
    alert("You haven't commented.");
} else {
  document.getElementById('comment-form').submit();
  alert("Form Submitted Successfully...");
}
}
//Function To Display Popup
function div_show() {
  document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
  document.getElementById('abc').style.display = "none";
}
