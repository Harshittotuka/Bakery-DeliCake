// Function to fetch JSON data and render categories
function renderCategoriesFromFile() {
    const container = document.getElementById("categories-container");
  
    // Fetch the JSON file
    fetch("products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load JSON data");
        }
        return response.json();
      })
      .then((data) => {
        // Loop through categories
        data.categories.forEach((category) => {
          const { categoryId, categoryName, categoryDescription, categoryImage, categoryProducts } = category;
  
          // Calculate price range
          const prices = categoryProducts.map((product) => parseFloat(product.price) || 0);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
  
          // Create a category card
          const categoryCard = `
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="product-item d-flex flex-column bg-white rounded overflow-hidden h-100">
                <div class="text-center p-4">
                  <div class="d-inline-block border border-primary rounded-pill px-3 mb-3">₹${minPrice} - ₹${maxPrice}</div>
                  <h3 class="mb-3">${categoryName}</h3>
                  <span>${categoryDescription}</span>
                </div>
                <div class="position-relative mt-auto">
                  <img class="img-fluid" src="${categoryImage}" alt="${categoryName}">
                  <div class="product-overlay">
                    <a class="btn btn-lg-square btn-outline-light rounded-circle" href="menu.html?category=${categoryId}">
                      <i class="fa fa-eye text-primary"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
  
          // Append the card to the container
          container.innerHTML += categoryCard;
        });
      })
      .catch((error) => {
        console.error("Error fetching or processing JSON data:", error);
      });
  
}
  
  
  // Render categories on page load
  document.addEventListener("DOMContentLoaded", renderCategoriesFromFile);
          // Function to calculate years of experience
          function calculateYearsOfExperience(startDate) {
            const currentDate = new Date();
            const startYear = new Date(startDate).getFullYear();
            return currentDate.getFullYear() - startYear;
        }
    
        // Fetching both data.json and products.json
        Promise.all([
            fetch('data.json').then(response => response.json()),
            fetch('products.json').then(response => response.json())
        ])
        .then(([data, products]) => {
            // Calculate Years of Experience
            const yearsExperience = calculateYearsOfExperience(data.website.start_date);
          document.getElementById('yearsExperience').innerText = yearsExperience;
          

            // Set the contact-section-phone dynamically
          document.getElementById('contact-section-phone').innerText = data.website.contact.phone;
          

            // Set the WhatsApp link dynamically
            const whatsappNumber = data.website.contact.whatsapp;
            const whatsappLink = document.getElementById('whatsapp-link');
            whatsappLink.href = `${whatsappNumber}`;
          
          
            // Calculate Total Products
            let totalProducts = 0;
            products.categories.forEach(category => {
                totalProducts += category.categoryProducts.length;
            });
            document.getElementById('totalProducts').innerText = totalProducts;
    
            // Set Order Everyday
            document.getElementById('orderEveryday').innerText = data.office.order_everyday;
        })
  .catch(error => console.error('Error loading JSON data:', error));
        



    // Fetch the JSON file and populate the team section
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Extract the owner section
            const owner = data.website.Owner;

            // Create the dynamic HTML for the owner
            const teamHTML = `
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item text-center rounded overflow-hidden">
                        <img class="img-fluid" src="${owner['profile-img']}" alt="Owner Image">
                        <div class="team-text">
                            <div class="team-title">
                                <h5>${owner.name}</h5>
                                <span>Owner</span>
                            </div>
                            <div class="team-social">
                                                   

                                <a class="btn btn-square btn-light rounded-circle" href="${owner.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square btn-light rounded-circle" href="${owner.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square btn-light rounded-circle" href="${owner.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Inject the dynamic HTML into the team section
            document.getElementById('team-section').innerHTML = teamHTML;
        })
  .catch(error => console.error('Error fetching data:', error));
        
  