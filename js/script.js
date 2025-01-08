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
  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const passwordConf = form.passwordConf.value;

  // Validate fields and show real-time feedback
  let isValid = true;

  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const passwordConfError = document.getElementById('passwordConfError');

  const resetErrorState = () => {
    document.querySelectorAll('.error').forEach(span => (span.textContent = ''));
    document.querySelectorAll('.text-input').forEach(input => input.classList.remove('error'));
  };

  resetErrorState();

  // Username validation
  if (!username) {
    isValid = false;
    usernameError.textContent = 'Username is required.';
    form.username.classList.add('error');
  } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
    isValid = false;
    usernameError.textContent = 'Username must be 3-15 characters and contain only letters, numbers, or underscores.';
    form.username.classList.add('error');
  }

  // Email validation
  if (!email) {
    isValid = false;
    emailError.textContent = 'Email is required.';
    form.email.classList.add('error');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    isValid = false;
    emailError.textContent = 'Invalid email format.';
    form.email.classList.add('error');
  }

  // Password validation
  if (!password) {
    isValid = false;
    passwordError.textContent = 'Password is required.';
    form.password.classList.add('error');
  } else if (password.length < 8) {
    isValid = false;
    passwordError.textContent = 'Password must be at least 8 characters long.';
    form.password.classList.add('error');
  }

  // Password confirmation validation
  if (!passwordConf) {
    isValid = false;
    passwordConfError.textContent = 'Password confirmation is required.';
    form.passwordConf.classList.add('error');
  } else if (password !== passwordConf) {
    isValid = false;
    passwordConfError.textContent = 'Passwords do not match.';
    form.passwordConf.classList.add('error');
  }

  if (!isValid) return;

  // Check for existing users
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.username === username || user.email === email)) {
    alert('Username or email already exists!');
    return;
  }

  // Add new user
  const userId = Date.now();
  users.push({ id: userId, username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUserId', JSON.stringify({ id: userId, username }));

  alert('Registration and login have been successful!');
  form.reset();
  resetErrorState();
  displayUsers(); // Optional: Implement to show registered users
}

// Real-Time Validation Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  form.username.addEventListener('input', () => document.getElementById('usernameError').textContent = '');
  form.email.addEventListener('input', () => document.getElementById('emailError').textContent = '');
  form.password.addEventListener('input', () => document.getElementById('passwordError').textContent = '');
  form.passwordConf.addEventListener('input', () => document.getElementById('passwordConfError').textContent = '');
});

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




