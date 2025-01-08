let param = new URLSearchParams(window.location.search);
let id = param.get("id");
let singlePage = document.getElementById("singlePage");
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUserId"));

console.log("Current User:", currentUser);

function getSinglePost() {
  const singlePost = posts.find((post) => post.id == id);

  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  singlePage.innerHTML = `
    <img src="${singlePost.image}" class="image">
    <div class="postpreview">
      <h2>${singlePost.title}</h2>
      <i class="far fa-user"> ${singlePost.author}</i>
      &nbsp;
      <i class="far fa-calendar"> ${singlePost.dates}</i>
      <p class="preview-text">${singlePost.body}</p>
      <p>Published: ${singlePost.publishDate}</p>
      <p>Topic: ${singlePost.topic}</p>
      <div class="user-icons">
        <div class="likes">
          <button id="like-button-${id}" onclick="toggleLike(${id})" class="like-button">
            <i class="bx bx-heart"></i>
          </button>
          <span id="like-count-${id}">${getLikeCount(id)}</span>
        </div>
        <div>
        <button onclick="sendComment(${id})" class="comment-button">
        <i class="bx bx-message-dots"></i>
        </button>
        </div>

        <i class="bx bx-share" onclick="share()"></i>

        <div class="socials icon-space">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://my-awesome-project-ten-self.vercel.app" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/sharer/sharer.php?u=https://my-awesome-project-ten-self.vercel.app" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.twitter.com/sharer/sharer.php?u=https://my-awesome-project-ten-self.vercel.app" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.youtube.com/sharer/sharer.php?u=https://my-awesome-project-ten-self.vercel.app" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                </div>
      </div>

      <div class="comments" hidden>
       <div id="upLoadedComments"></div>
 
                     <div class="input-container">
                  <textarea class="comment-body" id="editor" placeholder="Write a comment..."></textarea>
                    <button id="emoji-button" class="emoji-button">😊</button>
                  <button class="submit" onclick="sendMessage()"><i class='bx bx-send'></i></button>
                  </div>
     </div>           

    </div>
  `;

  updateLikeButtonColor(id);
}

function share() {
  const shareIcons = document.querySelector('.icon-space');
  shareIcons.classList.toggle('visible');
}

function toggleLike(postId) {
  if (!currentUser) {
    alert("No user logged in!");
    return;
  }

  const singlePost = posts.find((post) => post.id == postId);

  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  // Initialize likes array if it doesn't exist
  singlePost.likes = singlePost.likes || [];

  // Check if the user has already liked the post
  const likeIndex = singlePost.likes.findIndex((like) => like.userId === currentUser.id);

  if (likeIndex !== -1) {
    // Remove like if already liked
    singlePost.likes.splice(likeIndex, 1);
  } else {
    // Add like
    singlePost.likes.push({ userId: currentUser.id });
  }

  // Save updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Update like count and button color
  updateLikeCount(postId);
  updateLikeButtonColor(postId);
}

// Function to get like count for a specific post
function getLikeCount(postId) {
  const singlePost = posts.find((post) => post.id == postId);
  return singlePost?.likes?.length || 0;
}

// Function to update like count in the DOM
function updateLikeCount(postId) {
  const likeCountElement = document.getElementById(`like-count-${postId}`);
  if (likeCountElement) {
    likeCountElement.textContent = getLikeCount(postId);
  }
}

// Function to update the color of the like button
function updateLikeButtonColor(postId) {
  const singlePost = posts.find((post) => post.id == postId);
  const likeButton = document.getElementById(`like-button-${postId}`);

  if (!likeButton) return;

  // Check if the user has liked the post
  const isLiked = singlePost?.likes?.some((like) => like.userId === currentUser.id);

  // Toggle the button color
  if (isLiked) {
    likeButton.style.color = "red";
  } else {
    likeButton.style.color = "inherit"; // Default color
  }
}

// Initialize the single post view
getSinglePost();



function leaveMessage(event) {
  event.preventDefault(); // Prevent form submission and page reload

  const form = event.target; // Get the form element
  const emailInput = form.querySelector('input[name="email"]');
  const messageTextarea = form.querySelector('textarea[name="message"]');
  const email = emailInput.value.trim();
  const message = messageTextarea.value.trim();

  const emailError = form.querySelector(".email-error");
  const messageError = form.querySelector(".message-error");

  // Clear previous error messages
  emailError.textContent = "";
  messageError.textContent = "";

  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  }

  // Message validation: Ensure it's not empty and has at least 10 characters
  if (message.length < 5) {
    messageError.textContent = "Message must be at least 5 characters long.";
    return;
  }

  // Retrieve existing messages or initialize an empty array
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Create the new message object
  const newMessage = {
    email,
    message,
    timestamp: new Date().toISOString(),
    id: Date.now(), // Unique ID for the message
  };

  // Add the new message to the array
  messages.push(newMessage);

  // Save updated messages array to localStorage
  localStorage.setItem("messages", JSON.stringify(messages));

  // Clear the form inputs
  emailInput.value = "";
  messageTextarea.value = "";

  // Display the success message
  const messageStatus = document.createElement("div");
  messageStatus.innerHTML = `
    <p class="message-disp">
      Message is sent <i class="fas fa-check-circle"></i>
    </p>
  `;
  form.appendChild(messageStatus);

  // Remove the success message after 3 seconds
  setTimeout(() => {
    messageStatus.remove();
  }, 3000);
}




