 function dashboard() {
  window.location.href = "./admin/posts/index.html"
 }
 
 
 $(document).ready(function() {
    $('.menu-toggle').on('click', function() {
        $('.nav').toggleClass('showing')
        $('.nav ul').toggleClass('showing')
    })

    $('.post-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          
          ]
      });

 }) 


 
 

// <<<<<<<<< manage and displayUsers on the table>>>>>>>>>

// <<<<<<<<register>>>>>>
function regist(event) {
  event.preventDefault();

  const form = document.querySelector('form');
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  const passwordConf = form.passwordConf.value;

  if (password !== passwordConf) {
      alert("Passwords do not match!");
      return;
  }

  // Fetch existing users or initialize an empty array
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userId = Date.now();
  // Add new user
  users.push(
    { 
      id: userId,
      username,
     email,
      password,
     });

     
  // Save updated array to local storage
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('currentUserId', JSON.stringify({ id: userId, username }));

  alert("Registration and login have been successful!");
  form.reset();
  displayUsers();
}

function displayUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const tableBody = document.getElementById("userTable");

  if (!tableBody) {
      console.error("Table body not found!");
      return;
  }

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate table with users
  users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
         <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>
              <button onclick="editUser(${index})">Edit</button>
              <button onclick="deleteUser(${index})">Delete</button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

  if (users[index] && currentUserId && users[index].id === currentUserId.id) {
    // Remove current user ID from local storage
    localStorage.removeItem('currentUserId');
  }

  // Remove user at the specified index
  users.splice(index, 1);
 
  // Save updated array to local storage
  localStorage.setItem('users', JSON.stringify(users));
 
  // Update the table
  displayUsers();
}

function editUser(index) {

  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const user = users[index];

  const newUsername = prompt("Enter new username:", user.username);
  const newEmail = prompt("Enter new email:", user.email);

  if (newUsername && newEmail) {
      users[index] = { username: newUsername, email: newEmail };

      // Save updated array to local storage
      localStorage.setItem('users', JSON.stringify(users));

      alert("User updated successfully!");
      displayUsers();
  } else {
      alert("Invalid input! No changes made.");
  }
}

// Display users on page load
window.onload = displayUsers;


// <<<<<<<<<<<<<<<<<< submiting and managing posts>>>>>>>>>>

document.getElementById('postForm').addEventListener('submit', function(event) {

  event.preventDefault(); 

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const dates = document.getElementById('dates').value;
  const image = document.getElementById('image').files[0]; // File object
  const body = CKEDITOR.instances.editor.getData();
  const topic = document.getElementById('topic').value;

  // Create post data object
  const postData = {
    id: Date.now(),
    title,
    author,
    publishDate: new Date().toLocaleDateString(),
    dates,
    body,
    topic,
  };

  // Function to save data to localStorage
  const savePost = (post) => {
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || []; 
    existingPosts.push(post); 
    localStorage.setItem('posts', JSON.stringify(existingPosts)); 
    alert('Post saved!');
  };

  if (image) {
    const reader = new FileReader();
    reader.onload = function(event) {
      postData.image = event.target.result; 
      savePost(postData);
    };
    reader.readAsDataURL(image);
  } else {
    savePost(postData);
  }
  document.getElementById('postForm').reset();
  CKEDITOR.instances.editor.setData('type here!');
  

});




