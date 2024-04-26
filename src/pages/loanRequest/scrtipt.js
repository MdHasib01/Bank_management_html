// Function to fetch customer data from API
async function deleteLoanRequestById(loan_id) {
  const url = "http://localhost/api/deleteLoan/";
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loan_id: loan_id }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    alert("Deleted Successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error); // Handle error
    // Display error message or perform error handling
  }
}

async function fetchCustomerData() {
  try {
    const response = await fetch("http://localhost/api/getLoan/");
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
// Function to update user's name via API

// Async function to update user's name via API
async function updateUser(userId, newName) {
  const apiUrl = "http://localhost/api/updateBalance";

  const requestData = {
    id: userId,
    name: newName,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data); // Output the response data (e.g., success message or error)
    alert(data.message || data.error); // Show response message to the user
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while updating the name");
  }
}

// Function to search customers
async function searchCustomers() {
  const customerList = document.getElementById("customer-list");

  // Fetch customer data from API
  const customers = await fetchCustomerData();
  console.log(customers);

  // Display search results
  if (customers.length > 0) {
    const resultsHTML = customers
      .map(
        (customer) => `
            <tr>
              <td class="border-t px-3 py-2">${customer.name}</td>
              <td class="border-t px-3 py-2">${customer.phone}</td>
              <td class="border-t px-3 py-2">${customer.email}</td>
              <td class="border-t px-3 py-2 text-red-600 font-bold">${
                customer.loanAmount
              }</td>
              <td class="border-t px-3 py-2">${customer.message}</td>
            <td class="border-t px-3 py-2" > <button onclick="updateUser(${
              (customer.id, customer.loanAmount)
            })"class="p-2 bg-green-300 rounded">Approve</button></td>
              <td class="border-t px-3 py-2" ><button onclick="deleteLoanRequestById(${
                customer.loan_id
              })"class="p-2 bg-red-300 rounded">delete</button></td>
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
