var btn = document.querySelector('a');
var removeBtn = document.querySelector('.remove-btn');

if (btn) {
    btn.addEventListener('click', function () {
        var state = AMP.getState('cart');
        btn.classList.add('disabled')
        state.then(function (res) {
            localStorage.setItem('cart', res);
            setTimeout(function() {
                btn.classList.remove('disabled')
            }, 2000)
        })
    })
}

if (removeBtn) {
    removeBtn.addEventListener('click', function () {
        var state = AMP.getState('cart');
        state.then(function(res) {
            localStorage.setItem('cart', res)
        })
    })
}
