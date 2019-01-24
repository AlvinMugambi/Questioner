var postquestion = document.getElementById('post-question-button').addEventListener('click', postQuestion)

function postQuestion(event){
  event.preventDefault();
  let url = `https://the-questioner-backend.herokuapp.com/api/v2/meetups/{}`;

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "title": document.getElementById('title').value,
      "body": document.getElementById('body').value,
    }),
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.status === 201){
      console.log(data);
      window.location.href = "../templates/top_questions.html";
    } else if (data.error.toLowerCase().includes('title')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('body')){
      window.alert(data.error)
    }
  })

}
