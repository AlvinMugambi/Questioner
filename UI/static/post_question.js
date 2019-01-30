var postquestion = document.getElementById('post-question-button').addEventListener('click', postQuestion)

function postQuestion(event){
  event.preventDefault();

  var id = location.search.split('id=')[1];
  console.log(id);
  let url = `http://127.0.0.1:5000/api/v2/meetups/${id}/questions`;

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
    } else if (data.error){
      window.alert(data.error)
    }
  })

}
