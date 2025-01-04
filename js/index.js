
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
  
  const commentsDiv = document.querySelector(".comments");
  if (commentsDiv) {
    commentsDiv.hidden = false;
  }
}

function sendMessage() {
  const textarea = document.querySelector(".comment-body");
  const commentText = textarea?.value.trim();

  if (!commentText) {
    alert("Please write a comment before sending!");
    return;
  }

  
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
    body: commentText,
    timestamp: new Date().toISOString(),
  });

  // Save updated posts to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Clear the textarea
  textarea.value = "";

  // Refresh the comments section
  displayComments(singlePost.comments);
}

function displayComments(comments) {
  const commentsContainer = document.getElementById("upLoadedComments");
  if (!commentsContainer) return;

  // Clear existing comments
  commentsContainer.innerHTML = "";

  // Add each comment
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <p><strong>User ${comment.userId}:</strong> ${comment.body}</p>
      <small>${new Date(comment.timestamp).toLocaleString()}</small>
    `;
    commentsContainer.appendChild(commentElement);
  });
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
  displayComments(singlePost.comments);
}






