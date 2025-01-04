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
        <i class="bx bx-share"></i>
      </div>

      <div class="comments" hidden>
       <div id="upLoadedComments"></div>
 
                     <div class="input-container">
                  <textarea class="comment-body" id="editor" placeholder="Write a comment..."></textarea>
                  <button class="submit" onclick="sendMessage()"><i class='bx bx-send'></i></button>
                  </div>
     </div>           

    </div>
  `;

  updateLikeButtonColor(id);
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
