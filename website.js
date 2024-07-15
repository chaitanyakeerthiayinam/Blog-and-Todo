const App = (() => {
    const apiUrl = {
      blogPosts: 'https://jsonplaceholder.typicode.com/posts',  // Example API endpoint
      todoList: 'https://jsonplaceholder.typicode.com/todos'    // Example API endpoint
    };
  
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
  
    const renderBlogPosts = (posts) => {
      const contentContainer = document.getElementById('content');
      if (!posts) {
        contentContainer.innerHTML = '<p>Failed to load blog posts.</p>';
        return;
      }
  
      contentContainer.innerHTML = posts.map(post => `
        <div class="item">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        </div>
      `).join('');
    };
  
    const renderTodoList = (todos) => {
      const contentContainer = document.getElementById('content');
      if (!todos) {
        contentContainer.innerHTML = '<p>Failed to load todo list.</p>';
        return;
      }
  
      contentContainer.innerHTML = todos.map(todo => `
        <div class="item">
          <p>${todo.title}</p>
          <p>Status: ${todo.completed ? 'Completed' : 'Pending'}</p>
        </div>
      `).join('');
    };
  
    const init = () => {
      document.getElementById('show-blogs').addEventListener('click', async () => {
        const blogPosts = await fetchData(apiUrl.blogPosts);
        renderBlogPosts(blogPosts);
      });
  
      document.getElementById('show-todos').addEventListener('click', async () => {
        const todoList = await fetchData(apiUrl.todoList);
        renderTodoList(todoList);
      });
    };
  
    return { init };
  })();
  
  document.addEventListener('DOMContentLoaded', App.init);
  