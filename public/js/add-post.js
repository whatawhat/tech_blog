const newBlog = async (e) => {
    e.preventDefault();
  
    const newBlogTitle = document.querySelector("#blogTitle").value;
    const newBlogText = document.querySelector("#blogText").value;
  
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          content
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newBlog);