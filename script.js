// Items available for purchase
const purchaseButtons = {
    "Sword_Purchase": "Sword",
    "PlateArmor_Purchase": "Plate Armor",
    "ChainMail_Purchase": "Chain Mail",
    "CookingPot_Purchase": "Cooking Pot"
};

// Get saved orders
function getOrders() {
    return JSON.parse(localStorage.getItem("gunterOrders")) || [];
}

// Save orders
function saveOrders(orders) {
    localStorage.setItem("gunterOrders", JSON.stringify(orders));
}

// Purchase buttons on the main page
for (const buttonId in purchaseButtons) {
    const button = document.getElementById(buttonId);

    if (button) {
        button.addEventListener("click", function () {
            const orders = getOrders();

            orders.push({
                id: Date.now() + Math.random(),
                item: purchaseButtons[buttonId]
            });

            saveOrders(orders);

            alert(purchaseButtons[buttonId] + " added to your orders!");
        });
    }
}

// Display orders on either the To-Do page or Gunter's page
function displayOrders(listId, deleteEnabled) {
    const list = document.getElementById(listId);

    if (!list) return;

    function render() {
        const orders = getOrders();
        list.innerHTML = "";

        orders.forEach(function (order) {
            const li = document.createElement("li");
            li.textContent = order.item + " ";

            if (deleteEnabled) {
                const button = document.createElement("button");
                button.textContent = "Delete";

                button.addEventListener("click", function () {
                    const updated = getOrders().filter(
                        savedOrder => savedOrder.id !== order.id
                    );

                    saveOrders(updated);
                    render();
                });

                li.appendChild(button);
            }

            list.appendChild(li);
        });
    }

    render();
}

// To-Do page: show orders with delete buttons
displayOrders("todo-list", true);

// Gunter's page: show orders with delete buttons
displayOrders("gunter-orders", true);