async function commentForm(e) {
    e.preventDefault();
  
    const newComment = document.getElementById('comment-text').value;
    const post_id = document.getElementById('post-header').dataset.index;
    
    const commentInput = await fetch(`/api/posts/comment`, {
      method: 'POST',
      body: JSON.stringify({
        text: newComment,
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
    