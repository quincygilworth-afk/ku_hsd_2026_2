localStorage.removeItem("gunterOrders"); //resets list 
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

            // orders.length is this new order's position in the queue
            alert(purchaseButtons[buttonId] + " added to your orders! You are #" + orders.length + " in line.");

            // refresh the queue display so the new order shows up
            displayQueue("queue-list");
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

// Order Queue: show every order and its position in line
// (the orders array in localStorage IS the queue: first order = #1 in line)
function displayQueue(listId) {
    const list = document.getElementById(listId);

    if (!list) return;

    function render() {
        const orders = getOrders();
        list.innerHTML = "";

        if (orders.length === 0) {
            const li = document.createElement("li");
            li.textContent = "The queue is empty! Order something to be first in line.";
            list.appendChild(li);
            return;
        }

        orders.forEach(function (order, index) {
            const li = document.createElement("li");
            const position = index + 1; // arrays start at 0, but lines start at 1

            li.textContent = "#" + position + " in line: " + order.item;

            list.appendChild(li);
        });
    }

    render();
}

// Main page: show the queue
displayQueue("queue-list");