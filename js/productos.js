// Archivo: js/productos.js

document.addEventListener('DOMContentLoaded', () => {
    fetchProductos();
    
    const form = document.getElementById('producto-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').files[0].name;

        const nuevoProducto = { nombre, precio, imagen };
        
        await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        form.reset();
        fetchProductos();
    });
});

async function fetchProductos() {
    const response = await fetch('http://localhost:3000/productos');
    const productos = await response.json();
    renderProductos(productos);
}

function renderProductos(productos) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    if (productos.length === 0) {
        container.innerHTML = '<p class="no-productos">No se han agregado productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = `images/${producto.imagen}`;
        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('card-container--info');
        
        const nombre = document.createElement('p');
        nombre.textContent = producto.nombre;
        
        const valueContainer = document.createElement('div');
        valueContainer.classList.add('card-container--value');
        
        const precio = document.createElement('p');
        precio.textContent = `$${producto.precio}`;
        
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/trashIcon.png';
        deleteIcon.style.width = '30px';
        deleteIcon.style.height = 'auto';
        deleteIcon.addEventListener('click', async () => {
            await fetch(`http://localhost:3000/productos/${producto.id}`, {
                method: 'DELETE'
            });
            fetchProductos();
        });

        valueContainer.appendChild(precio);
        valueContainer.appendChild(deleteIcon);
        
        infoContainer.appendChild(nombre);
        infoContainer.appendChild(valueContainer);
        
        card.appendChild(img);
        card.appendChild(infoContainer);
        
        container.appendChild(card);
    });
}
