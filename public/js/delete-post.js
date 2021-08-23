async function deleteBlog (post_id) {
  const postData = await fetch('/api/posts/delete/${post_id', {
    method: 'DELETE',
  })
  if (postData.ok){
    document.location.reload();
  } else {
    alert("Post was not deleted.")
  }
}

// const deleteBlogHandler = async (e) => {
//   e.preventDefault();

//   const id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

//   const response = await fetch(`/api/posts/${id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else {
//     alert(response.statusText);
//   }
// };

// document
//   .querySelector(".delete-post-btn")
//   .addEventListener("click", deleteBlogHandler);
