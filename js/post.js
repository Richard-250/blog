
// <<<<<<<<<<< managing actions of the posts>>>>>>>>>>>>>

function displayPosts() {

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
  const tablesBody = document.querySelector(".table-post tbody")
      
    tablesBody.innerHTML = "";
  
    
    posts.forEach((post, index) => {
      const rows = document.createElement("tr");
  
      rows.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${post.image}" class="resize"></td>
        <td class="title_edit">${post.title}</td>
        <td>${post.dates}</td>
        <td>${post.topic}</td>
        <td>${post.author}</td>
        <td>
          <button onclick="editPost(${index})">Edit</button>
          <button onclick="deletePost(${index})">Delete</button>
        
        </td>
      `;
      tablesBody.appendChild(rows);
    });
  }

//   <<<<<<<<<<< edit(index)>>>>>>>>>
  
function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];
  
    if (!post) {
      alert("Post not found!");
      return;
    }
  
    document.getElementById("postsContainer").style.display = "none";
    document.getElementById("editContainer").style.display = "block";
  
    // <<<<<<<<<<<populate form with table data>>>>>>>>>>
    document.getElementById("editTitle").value = post.title;
    document.getElementById("editAuthor").value = post.author;
    document.getElementById("editDates").value = post.dates;
    document.getElementById("editTopic").value = post.topic;
  
    

    CKEDITOR.instances.editor.setData(post.body);
    
    document.getElementById("editForm").onsubmit = function (event) {
      event.preventDefault();
  
      // Update the post data
      post.title = document.getElementById("editTitle").value;
      post.author = document.getElementById("editAuthor").value;
      post.dates = document.getElementById("editDates").value;
      post.topic = document.getElementById("editTopic").value;

      post.body = CKEDITOR.instances.editor.getData()
  
      const imageInput = document.getElementById("editImage");
      if (imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
          post.image = event.target.result;
          savePosts(posts);
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        savePosts(posts);
      }
    };
  
    
    function savePosts(posts) {
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("Post updated successfully!");
      cancelEdit();
      displayPosts();
    }
  }
  
  function cancelEdit() {
    
    document.getElementById("postsContainer").style.display = "block";
    document.getElementById("editContainer").style.display = "none";
  }


function deletePost(index) {
  
    const posts = JSON.parse(localStorage.getItem('posts')) || []
  
    posts.splice(index, 1);
    
    localStorage.setItem('posts', JSON.stringify(posts));
    
    displayPosts();
  }
  
    
  window.onload = displayPosts;
// // Function to publish a post
// function publish(index) {
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     // const publishedPosts = JSON.parse(localStorage.getItem('publishedPosts')) || [];
//     console.log(posts)
//     // Get the post to publish
//     const postToPublish = posts[index];
    
//     if (!postToPublish) {
//         alert("Post not found!");
//         return;
//     }
    
//     // Add publish date
//     postToPublish.publishDate = new Date().toISOString();
    
//     // Add to published posts
//     // publishedPosts.push(postToPublish);
    
//     // Save to localStorage
//     localStorage.setItem('publishedPosts', JSON.stringify(publishedPosts));
    
//     // Update UI
//     alert("Post published successfully!");
    
//     // Optionally, remove from draft posts
//     // posts.splice(index, 1);
//     // localStorage.setItem('posts', JSON.stringify(posts));
    
//     displayPosts();
// }










// //Function to display posts (updated)
// function displayPosts() {
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const tablesBody = document.querySelector(".table-post tbody");
    
//     tablesBody.innerHTML = "";
    
//     posts.forEach((post, index) => {
//         const rows = document.createElement("tr");
        
//         rows.innerHTML = `
//             <td>${index + 1}</td>
//             <td><img src="${post.image}" class="resize"></td>
//             <td class="title_edit">${post.title}</td>
//             <td>${post.dates}</td>
//             <td>${post.topic}</td>
//             <td>${post.author}</td>
//             <td>
//                 <button onclick="editPost(${index})">Edit</button>
//                 <button onclick="deletePost(${index})">Delete</button>
//                 <button onclick="publish(${index})">Publish</button>
//             </td>
//         `;
//         tablesBody.appendChild(rows);
//     });
// }