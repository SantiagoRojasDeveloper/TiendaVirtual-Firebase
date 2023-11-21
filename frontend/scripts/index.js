let frecuencias = [];
let listaSinRepetidos = [];
let totalValue = 0;

const listItems = [
    { id: '1', name: 'Laptop Lenovo Legion', quantity: '8', category: 'Electrónica', price: '$4.780.000', description: 'Laptop con procesador Intel Core i7 Doceava Generación', img: 'https://www.lenovo.com/medias/?context=bWFzdGVyfHJvb3R8MjQ1NzE1fGltYWdlL3BuZ3xoOGMvaDRmLzE2OTM2MTU2MzMyMDYyLnBuZ3w3NGZlYzZhZDgxZTUwNjQ0MGFkYjg3YTIwOTFiOGM3NmY3MGQ1MGI0OTMzYTFlMGUwOGU0OWI2MmRjZDZjYjQ2' },
    { id: '2', name: 'Laptop HP Pavilion', quantity: '15', category: 'Electrónica', price: '$3.780.000', description: 'Laptop con procesador Intel Core i5 Doceava Generación', img: 'https://exitocol.vtexassets.com/arquivos/ids/19596739-800-auto?v=638291288325070000&width=800&height=auto&aspect=true' },
    { id: '3', name: 'Laptop Dell XPS 15', quantity: '23', category: 'Electrónica', price: '$7.780.000', description: 'Laptop con procesador Intel Core i9 Doceava Generación', img: 'https://m.media-amazon.com/images/I/91WgL3IbNIL.jpg' },
    { id: '4', name: 'Laptop Acer Predator Helios 300', quantity: '15', category: 'Electrónica', price: '$6.780.000', description: 'Laptop con procesador Intel Core i7 Doceava Generación', img: 'https://m.media-amazon.com/images/I/71nz3cIcFOL.jpg' },
    { id: '5', name: 'Laptop Asus ROG Zephyrus G14', quantity: '100', category: 'Electrónica', price: '$8.780.000', description: 'Laptop con procesador AMD Ryzen 9 5900HS', img: 'https://dlcdnwebimgs.asus.com/gain/1B866BF7-1A65-464C-AEA7-3AC87CB03AA7' },
    { id: '6', name: 'Laptop Lenovo ThinkPad X1 Carbon Gen 9', quantity: '15', category: 'Electrónica', price: '$9.780.000', description: 'Laptop con procesador Intel Core i7 Doceava Generación', img: 'https://www.lenovo.com/medias/laptop-thinkpad-x1-carbon-gen-9-14-hero.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98MjIxMzU2fGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDczL2g2NC8xNzIyMDM5Nzc5MzMxMC5wbmd8Y2EzYzI1ZGY4Y2ZkMGY2MDcxN2NhYmU0YzY1YjUzZDVkZWI0NGQ1MzRlY2I5NDg4ZDk1ZmMxNzdkOTBiMDhkYw' }
]

let cart = [];
let totalCart = [];

const checkItems = setInterval(_ => {
    const cardsContainer = document.getElementById("cards-container");
    if (cardsContainer) {
        loadItems(cardsContainer);
        clearInterval(checkItems);
    }
}, 0);

function loadItems(cardsContainer) {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
    for (var i = 0; i < listItems.length; i++) {
        var divHijo = document.createElement('div');
        divHijo.className = 'card';

        var divImg = document.createElement('div');
        var img = document.createElement('img');
        img.src = listItems[i].img;
        img.alt = '';
        divImg.appendChild(img);

        var divInterno = document.createElement('div');

        var h4 = document.createElement('h4');
        h4.textContent = listItems[i].name;

        var divCategoriaPrecio = document.createElement('div');

        var h6Categoria = document.createElement('h6');
        h6Categoria.textContent = listItems[i].category;

        var h6Cantidad = document.createElement('h6');
        h6Cantidad.textContent = '';

        divCategoriaPrecio.appendChild(h6Categoria);
        divCategoriaPrecio.appendChild(h6Cantidad);

        var h3Precio = document.createElement('h3');
        h3Precio.textContent = listItems[i].price;

        var pDescripcion = document.createElement('p');
        pDescripcion.textContent = listItems[i].description;

        var buttonCarrito = document.createElement('button');
        buttonCarrito.textContent = 'Agregar al carrito';

        const id = listItems[i].id;
        buttonCarrito.onclick = function () {
            addToCart(id);
        };

        // Agrega los elementos al div interno
        divInterno.appendChild(h4);
        divInterno.appendChild(divCategoriaPrecio);
        divInterno.appendChild(h3Precio);
        divInterno.appendChild(pDescripcion);
        divInterno.appendChild(buttonCarrito);

        // Agrega los elementos al div hijo
        divHijo.appendChild(divImg);
        divHijo.appendChild(divInterno);

        // Agrega el div hijo al div padre
        cardsContainer.appendChild(divHijo);
    }

}

function addToCart(id) {
    cart.push(listItems.find(item => item.id == id));
    calculateItemsCart();
    const cartContainer = document.getElementById("cart-items");

    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }

    for (var i = 0; i < listaSinRepetidos.length; i++) {
        const div = document.createElement('div');
        div.className = 'items-cart';

        const h5 = document.createElement('h5');
        h5.textContent = listaSinRepetidos[i].name;

        const h6 = document.createElement('h6');
        h6.textContent = listaSinRepetidos[i].price + 'x' + frecuencias[i];

        div.appendChild(h5);
        div.appendChild(h6);

        cartContainer.appendChild(div);
    }

    const total = document.getElementById("total");
    total.textContent = 'Total: ' + calculateTotalCart(); 

    const btnPay = document.getElementById("btn-pay");
    btnPay.style.display = 'block';
};

function calculateItemsCart() { 
    frecuencias = [];
    listaSinRepetidos = [];   
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let index = listaSinRepetidos.indexOf(item);
    
        if (index !== -1) {
            frecuencias[index]++;
        } else {
            listaSinRepetidos.push(item);
            frecuencias.push(1);
        }
    }
}

function calculateTotalCart(){
    let toReturnTotal = 0;
    for (let i = 0; i < listaSinRepetidos.length; i++) {
        const value = listaSinRepetidos[i].price.replace(/\D/g, "");;
        const quantity = frecuencias[i];
        toReturnTotal += value * quantity;
    }
    return toReturnTotal.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
}