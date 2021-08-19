const newBlog = async (e) => {
    e.preventDefault();
  
    const name = document.querySelector("#title-input").value;
    const content = document.querySelector("#content-input").value;
  
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
          name,
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
  
  document.querySelector('#new-post-form').addEventListener('submit', newBlog);