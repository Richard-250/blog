
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
 

// const publishedPosts = JSON.parse(localStorage.getItem('Posts')) || [];
// console.log(publishedPosts)
// const container = document.getElementById('publishedPostsContainer');

// container.innerHTML = '';

// publishedPosts.forEach(post => {
//     const postElement = document.createElement('div');
//     postElement.className = 'post clearfix';
    
//     const publishDate = new Date(post.publishDate).toLocaleDateString();
    
//     postElement.innerHTML = `
//         <img src="${post.image}" alt="${post.title}" class="post-image">
//         <div class="post-preview">
//         <h2><a href="./pages/single.html"> ${post.title}</a></h2>
//         <i class="far fa-user">${post.author}</i>
//          &nbsp;
//            <i class="far fa-calendar">${post.dates}</i>
//             <p class="preview-text">${post.body}</p>
//             <p>Published: ${publishDate}</p>
//             <p>Topic: ${post.topic}</p>
//         <a href="./pages/single.html" class="btn read-more">Read More</a>
//         </div>
//     `;
    
//     container.appendChild(postElement);
// });




// Load posts when page loads
// window.onload = displayPublishedPosts;


// function publish(index) {
   
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     console.log(posts)
//     const post = posts[index];

//     if (!post) {
//         alert("Post not found!");
//         return;
//     }

//  // Retrieve existing published posts or initialize an empty array
//  const publishedPosts = JSON.parse(localStorage.getItem('publishedPosts')) || [];
//  publishedPosts.push(post);

//  // Save published posts to localStorage
//  localStorage.setItem('publishedPosts', JSON.stringify(publishedPosts));

//  console.log(publishedPosts)
//  alert("Post published successfully!");
   
// }

// window.onload = displayPosts;





 // const postsDisplay = document.getElementById("postsDisplay").style.display = "none";
    
    // postsDisplay.innerHTML = ""; // Clear the display section

    // const postHTML = `
    //     <div class="post clearfix">
    //         <img src="${post.image || './image/default.jpg'}" alt="" class="post-image">
    //         <div class="post-preview">
    //             <h2><a href="./pages/single.html"> ${post.title}</a></h2>
    //             <i class="far fa-user">${post.author}</i>
    //             &nbsp;
    //             <i class="far fa-calendar">${post.dates}</i>
    //             <p class="preview-text">
    //                 ${post.topic || "No topic available"}
    //             </p>
    //             <a href="./pages/single.html" class="btn read-more">Read More</a>
    //         </div>
    //     </div>
    // `;

    // postsDisplay.innerHTML = postHTML; // Add the post to the display container