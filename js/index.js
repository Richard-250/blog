


function publish(index) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    console.log(posts)
    const post = posts[index];

    if (!post) {
        alert("Post not found!");
        return;
    }

    const postsDisplay = document.getElementById("postsDisplay");
    postsDisplay.innerHTML = ""; // Clear the display section

    const postHTML = `
        <div class="post clearfix">
            <img src="${post.image || './image/default.jpg'}" alt="" class="post-image">
            <div class="post-preview">
                <h2><a href="./pages/single.html"> ${post.title}</a></h2>
                <i class="far fa-user">${post.author}</i>
                &nbsp;
                <i class="far fa-calendar">${post.dates}</i>
                <p class="preview-text">
                    ${post.topic || "No topic available"}
                </p>
                <a href="./pages/single.html" class="btn read-more">Read More</a>
            </div>
        </div>
    `;

    postsDisplay.innerHTML = postHTML; // Add the post to the display container
}


window.onload = displayPosts;