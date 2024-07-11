const API_URL = 'http://localhost:3000/productos';

export const obtenerProductos = async () => {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();
    return productos;
};

export const agregarProducto = async (producto) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
};

export const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
};
