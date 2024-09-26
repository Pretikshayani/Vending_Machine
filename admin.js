document.addEventListener('DOMContentLoaded', function() {
  // Fetch product data and populate the dropdown
  fetch('get_products.php')
      .then(response => response.json())
      .then(products => {
          const itemSelect = document.getElementById('itemSelect');
          
          // Populate dropdown
          products.forEach(product => {
              const option = document.createElement('option');
              option.value = product.pd_id;
              option.textContent = `${product.pd_name} (Current Quantity: ${product.pd_quantity})`;
              itemSelect.appendChild(option);
          });

          // Display initial chart
          displayChart(products);

          // Update quantity button functionality
          document.getElementById('updateQuantityButton').addEventListener('click', function() {
              const selectedId = itemSelect.value;
              const newQuantity = document.getElementById('quantityInput').value;

              // Send updated quantity to the server
              fetch('update_product_quantity.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: new URLSearchParams({
                      id: selectedId,
                      quantity: newQuantity
                  })
              })
              .then(response => response.json())
              .then(result => {
                  if (result.success) {
                      alert('Quantity updated successfully!');
                      // Refresh product data and update the chart
                      return fetch('get_products.php');
                  } else {
                      alert('Failed to update quantity. Please try again.');
                  }
              })
              .then(response => response.json())
              .then(updatedProducts => {
                  displayChart(updatedProducts);
                  // Update dropdown with new quantities
                  itemSelect.innerHTML = '';
                  updatedProducts.forEach(product => {
                      const option = document.createElement('option');
                      option.value = product.pd_id;
                      option.textContent = `${product.pd_name} (Current Quantity: ${product.pd_quantity})`;
                      itemSelect.appendChild(option);
                  });
              })
              .catch(error => console.error('Error updating quantity:', error));
          });
      })
      .catch(error => console.error('Error fetching products:', error));

  function displayChart(products) {
      const ctx = document.getElementById('cartChart').getContext('2d');
      const labels = products.map(product => product.pd_name);
      const quantities = products.map(product => product.pd_quantity);

      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Quantity in Cart',
                  data: quantities,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              responsive: true,
              plugins: {
                  legend: {
                      position: 'top'
                  },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              return context.label + ': ' + context.raw;
                          }
                      }
                  }
              }
          }
      });
  }

  // Logout button functionality
  document.getElementById('logoutButton').addEventListener('click', function() {
      // Perform logout action (e.g., redirect to login page)
      window.location.href = 'userlogin.html';
  });
});
