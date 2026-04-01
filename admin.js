// --- CONFIGURATION ---
const token = "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"; // Replace with your private token
const owner = "thesmartgooners1";           // Replace with your GitHub username
const repo = "zarminhtike";                         // Your repository name
const pathPrefix = "posts/";                    // Folder in repo where posts will be stored

// --- FORM HANDLER ---
const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const date = new Date().toISOString();
  const filename = `${pathPrefix}${title.replace(/\s+/g, "_")}.json`;

  const postData = { title, content, date };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `token ${token}`,
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          message: `Add post: ${title}`,
          content: btoa(JSON.stringify(postData)) // Encode as Base64
        })
      }
    );

    if (response.ok) {
      alert("Post successfully added to GitHub!");
      postForm.reset();
    } else {
      const err = await response.json();
      console.error(err);
      alert("Error adding post. Check console.");
    }
  } catch (err) {
    console.error(err);
  }
});
