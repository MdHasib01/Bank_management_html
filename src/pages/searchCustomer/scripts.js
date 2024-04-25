// Function to fetch customer data from API
async function fetchCustomerData() {
  try {
    const response = await fetch("http://localhost/api/getUsers/");
    if (!response.ok) {
      throw new Error("Failed to fetch customer data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer data:", error.message);
    return [];
  }
}

// Function to search customers
async function searchCustomers() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const searchResultsContainer = document.getElementById("searchResults");

  // Fetch customer data from API
  const customers = await fetchCustomerData();
  console.log(customers);
  // Filter customers based on search input
  const filteredCustomers = customers.filter(
    (customer) =>
      (customer?.name?.toLowerCase().includes(searchInput) ||
        customer?.email?.toLowerCase().includes(searchInput)) &&
      customer?.role?.includes("customer")
  );

  // Display search results
  if (filteredCustomers.length > 0) {
    const resultsHTML = filteredCustomers
      .map(
        (customer) => `
            <div class="border border-gray-200 p-2 mb-2 rounded">
  <p class="text-sm font-bold">Name: ${customer.name}</p>
  <p class="text-xs "> <span class="font-bold">Phone: </span>${customer.phone}</p>
  <p class="text-xs "><span class="font-bold">Email: </span> ${customer.email}</p>
  <p class="text-xs "><span class="font-bold">Age: </span>${customer.age} years old</p>
  <p class="text-xs "><span class="font-bold">Gender: </span>${customer.gender}</p>
  <p class="text-xs "><span class="font-bold">Address: </span>${customer.address}</p>
</div>
        `
      )
      .join("");

    searchResultsContainer.innerHTML = resultsHTML;
  } else {
    searchResultsContainer.innerHTML =
      '<p class="text-sm text-gray-500">No results found.</p>';
  }
}
