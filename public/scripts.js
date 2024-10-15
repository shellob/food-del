function loadOrders() {
    fetch('http://localhost:3000/orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке заказов');
            }
            return response.json();
        })
        .then(orders => {
            const ordersList = document.getElementById('orders');
            ordersList.innerHTML = '';

            if (Object.keys(orders).length === 0) {
                ordersList.innerHTML = '<li>Заказы не найдены</li>';
                return;
            }

            Object.keys(orders).forEach(orderId => {
                const order = orders[orderId];

                const listItem = document.createElement('li');
                listItem.classList.add('order-item');

                const orderInfo = document.createElement('div');
                orderInfo.innerHTML = `
                    <p><strong>ID заказа:</strong> ${orderId}</p>
                    <p><strong>Товары:</strong> ${order.items.join(', ')}</p>
                    <p><strong>Статус:</strong> ${order.status}</p>
                `;

                // Кнопка удаления заказа
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить заказ';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => deleteOrder(orderId));

                listItem.appendChild(orderInfo);
                listItem.appendChild(deleteButton);
                ordersList.appendChild(listItem);
            });
        })
        .catch(error => {
            const ordersList = document.getElementById('orders');
            ordersList.innerHTML = `<li>Ошибка загрузки заказов: ${error.message}</li>`;
        });
}


function deleteOrder(orderId) {
    if (confirm(`Вы уверены, что хотите удалить заказ ${orderId}?`)) {
        fetch(`http://localhost:3000/order/${orderId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                alert(`Заказ ${orderId} удален.`);
                loadOrders();
            })
            .catch(error => {
                alert(`Ошибка удаления заказа: ${error.message}`);
            });
    }
}


document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderId = document.getElementById('orderId').value;
    const items = document.getElementById('items').value.split(',').map(item => item.trim());

    fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, items })
        })
        .then(response => response.json())
        .then(data => {
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = `Ответ сервера: ${JSON.stringify(data)}`;

            loadOrders();
        })
        .catch(error => {
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.textContent = `Ошибка: ${error.message}`;
        });
});


window.addEventListener('DOMContentLoaded', function() {
    loadOrders();
});

function writeReview() {
    let reviewPlace = document.getElementById("")
}