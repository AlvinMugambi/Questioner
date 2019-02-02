userProfile()


function userProfile(){

  let url = `http://127.0.0.1:5000/api/v2/profile`

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
    var postedQuestions = document.getElementById('posted_qs')
    postedQuestions.innerHTML = data.data.questionsAsked

    var commentedQuestions = document.getElementById('commented_qs')
    commentedQuestions.innerHTML = data.data.commentedQuestions

    var meetups = document.getElementById('meetups')
    var meetupNodes = document.createDocumentFragment()

    data.data.meetups.forEach(meetup => {
      var meetupNode = document.createElement('div')
      meetupNode.className = 'meetup-box'

      var anchorNode = document.createElement('a')
      anchorNode.id = meetup.meetupId.toString()
      anchorNode.href = "../templates/meetup.html?id=" + meetup.meetupId

      var imgNode = document.createElement('img')
      imgNode.src = '../static/meetup1.jpg'

      var dateNode = document.createElement('p')
      dateNode.id = 'date'
      dateNode.textContent = meetup.meetupDate

      var topicNode = document.createElement('p')
      topicNode.id = 'topic'
      topicNode.textContent = meetup.meetupTopic


      anchorNode.appendChild(imgNode)
      anchorNode.appendChild(dateNode)
      anchorNode.appendChild(topicNode)

      meetupNode.appendChild(anchorNode)

      meetupNodes.appendChild(meetupNode)

    })

    meetups.appendChild(meetupNodes);

    if(data.message){
      window.alert(data.message)
    }

  })
}
