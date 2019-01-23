var loginbutton = document.getElementById('loginbutton').addEventListener('click', login)

function login(event){
  event.preventDefault();
  let url = 'https://the-questioner-backend.herokuapp.com/api/v2/auth/login';

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value
    }),
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.status === 200){
      localStorage.setItem('token', data.token);
      window.location.href = "../templates/homepage.html";
    } else if (data.error.toLowerCase().includes('or')){
    document.getElementById('wrongcredentials').innerHTML = JSON.stringify(data.error);
    }
    else if (data.error.toLowerCase().includes('username')){
    document.getElementById('usernameerror').innerHTML = data.error;
    }
    else if (data.error.toLowerCase().includes('password')){
    document.getElementById('passworderror').innerHTML = data.error;
    }
  })

}
