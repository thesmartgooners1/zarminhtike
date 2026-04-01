const owner = "thesmartgooners1"; // Replace with your GitHub username
const repo = "my-blog";
const postsPath = "posts";

async function fetchPosts() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}`
    );
    const files = await res.json();

    const postsContainer = document.getElementById("blog-posts");
    postsContainer.innerHTML = "";

    for (const file of files) {
      if (file.name.endsWith(".json")) {
        const fileRes = await fetch(file.download_url);
        const post = await fileRes.json();

        const postEl = document.createElement("div");
        postEl.className = "post";
        postEl.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <small>${new Date(post.date).toLocaleString()}</small>
        `;
        postsContainer.appendChild(postEl);
      }
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}

fetchPosts();
