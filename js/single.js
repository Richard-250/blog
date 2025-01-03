let param = new URLSearchParams(window.location.search)
let id = param.get("id")
let singlePage = document.getElementById("singlePage")
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let users = JSON.parse(localStorage.getItem('currentUserId'))




console.log('userId', users)

function getSinglePost() {

const singlePost = posts.find((post) => post.id == id)
// console.log("single post", singlePost)
singlePage.innerHTML = `<img src="${singlePost.image}" class="image">
 <div class="postpreview">
 
 <h2><a href="./pages/single.html"> ${singlePost.title}</a></h2>
        <i class="far fa-user">${singlePost.author}</i>
         &nbsp;
           <i class="far fa-calendar">${singlePost.dates}</i>
            <p class="preview-text">${singlePost.body}</p>
            <p>Published: ${singlePost.publishDate}</p>
            <p>Topic: ${singlePost.topic}</p>
            <div class="user-icons">
            <div class="likes">

            <button id="like-button-${id}" onclick="toggleLike(${id}, ${users})" class="like-button">
            <i class="bx bx-heart"></i>
             
             </div>
            <span id="like-count-${id}">${getLikeCount(id)}</span>

            <i class='bx bx-message-dots'></i>
            <i class='bx bx-share' ></i>
            </div>

 </div>
 
 `
 updateLikeButtonColor(id, users);
}

function toggleLike(postId, userId) {

  const singlePost = posts.find((post) => post.id == postId);

  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  if (!userId) {
    alert("No user logged in!");
    return;
  }


  // Initialize likes array if it doesn't exist
  if (!singlePost.likes) {
    singlePost.likes = [];
   
  }
  

  // Check if the user has already liked the post
  const likeIndex = singlePost.likes.findIndex((like) => like.userId === userId);
  
console.log('likes', likeIndex)
  if (likeIndex !== -1) {
    // Remove like if already liked
    singlePost.likes.splice(likeIndex, 1);
  } else {
    // Add like
    singlePost.likes.push({ userId } );
  }

  // Save updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Update like count on the page
  updateLikeCount(postId);
  updateLikeButtonColor(postId, userId);
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
function updateLikeButtonColor(postId, userId) {
  const singlePost = posts.find((post) => post.id == postId);
  const likeButton = document.getElementById(`like-button-${postId}`);

  if (!likeButton) return;

  // Check if the user has liked the post
  const isLiked = singlePost?.likes?.some((like) => like.userId == userId);

  // Toggle the button color
  if (isLiked) {
    likeButton.style.color = "red";
  } else {
    likeButton.style.color = "inherit"; // Default color
  }
}
// Initialize the single post view
getSinglePost();




