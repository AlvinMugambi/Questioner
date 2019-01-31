Meetupdetails()

function Meetupdetails() {
  var id = location.search.split('id=')[1];
  console.log(id);

  let url = `http://127.0.0.1:5000/api/v2/meetups/${id}`;
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
      console.log(data)

      var topicNode = document.getElementById('topic')
      topicNode.innerHTML = data.data.topic

      var imgNode = document.createElement('img')
      imgNode.src = '../static/meetup1.jpg'

      var descriptionNode = document.getElementById('description')
      descriptionNode.innerHTML = data.data.description

      var locationNode = document.getElementById('location')
      locationNode.innerHTML = `Location : ${data.data.meetupLocation}`

      var dateNode = document.getElementById('date')
      dateNode.innerHTML = `Date : ${data.data.meetupDate}`

      var attendeesNode = document.getElementById('attendees')
      attendeesNode.innerHTML = `Atttendees : ${data.data.Attendees}`

      var post_question = document.getElementById('post-question-button')
      post_question.href = "../templates/post_question.html?id=" + data.data.meetupId

    }
  })

}


function RsvpYes(){

  var yesbutton = document.getElementById('yes');


  var id = location.search.split('id=')[1];

  let url = `http://127.0.0.1:5000/api/v2/meetups/${id}/rsvps/yes`;

  fetch(url, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })

  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.status === 200){
      yesbutton.style.color = 'green';
      document.getElementById('rsvps').innerHTML = 'Confirmed attendance'
    }
    else if (data.error){
      window.alert(data.error)
    }
  })
}

function RsvpNo(){

  var nobutton = document.getElementById('no');

  var id = location.search.split('id=')[1];

  let url = `http://127.0.0.1:5000/api/v2/meetups/${id}/rsvps/no`;

  fetch(url, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })

  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.status === 200){
      nobutton.style.color = 'blue'
      document.getElementById('rsvps').innerHTML = ''
    }
  })
}
