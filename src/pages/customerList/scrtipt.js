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
  const customerList = document.getElementById("customer-list");

  // Fetch customer data from API
  const customers = await fetchCustomerData();
  console.log(customers);
  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer?.role?.includes("customer")
  );

  // Display search results
  if (filteredCustomers.length > 0) {
    const resultsHTML = filteredCustomers
      .map(
        (customer) => `
            <tr>
              <td class="border-t px-3 py-2">${customer.name}</td>
              <td class="border-t px-3 py-2">${customer.age}</td>
              <td class="border-t px-3 py-2">${customer.phone}</td>
              <td class="border-t px-3 py-2">${customer.email}</td>
              <td class="border-t px-3 py-2">${customer.gender}</td>
              <td class="border-t px-3 py-2">${customer.address}</td>
            </tr> `
      )
      .join("");

    customerList.innerHTML = resultsHTML;
  } else {
    customerList.innerHTML =
      '<p class="text-sm text-gray-500">No results found.</p>';
  }
}
searchCustomers();
