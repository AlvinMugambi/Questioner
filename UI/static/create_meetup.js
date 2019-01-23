var createmeetup = document.getElementById('post_meetup').addEventListener('click', createMeetup)

function createMeetup(event){
  event.preventDefault();
  let url = 'http://127.0.0.1:5000/api/v2/meetups';

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
      console.log(data);
      window.location.href = "../templates/admin_homepage.html";
    } else if (data.error.toLowerCase().includes('topic')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('allowed')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('location')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('date')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('invalid')){
      window.alert(data.error)
    }
    else if (data.error.toLowerCase().includes('tags')){
      window.alert(data.error)
    }
  })

}
