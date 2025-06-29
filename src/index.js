function bloge(fun){
    displayPosts();
    addNewPostListener();
};

function displayPosts() {
    fetch("http://localhost:3000/blogs").then((content) => content.json()).then((blogs) => {
        blogs.forEach(blog => {
            let list = document.querySelector("div#post-list div");
            let listItem = document.createElement("div")
            listItem.id = `title-${blog.id}`
            listItem.className = "titles";
            listItem.innerText = blog.title;
            list.appendChild(listItem);
            listItem.addEventListener("click", (ev) => handlePostClick());
            function handlePostClick(){
                let existingDetail = listItem.querySelector("#post-detail");
                if (existingDetail) {
                    existingDetail.remove(); 
                    return;
                };
                document.querySelectorAll("#post-detail").forEach(detail => detail.remove());
                fetch(`http://localhost:3000/blogs/${blog.id}`).then((content) => content.json()).then((blog) => {
                    let details = document.createElement("div");
                    details.id = "post-detail"
                    details.innerText = `Category: ${blog.category} \n Author: ${blog.author}`;
                    listItem.appendChild(details);
                    document.querySelector("#post-title").innerText = `${blog.title}`;
                    document.querySelector(".post-images").innerHTML = `<img src=${blog.imageUrl} alt="image">`
                    document.querySelector("#content").innerText = `${blog.content}`;
                });
            };
        });
    });

};

function addNewPostListener(){
    let form = document.querySelector("#new-post-form");
    form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        let newPost = {
            author:ev.target.author.value,
            category:ev.target.category.value,
            title:ev.target.title.value,
            imageUrl:ev.target.url.value,
            content:ev.target.content.value
        };
        fetch("http://localhost:3000/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then((content) => content.json()).then((newPost) => {
                console.log(newPost.author);
        });
    });

};

document.addEventListener("DOMContentLoaded", bloge);