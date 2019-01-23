getMeetups()

function deleteMeetup(e) {
  e.preventDefault()
  var id = this.getAttribute('id');

  // DELETE
  let url = `http://127.0.0.1:5000/api/v2/meetups/${id}`;
  fetch(url, {
    method : 'DELETE',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if(data.status == 200){
      window.location.href = "../templates/admin_homepage.html";
    }
  })

}

function getMeetups(){
  let url = 'http://127.0.0.1:5000/api/v2/meetups/upcoming';

  fetch(url, {
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.status === 200){

      var meetups = document.getElementById('meetups')
      var meetupNodes = document.createDocumentFragment()

      data.data.forEach(meetup => {

          var meetupNode = document.createElement('div')
          meetupNode.className = 'meetup-box admin'

          var anchorNode = document.createElement('a')
          anchorNode.href = ""

          var imgNode = document.createElement('img')
          imgNode.src = '../static/meetup1.jpg'

          var dateNode = document.createElement('p')
          dateNode.id = 'date'
          dateNode.textContent = meetup.meetupDate

          var topicNode = document.createElement('p')
          topicNode.id = 'topic'
          topicNode.textContent = meetup.topic

          var inputNode = document.createElement('input');
          inputNode.type = 'button'
          inputNode.className = 'login-button delete-meetup'
          inputNode.value = 'Delete this meetup'
          inputNode.id = meetup.meetupId.toString()
          inputNode.addEventListener('click', deleteMeetup)

          anchorNode.appendChild(imgNode)
          anchorNode.appendChild(dateNode)
          anchorNode.appendChild(topicNode)
          anchorNode.appendChild(inputNode)

          meetupNode.appendChild(anchorNode)

          meetupNodes.appendChild(meetupNode)

      })

      meetups.appendChild(meetupNodes);

    } else if (data.data.toLowerCase().includes('scheduled')){
      window.alert(data.data)
    }
  })

}
