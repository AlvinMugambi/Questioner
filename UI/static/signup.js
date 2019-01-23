let signupbutton = document.getElementById('signupbutton').addEventListener('click', signup)

function signup(event){
  event.preventDefault();
  let url = 'https://the-questioner-backend.herokuapp.com/api/v2/auth/signup';

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
    if (data.status === 201){
      window.location.href = "../templates/login.html";
    } else if(data.error.toLowerCase().includes('firstname')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('lastname')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('username')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('email')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('phone')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('match')){
      window.alert(data.error)
    } else if(data.error.toLowerCase().includes('password')){
      window.alert(data.error)
    }

  })

}
