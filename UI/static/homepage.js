fetchMeetups()

function Meetupdetails(e) {
  e.preventDefault()
  var id = this.getAttribute('id');

  let url = `https://the-questioner-backend.herokuapp.com/api/v2/meetups/${id}`;
  fetch(url, {
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if(data.status == 200){
      window.location.href = "../templates/meetup.html";
    }
  })

}

function fetchMeetups(){
  let url = 'https://the-questioner-backend.herokuapp.com/api/v2/meetups/upcoming';

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
          meetupNode.className = 'meetup-box'

          var anchorNode = document.createElement('a')
          anchorNode.href = ""
          anchorNode.id = meetup.meetupId.toString()
          console.log(anchorNode.id)
          anchorNode.addEventListener('click', Meetupdetails)

          var imgNode = document.createElement('img')
          imgNode.src = '../static/meetup1.jpg'

          var dateNode = document.createElement('p')
          dateNode.id = 'date'
          dateNode.textContent = meetup.meetupDate

          var topicNode = document.createElement('p')
          topicNode.id = 'topic'
          topicNode.textContent = meetup.topic


          anchorNode.appendChild(imgNode)
          anchorNode.appendChild(dateNode)
          anchorNode.appendChild(topicNode)

          meetupNode.appendChild(anchorNode)

          meetupNodes.appendChild(meetupNode)

      })

      meetups.appendChild(meetupNodes);

    } else if (data.data.toLowerCase().includes('scheduled')){
      window.alert(data.data)
    }
  })

}
