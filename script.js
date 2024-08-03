let components = {};
let totalProfit = 0; // Variabel untuk menyimpan total profit dari semua komponen
let previousComponents = {}; // Global variable to store previous component state

function updateInventory() {
    const componentQuantity = parseFloat(document.getElementById('componentQuantity').value);

    if (!isNaN(componentQuantity)) {
        components['componentQuantity'] = { quantity: componentQuantity };

        // Update inventory display
        displayInventory();
    }
}

function displayInventory() {
    const inventoryDiv = document.getElementById('inventory');
    let totalInventory = 0; // Variabel untuk menyimpan total jumlah komponen di inventory

    // Clear all existing content in the inventory display
    inventoryDiv.innerHTML = '<h3>Calculation Status</h3>';

    // Display updated quantities only
    Object.values(components).forEach((component) => {
        totalInventory += component.quantity;
        inventoryDiv.innerHTML += `<p>Sisa Component: ${component.quantity}</p>`;
    });

    // Display total profit
    inventoryDiv.innerHTML += `<p>Total Keuntungan: $${totalProfit.toFixed(2)}</p>`;
}

function calculateTotal() {
    // Get input values
    const componentPrice = parseFloat(document.getElementById('componentPrice').value);
    const totalComponentsInput = document.getElementById('totalComponents').value;
    const profit = parseFloat(document.getElementById('profit').value);

    // Validate inputs
    if (isNaN(componentPrice) || isNaN(profit)) {
        document.getElementById('result').innerText = 'Please enter valid numbers for Component Price and Profit';
        return;
    }

    // Save current state to previousComponents
    previousComponents = { ...components };

    // Calculate total components using eval (caution: eval can be dangerous if used with untrusted input)
    let totalComponents;
    try {
        totalComponents = eval(totalComponentsInput);
    } catch (e) {
        document.getElementById('result').innerText = 'Invalid arithmetic expression in Total Components';
        return;
    }

    if (isNaN(totalComponents)) {
        document.getElementById('result').innerText = 'Invalid arithmetic expression in Total Components';
        return;
    }

    // Find the component in the inventory
    const component = components['componentQuantity'];
    if (!component) {
        document.getElementById('result').innerText = 'Component not found in the inventory';
        return;
    }

    // Check if enough components are available
    if (totalComponents > component.quantity) {
        document.getElementById('result').innerText = `Not enough components. Only ${component.quantity} available.`;
        return;
    }

    // Calculate total cost
    const totalCost = (componentPrice * totalComponents) + profit;

    // Update total profit
    totalProfit += profit;

    // Update component quantity
    component.quantity -= totalComponents;

    // Display result
    document.getElementById('result').innerText = 'Total Harga: $' + totalCost.toFixed(2);

    // Update inventory display
    displayInventory();
}

function handleInputChange(input) {
    // Mengganti spasi dengan simbol +
    input.value = input.value.replace(/\s+/g, '+');
}
// Initialize inventory display on page load
displayInventory();
