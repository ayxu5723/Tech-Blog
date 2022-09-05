const createComment = async () => {
  const commentbox = document.querySelector('#newComment')

  commentbox.style.display = 'contents';
}

const showSuccess = () => {
  const successAlert = document.getElementById('commentSuccess');
  successAlert.style.display = 'block';
}


const addComment = async (event) => {
  event.preventDefault();
  if(event.target.hasAttribute('data-id')){
    const content = document.querySelector('#contentEntry').value.trim();
    const blogID = event.target.getAttribute('data-id');

      if (content) {
        const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
        content,
        blogID
      }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          showSuccess();
          content = '';
        } else {
          alert(response.statusText)};
    }
  }
};


document.querySelector('#createCommentBtn').addEventListener('click', createComment);
document.querySelector('#addCommentBtn').addEventListener('submit', addComment);
