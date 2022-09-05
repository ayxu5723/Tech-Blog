const addComment = async (event) => {
  event.preventDefault();
    const comment = document.querySelector('#newComment').value.trim();
    const blogID = event.target.getAttribute('data-blog');
    
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
      comment_content: comment,
      blog_id: blogID
    }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      showSuccess();
      content = '';
    } else {
    alert('Failed to post comment')};
};


const showSuccess = async () => {
  const successAlert = document.getElementById('commentSuccess');
  successAlert.style.display = 'block';
}

document.querySelector('.comment-form').addEventListener('submit', addComment);
