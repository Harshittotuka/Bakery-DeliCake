document.addEventListener("DOMContentLoaded", () => {
  // Get categoryId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = parseInt(urlParams.get("category")) || null;

  if (!categoryId) {
    alert("Category not found!");
    return;
  }

  // Fetch the products JSON file
  fetch("products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load JSON data");
      return response.json();
    })
    .then((data) => {
      const category = data.categories.find(
        (cat) => cat.categoryId === categoryId
      );

      if (!category) {
        alert("Category not found!");
        return;
      }

      // Update the page with category data
      updatePageWithCategory(category);
    })
    .catch((error) =>
      console.error("Error fetching or processing JSON data:", error)
    );
});

// Function to update the page dynamically
function updatePageWithCategory(category) {
  // Update the category header
  const categoryHeaders = document.querySelectorAll(".category-header");

  categoryHeaders.forEach(
    (header) => (header.textContent = category.categoryName)
  );

  // Update the breadcrumb category name
  const breadcrumbCategory = document.getElementById("category-name");
  if (breadcrumbCategory)
    breadcrumbCategory.textContent = category.categoryName;

  // Populate the product container
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing content

  // Update the breadcrumb category name
  const category_description = document.getElementById("category-description");
  if (category_description)
    category_description.textContent = "//" + category.categoryName + " Menu";

  const category_title = document.getElementById("category-title");
  if (category_title)
    category_title.textContent =
      "Explore Our " + category.categoryName + " Categories";

  category.categoryProducts.forEach((product, index) => {
    // Use `index` to create unique IDs
    const productCard = `
    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div class="product-item d-flex flex-column bg-white rounded overflow-hidden h-100" style="height: 450px;"> <!-- Set fixed height -->
        <div class="text-center p-4">
          <div class="d-inline-block border border-primary rounded-pill px-4 py-2 mb-3 text-black bg-primary fw-bold" style="font-size: 1rem;">₹ ${
            product.price
          }</div>
          <h5 class="mb-3">${product.name}</h5>
          <span>${product.description || "Delicious and freshly made!"}</span>
        </div>
        <div class="position-relative mt-auto">
          <!-- Bootstrap Carousel -->
          <div id="carousel-${index}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000"> <!-- Unique ID -->
            <div class="carousel-inner">
              ${product.images
                .map(
                  (image, imageIndex) => `
                <div class="carousel-item ${imageIndex === 0 ? "active" : ""}">
                  <img class="d-block w-100" src="${image}" alt="${
                    product.name
                  } image ${imageIndex + 1}" style="object-fit: cover;">
                </div>`
                )
                .join("")}
            </div>
            <!-- Carousel Controls (only if more than 1 image) -->
            ${
              product.images.length > 1
                ? `
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${index}" data-bs-slide="prev"> <!-- Unique ID -->
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${index}" data-bs-slide="next"> <!-- Unique ID -->
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

    productContainer.innerHTML += productCard;
  });
}
