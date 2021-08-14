async function commentForm(e) {
    e.preventDefault();
  
    const commentText = document.getElementById("commentAdd").value.trim();

    const commentInput = await fetch(`/api/myDashboard/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment: commentText,
        blog_id: document.getElementById('commentAdd').dataset.blog_id
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (commentInput.ok){
      document.location.reload();
    } else {
      allert(commentInput.statusText);
    }
    }

    document.getElementById('addNewComment').addEventListener('submit', commentForm);
    