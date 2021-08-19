async function commentForm(e) {
    e.preventDefault();
  
    const commentText = document.getElementById("commentAdd").value.trim();
    const post_id = document.getElementById('post-header').dataset.index;
    
    const commentInput = await fetch(`/api/myDashboard/comment`, {
      method: 'POST',
      body: JSON.stringify({
        text: commentText,
        post_id
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (commentInput.ok){
      document.location.reload();
    } else {
      allert(commentInput.statusText);
    }
    }

    document.getElementById('add-comment-btn').addEventListener('click', commentForm);
    