var loginbutton = document.getElementById('loginbutton').addEventListener('click', login)

function login(event){
  event.preventDefault();
  let url = 'http://127.0.0.1:5000/api/v2/auth/login';

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
      window.location.href = "../templates/user_profile.html";
    } else if (data.data){
      window.alert(data.data)
    }
    else if (data.error){
      window.alert(data.error)
    }
  })

}
