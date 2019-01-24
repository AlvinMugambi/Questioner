var createmeetup = document.getElementById('post_meetup').addEventListener('click', createMeetup)

function createMeetup(event){
  event.preventDefault();
  let url = 'https://the-questioner-backend.herokuapp.com/api/v2/meetups';

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "topic": document.getElementById('meetup_topic').value,
      "location": document.getElementById('location').value,
      "meetup_date": document.getElementById('meetup_date').value,
      "images": "pass for now",
      "tags": document.getElementById('tags').value,
    }),
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token' : `${localStorage.getItem('token')}`
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.status === 201){
      window.location.href = "../templates/admin_homepage.html";
    } else if (data.error){
      window.alert(data.error)
    }
    else if (data.message.toLowerCase().includes('token')){
      window.alert(data.message)
    }

  })

}
