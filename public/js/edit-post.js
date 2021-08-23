// const editBlogHandler = async (e) => {
//   e.preventDefault();

//   const id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

//   const title = document.querySelector('input[name="blog-title"]').value;
//   const blogText = document.querySelector('textarea[name="blog-text"]').value;

//   if (!title || !blogText) return alert("Title and Text is needed to update");

//   const response = await fetch(`/api/posts/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       title,
//       content,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else {
//     alert(response.statusText);
//   }
// };

// document
//   .querySelector(".edit-post-form")
//   .addEventListener("submit", editBlogHandler);
