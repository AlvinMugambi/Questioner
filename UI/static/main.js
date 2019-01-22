let signupbutton = document.getElementById('signupbutton').addEventListener('click', signup)

function signup(event){
  event.preventDefault();
  let url = 'http://127.0.0.1:5000/api/v2/auth/signup';

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "firstname": document.getElementById('firstname').value,
      "lastname": document.getElementById('lastname').value,
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "phoneNumber": document.getElementById('phoneNumber').value,
      "password": document.getElementById('password').value,
      "confirmpassword": document.getElementById('confrimpassword').value
    }),
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    document.getElementById('error').innerHTML = data.error;
    })

  .catch(error => {
    console.error('Error:', error);
  })
}
