var cart = JSON.parse(localStorage.getItem('cart')) || null;
        
if (cart) {
    AMP.setState({'cart': cart});
    var cartwrapper = document.querySelector('.shoping-cart-wrapper'),
        csclass = cartwrapper.className,
        counter = document.querySelector('.cart-counter');

    if (csclass.search('show') === -1) cartwrapper.className+= ' show';

    counter.textContent = cart.items.length;
} else {
    AMP.setState({'cart': {
        "items": [],
        "id": 1
    }})
}