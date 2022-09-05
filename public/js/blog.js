// Post new journal entries
const createblog = async () => {
  const title = $('#titleEntry').value;
  const content = $('#contentEntry').value;

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

const showSuccess = () => {
  const successAlert = $('blogSuccess');
  successAlert.style.display = 'block';
}