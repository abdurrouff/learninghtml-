// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Get HTML elements
  const cardsContainer = document.getElementById('cardsContainer');
  const loadingElement = document.getElementById('loading');
  const errorElement = document.getElementById('error');

  // API URL
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  // Function to fetch data from API
  async function fetchTodos() {
      try {
          console.log("[Starting fetch from API...");
          
          // Fetch data from the API
          const response = await fetch(API_URL);
          
          console.log(" Response received:", response.status);
          
          // Check if response is successful
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Convert response to JSON
          const todos = await response.json();
          
          console.log(" Total todos fetched:", todos.length);
          
          // Get only the first 20 items

        for (let i = 0; i < todos.length; i++) {

        }
          const firstTwenty = todos.slice(0, 20);
          
          console.log(" Displaying first 20 todos");
          
          // Display the cards
          displayCards(firstTwenty);
          
          // Hide loading message
          loadingElement.style.display = 'none';
          
      } catch (error) {
          console.error("[v0] Error fetching data:", error);
          
          // Hide loading message
          loadingElement.style.display = 'none';
          
          // Show error message
          errorElement.style.display = 'block';
          errorElement.textContent = `Error fetching data: ${error.message}`;
      }
  }

  // Function to display cards
  function displayCards(todos) {
      console.log("[v0] Creating cards for", todos.length, "todos");
      
      // Clear the container
      cardsContainer.innerHTML = '';
      
      // Loop through each todo and create a card
      todos.forEach(todo => {
          // Create card element
          const card = document.createElement('div');
          card.className = 'card';
          
          // Determine if task is completed
          const statusClass = todo.completed ? 'completed' : 'pending';
          const statusText = todo.completed ? 'Completed' : 'Pending';
          
          // Add HTML content to the card
          card.innerHTML = `
              <div class="card-header">
                  <span class="card-id">ID: ${todo.id}</span>
                  <span class="card-status ${statusClass}">${statusText}</span>
              </div>
              <h3 class="card-title">${todo.title}</h3>
              <div class="card-footer">
                  <span class="user-id">User #${todo.userId}</span>
              </div>
          `;
          
          // Add card to container
          cardsContainer.appendChild(card);
      });
      
      console.log("[v0] Finished creating cards");
  }

  // Call the function when DOM is ready
  fetchTodos();
});
