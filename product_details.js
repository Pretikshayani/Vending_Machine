document.addEventListener('DOMContentLoaded', function() {
  // Fetch product data from the server
  fetch('http://localhost/Vending_Machine/get_products.php')

    .then(response => response.json())
    .then(products => {
      const productTableBody = document.getElementById('productTableBody');

      // Clear the table before populating
      productTableBody.innerHTML = '';

      // Populate the table with product data
      products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${product.pd_id}</td>
          <td>${product.pd_name}</td>
          <td>${parseFloat(product.pd_price).toLocaleString()}</td>
          <td><input type="number" class="quantityInput" data-id="${product.pd_id}" value="${product.pd_quantity}" min="0"></td>
          <td><button class="updateButton" data-id="${product.pd_id}">Update</button></td>
        `;

        productTableBody.appendChild(row);
      });

      // Add event listeners for update buttons
      document.querySelectorAll('.updateButton').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          const quantityInput = document.querySelector(`.quantityInput[data-id="${productId}"]`);
          const newQuantity = quantityInput.value;

          // Send updated quantity to the server
          fetch('update_product_quantity.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              id: productId,
              quantity: newQuantity
            })
          })
          .then(response => response.json())
          .then(result => {
            if (result.success) {
              alert('Product quantity updated successfully!');
              // Optionally, refresh the product data
              fetch('get_products.php')
                .then(response => response.json())
                .then(updatedProducts => {
                  productTableBody.innerHTML = ''; // Clear table
                  updatedProducts.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td>${product.pd_id}</td>
                      <td>${product.pd_name}</td>
                      <td>${parseFloat(product.pd_price).toLocaleString()}</td>
                      <td><input type="number" class="quantityInput" data-id="${product.pd_id}" value="${product.pd_quantity}" min="0"></td>
                      <td><button class="updateButton" data-id="${product.pd_id}">Update</button></td>
                    `;
                    productTableBody.appendChild(row);
                  });
                });
            } else {
              alert('Failed to update product quantity. Please try again.');
            }
          })
          .catch(error => {
            console.error('Error updating product:', error);
            alert('Failed to update product quantity. Please try again.');
          });
        });
      });

      // Back button functionality
     
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      alert('Failed to load product data. Please try again later.');
    });
    document.getElementById('backButton').addEventListener('click', function() {
      window.location.href = "admin.html"; // Adjust the link to your admin dashboard
    });
});
