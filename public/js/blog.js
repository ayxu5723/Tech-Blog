// Post new journal entries
const createBlog = async () => {
  const title = document.querySelector('#titleEntry').value.trim();
  const content = document.querySelector('#contentEntry').value.trim();

  if (title && content) {
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          showSuccess();
          title = '';
          content = '';
        } else {
          alert(response.statusText)};
  }
};

document.querySelector('#create_blog_btn').addEventListener('click', createBlog);

const showSuccess = () => {
  const successAlert = $('blogSuccess');
  successAlert.style.display = 'block';
}