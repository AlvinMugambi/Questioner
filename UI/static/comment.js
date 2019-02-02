fetchComments()


// Validating Empty Field
function check_empty() {
  if (document.getElementById('msg').value == "") {
    alert("You haven't commented.");
  } else {
  postComment();
  }
}
//Function To Display Popup
function div_show() {
  document.getElementById('comment').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
  document.getElementById('comment').style.display = "none";
}


function postComment(){

  var id = location.search.split('id=')[1];

  let url = `http://127.0.0.1:5000/api/v2/questions/${id}/comment`

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "comment" : document.getElementById('commenthere').value
    }),
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    window.location.href = "../templates/comments_page.html?id=" + id


  })
}

function fetchComments(){

  var id = location.search.split('id=')[1]

  let url = `http://127.0.0.1:5000/api/v2/questions/${id}/comments`

  fetch(url, {
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    console.log(data);

    var meetup_title = document.getElementById('meetup-title')
    meetup_title.innerHTML = "MY MEETUPS"

    var question_title = document.getElementById('question')
    question_title.innerHTML = data.data[0].title

    if(data.status === 200){

      var comments = document.getElementById('cont')
      var commentsNodes = document.createDocumentFragment()

      data.data.forEach(comment => {

        let majordivNode = document.createElement('div')
        majordivNode.id = 'comment-section'

        let commentNode = document.createElement('p')
        commentNode.id = 'comments'
        commentNode.innerHTML = comment.comment

        let separatordivNode = document.createElement('hr')
        separatordivNode.className = 'separator'


        majordivNode.appendChild(commentNode)
        commentsNodes.appendChild(majordivNode)
        commentsNodes.appendChild(separatordivNode)


      })
      comments.appendChild(commentsNodes);
    }
  })
}
