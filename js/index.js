
 // Function to render posts from localStorage


 const renderPosts = () => {
   const postsContainer = document.getElementById('postsContainer');
   postsContainer.innerHTML = ''; 
   
   

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
     

    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts available.</p>';
      return;
    }
 
    posts.forEach(post => {
       const postDiv = document.createElement('div');
 
       postDiv.className = 'post clearfix';
 
       
 
   postDiv.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-preview">
        <h2><a href="./pages/single.html?id=${post.id}"> ${post.title}</a></h2>
        <i class="far fa-user">${post.author}</i>
         &nbsp;
           <i class="far fa-calendar">${post.dates}</i>
            <p class="preview-text">${post.body}</p>
            <p>Published: ${post.publishDate}</p>
            <p>Topic: ${post.topic}</p>
        <a href="./pages/single.html?id=${post.id}" class="btn read-more">Read More</a>
        </div>
    `;
       postsContainer.appendChild(postDiv);
    });
 
 }
 renderPosts()

// <<<<<<<<<<<<<<<Search>>>>>>>>>>>>>>></search>

document.getElementById('searchForm').addEventListener('submit', function (event) {
   event.preventDefault(); // Prevent form submission
 
   const query = document.getElementById('searchInput').value.trim().toLowerCase();
   const resultsDiv = document.getElementById('postsContainer');
 
   if (!query) {
       resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
       return;
   }
 
   // Fetch data from localStorage
   const posts = JSON.parse(localStorage.getItem('posts')) || [];
 
   console.log('posts', posts)
   // Filter books based on the query
   const filteredPosts = posts.filter(post => 
       post.title.toLowerCase().includes(query) || 
       post.author.toLowerCase().includes(query)
   );
 
   // Display the results
   if (filteredPosts.length > 0) {

      resultsDiv.className = 'post clearfix';
       resultsDiv.innerHTML = filteredPosts.map(post => `
          
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-preview">
        <h2><a href="./pages/single.html?id=${post.id}"> ${post.title}</a></h2>
        <i class="far fa-user">${post.author}</i>
         &nbsp;
           <i class="far fa-calendar">${post.dates}</i>
            <p class="preview-text">${post.body}</p>
            <p>Published: ${post.publishDate}</p>
            <p>Topic: ${post.topic}</p>
        <a href="./pages/single.html?id=${post.id}" class="btn read-more">Read More</a>
        </div>
    `)

      .join('');
   } else {
       resultsDiv.innerHTML = '<p>No results found.</p>';
   }
 });
 
 function sendComment(postId) {
  // Get the comments div and unhide it
  const commentsDiv = document.querySelector(".comments");
  if (commentsDiv) {
    commentsDiv.hidden = false;
  }

  // Find the specific post
  const singlePost = posts.find((post) => post.id == postId);
  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  // Display existing comments
  if (singlePost.comments) {
    displayComments(singlePost.comments, postId);
  }
}

function getUsernameInitial() {
  // Retrieve the current user's data
  const currentUser = JSON.parse(localStorage.getItem("currentUserId"));
  if (currentUser && currentUser.username) {
    // Get the first letter of the username and return it
    return currentUser.username.charAt(0).toUpperCase();
  }
  return null; // Return null if no username is found
}

function sendMessage() {
  const textarea = document.querySelector(".comment-body");
  const commentText = textarea?.value.trim();

  if (!commentText) {
    alert("Please write a comment before sending!");
    return;
  }

 // Retrieve the current user's data
 const currentUser = JSON.parse(localStorage.getItem("currentUserId"));
 if (!currentUser || !currentUser.username) {
   alert("User is not logged in!");
   return;
 }

  // Find the specific post
  const singlePost = posts.find((post) => post.id == id);
  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  // Initialize comments array if it doesn't exist
  singlePost.comments = singlePost.comments || [];

  // Add the comment
  singlePost.comments.push({
    userId: currentUser.id,
    username: currentUser.username,
    body: commentText,
    timestamp: new Date().toISOString(),
    id: Date.now(), // Unique ID for the comment
  });

  // Save updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Clear the textarea
  textarea.value = "";

  // Refresh the comments section
  displayComments(singlePost.comments, id);
}

function displayComments(comments, postId) {
  const commentsContainer = document.getElementById("upLoadedComments");
  if (!commentsContainer) return;

  // Clear existing comments
  commentsContainer.innerHTML = "";

  // Add each comment
  comments.forEach((comment) => {
    const firstLetter = comment.username.charAt(0).toUpperCase();

    const commentElement = document.createElement("div");

    commentElement.classList.add("comment");

    commentElement.innerHTML = `
    <div class="comment-user-info">
 <div class="comment-header">
    <span class="user-initial">${firstLetter}</span>
      
      </div>

      <div class="dates-time">
      <p><strong> ${comment.body}</p>
      <small>${new Date(comment.timestamp).toLocaleString()}</small>
      <button class="delete-comment" onclick="deleteComment(${postId}, ${comment.id})">
        <i class="bx bx-trash"></i>
      </button>
      </div>
      </div>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

function deleteComment(postId, commentId) {
  // Find the specific post
  const singlePost = posts.find((post) => post.id == postId);
  if (!singlePost) {
    console.error("Post not found!");
    return;
  }

  // Filter out the comment to delete
  singlePost.comments = singlePost.comments.filter((comment) => comment.id !== commentId);

  // Save updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Refresh the comments section
  displayComments(singlePost.comments, postId);
}

// Attach an event listener to the textarea to enable/disable the send button
document.querySelector(".comment-body")?.addEventListener("input", function () {
  const sendButton = document.querySelector(".submit");
  if (this.value.trim()) {
    sendButton.disabled = false;
  } else {
    sendButton.disabled = true;
  }
});

// Initialize comments if any
const singlePost = posts.find((post) => post.id == id);
if (singlePost?.comments) {
  displayComments(singlePost.comments, id);
}




// // Initialize the emoji picker
// const emojiPicker = new EmojiButton();

// // Get references to the textarea and emoji button
// const textarea = document.getElementById('editor');
// const emojiButton = document.getElementById('emoji-button');

// // Attach the emoji picker to the button
// emojiButton.addEventListener('click', () => {
//   emojiPicker.togglePicker(emojiButton); // Show/hide emoji picker
// });

// // Insert the selected emoji into the textarea
// emojiPicker.on('emoji', (emoji) => {
//   textarea.value += emoji; // Append emoji to the existing text
//   textarea.dispatchEvent(new Event('input')); // Trigger 'input' event to enable/disable send button
// });

// // Enable or disable the send button based on textarea content
// textarea.addEventListener('input', () => {
//   const sendButton = document.querySelector('.submit');
//   sendButton.disabled = textarea.value.trim() === ''; // Disable if empty
// });


