AMP.getState('shopItemInfo').then(function(res) {
    var options = document.querySelectorAll('select'),
        shopitem = JSON.parse(res);

    var option1 = document.getElementById('option1');
    var option2 = document.getElementById('option2');
    var option3 = document.getElementById('option3');

    var price = document.getElementById('price'),
        allPrices = shopitem.allPrice.split(',');

    var buyButton = document.getElementById('buyButton');
    var addToCartButton = document.getElementById('addToCartButton');

    selectObject(shopitem, option1, option2, option3, buyButton, addToCartButton, allPrices[0]);

    options.forEach(function(item, i) {
        item.onchange = function(e) {
            for (var i = 0; i < shopitem.variants1.length; i++) {
                if (shopitem.variants2 && shopitem.variants3) {
                    for (var idx = 0; idx < shopitem.variants2.length; idx++) {
                        for (var index = 0; index < shopitem.variants3.length; index++) {
                            if (
                                option1.value == shopitem.variants1[i] &&
                                option2.value == shopitem.variants2[idx] &&
                                option3.value == shopitem.variants3[index]
                            ) {
                                var newPrice = allPrices[i*shopitem.variants2.length+idx*shopitem.variants3.length+index];

                                price.textContent = newPrice;
                                selectObject(shopitem, option1, option2, option3, buyButton, addToCartButton, newPrice);
                            }
                                
                        }
                    }
                } else if (shopitem.variants2) {
                    for (var idx = 0; idx < shopitem.variants2.length; idx++) {
                        if (option1.value == shopitem.variants1[i] && option2.value == shopitem.variants2[idx]) {
                            var newPrice = allPrices[i*shopitem.variants2.length+idx];

                            price.textContent = newPrice;
                            selectObject(shopitem, option1, option2, option3, buyButton, addToCartButton, newPrice);
                        }
                    }
                } else if (shopitem.variants3) {
                    for (var idx = 0; idx < shopitem.variants3.length; idx++) {
                        if (option1.value == shopitem.variants1[i] && option3.value == shopitem.variants3[idx]) {
                            var newPrice = allPrices[i*shopitem.variants3.length+idx];
                            price.textContent = newPrice;
                            selectObject(shopitem, option1, option2, option3, buyButton, addToCartButton, newPrice);
                        }
                    }
                } else {
                    if (option1.value == shopitem.variants1[i]) {
                        var newPrice = allPrices[i];
                        price.textContent =  newPrice;
                        selectObject(shopitem, option1, option2, option3, buyButton, addToCartButton, newPrice);
                    }
                }
            }
        };
    });
});

function selectObject(item, option1, option2, option3, buyButton, addButton, price) {
    var paypalURL = 'https://www.paypal.com/us/cgi-bin/webscr?';

    paypalURL += 'cmd='+'_xclick'+'&';
    paypalURL += 'business='+item.email+'&';
    paypalURL += 'amount='+price+'&';
    paypalURL += 'item_name='+item.name+'&';
    paypalURL += 'currency='+item.currency+'&';

    if (item.option1) {
        paypalURL += 'on0='+item.option1+'&';
        paypalURL += 'os0='+option1.value+'&';
    };
    if (item.option2) {
        paypalURL += 'on1='+item.option2+'&';
        paypalURL += 'os1='+option2.value+'&';
    };
    if (item.option3) {
        paypalURL += 'on2='+item.option3+'&';
        paypalURL += 'os2='+option3.value+'&';
    };

    if (paypalURL.slice(-1) == '&') {
        paypalURL = paypalURL.slice(0, -1);
    };

    buyButton.setAttribute('href', encodeURI(paypalURL));
    addButton.setAttribute('href', encodeURI(paypalURL.replace('cmd=_xclick','cmd=_cart')+'&add=1'));
}
