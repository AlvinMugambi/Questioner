fetchQuestions()

function fetchQuestions(){
  var id = location.search.split('id=')[1];
  // console.log(id);

  let url = `https://the-questioner-backend.herokuapp.com/api/v2/meetups/${id}/questions`

  fetch(url, {
    method : 'GET',
    headers : {
      'content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    console.log(data);
    if (data.status === 200){

      var questions = document.getElementById('questions')
      var questionNodes = document.createDocumentFragment()

      data.data.forEach(question => {

          var titleNode = document.createElement('p')
          titleNode.id = 'question'
          titleNode.textContent = question.title

          var likeNode = document.createElement('div')
          likeNode.className = 'wrap'

          var liketoolNode = document.createElement('div')
          liketoolNode.className = 'tooltip'

          var thumbNode = document.createElement('i')
          thumbNode.className = 'fa fa-thumbs-up'
          thumbNode.id = question.questionId
          thumbNode.addEventListener('click', upvote)

          var likespanNode = document.createElement('span')
          likespanNode.className = 'tooltiptext'
          likespanNode.textContent = 'I like this question'

          var countNode = document.createElement('p')
          countNode.className = 'count'
          countNode.textContent = ''

          var dislikeNode = document.createElement('div')
          dislikeNode.className = 'wrap'

          var disliketoolNode = document.createElement('div')
          disliketoolNode.className = 'tooltip'

          var thumbdNode = document.createElement('i')
          thumbdNode.className = 'fa fa-thumbs-down'
          thumbdNode.id = question.questionId
          thumbdNode.addEventListener('click', downvote)

          var dislikespanNode = document.createElement('span')
          dislikespanNode.className = 'tooltiptext'
          dislikespanNode.textContent = 'Not a relevant question'

          var countdNode = document.createElement('p')
          countdNode.className = 'count'
          countdNode.textContent = ' '

          var votesdivNode = document.createElement('div')
          votesdivNode.ClassName = 'votes'

          var votespNode = document.createElement('p')
          votespNode.textContent = `Votes: `

          var votesspanNode = document.createElement('span')
          votesspanNode.id = 'votes'
          votesspanNode.textContent = question.votes

          var commentbuttonNode = document.createElement('div')
          commentbuttonNode.className = 'comment-button'

          var commentdivNode = document.createElement('div')
          commentdivNode.id = 'comment'

          var commentformNode = document.createElement('div')
          commentformNode.id = 'popupComment'

          var formNode = document.createElement('form')
          formNode.id = 'comment-form'

          var imgNode = document.createElement('img')
          imgNode.id = 'close'
          imgNode.src = "../static/close.png"

          var boxtitleNode = document.createElement('h2')
          boxtitleNode.textContent = 'Comment'

          var underlineNode = document.createElement('hr')
          underlineNode.className = 'separator'

          var commentspageNode = document.createElement('div')

          var anchorcommentsNode = document.createElement('a')
          anchorcommentsNode.href = "../templates/comments_page.html?id=" + question.questionId

          var commentcountNode = document.createElement('h4')
          commentcountNode.textContent = 'comments : '+ question.comments

          var postcommentNode = document.createElement('button')
          postcommentNode.id = 'popup'
          postcommentNode.type = 'button'
          postcommentNode.innerHTML = question.username
          postcommentNode.href = "../templates/top_questions.html?id=" + question.questionId

          anchorcommentsNode.appendChild(commentcountNode)
          commentspageNode.appendChild(anchorcommentsNode)
          commentspageNode.appendChild(postcommentNode)

          formNode.appendChild(imgNode)
          formNode.appendChild(boxtitleNode)
          commentformNode.appendChild(formNode)
          commentdivNode.appendChild(commentformNode)
          commentbuttonNode.appendChild(commentdivNode)
          commentbuttonNode.appendChild(commentspageNode)



          liketoolNode.appendChild(thumbNode)
          liketoolNode.appendChild(likespanNode)
          liketoolNode.appendChild(countNode)
          likeNode.appendChild(liketoolNode)

          disliketoolNode.appendChild(thumbdNode)
          disliketoolNode.appendChild(dislikespanNode)
          disliketoolNode.appendChild(countdNode)
          dislikeNode.appendChild(disliketoolNode)


          votespNode.appendChild(votesspanNode)
          votesdivNode.appendChild(votespNode)

          questionNodes.appendChild(titleNode)
          questionNodes.appendChild(likeNode)
          questionNodes.appendChild(dislikeNode)
          questionNodes.appendChild(votesdivNode)
          questionNodes.appendChild(commentbuttonNode)
          questionNodes.appendChild(underlineNode)


      })

      questions.appendChild(questionNodes);

    } else if (data.data.toLowerCase().includes('yet')){
      window.alert(data.data)
    } else if (data.error.toLowerCase().includes('found')){
      window.alert(data.error)
    } else if (data.message){
      window.alert(data.message)
    }

  })

}


function upvote(){
  var id = this.getAttribute('id');

  let url = `https://the-questioner-backend.herokuapp.com/api/v2/questions/${id}/upvote`

  fetch(url, {
    method : 'PATCH',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    console.log(data);
    if (data.error){
      window.alert(data.error)
    }
  })
}



function downvote(){
  var id = this.getAttribute('id');

  let url = `https://the-questioner-backend.herokuapp.com/api/v2/questions/${id}/downvote`

  fetch(url, {
    method : 'PATCH',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.error){
      window.alert(data.error)
    }

  })
}
