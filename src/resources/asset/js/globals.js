
const callUpdateCart = (uniqueId, quantity) =>{
    $.ajax({
        url: '/api/cart/saveCart',
        type: 'POST',
        data: { uniqueId: uniqueId, quantity: quantity },
        success: function(response) {
            $('.subtotal').text(parseInt(response.data.infoTotal.subTotal).toLocaleString('vi-VN') + "₫")
            $('.sumTotal').text(parseInt(response.data.infoTotal.total).toLocaleString('vi-VN') + "₫")
            $('.subtotal-text').text(parseInt(response.data.infoTotal.subTotal).toLocaleString('vi-VN') + "₫")
        },
        error: function(error) {
            console.error(error);
        }
    });
}

const callAddToCart = async (data) => {
    await $.ajax({
        url: '/api/cart/addToCart',
        type: 'POST',
        data: data,
        success: function(res) {
            $(".count-cart").text(res.data.length)
            handleGetCart(res.data.listPro)
            renderCart(res.data.listPro)

        },
        error: function(error) {
            console.error('Lỗi khi gửi yêu cầu POST:', error);
        }
    });
}
const handleGetCart = (cartItems) => {
    var cartList = $("#cart_list");
    if(cartItems === undefined) return
    var cartInner = cartItems.map((item, index) => {
    $('.offcanvas-btn').show();
        return `
        <div class="d-flex align-items-center justify-content-between mt-3" id="item-${item.uniqueId}">
            <img src="${item.productImage}" alt="${item.productName}" class="offcanvas-img" style="width: 150px; height: 150px; object-fit: cover;">
            <div class="px-3 col">
                <strong class="m-0" style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">${item.productName}</strong>
                <strong class="my-2" style="color: red;">${parseInt(item.productPrice).toLocaleString('vi-VN')} ₫</strong>

                <div>
                    <p class="m-0" style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">${item.tier1 ? item.tier1.group_tier + ": " + item.tier1.name : ''}</p>
                    <p class="m-0" style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">${item.tier2 ? item.tier2.group_tier + ": " + item.tier2.name : ''}</p>
                </div>
                <div class="product_details_info_counter my-2">
                    <a href="javascript:void(0)" class="btn-counter btn_prev" onclick="handleUpdateQuantity('${item.productId}', ${item.tier1?.id},${item.tier2?.id}, -1)">-</a>
                    <input type="text" readonly value=${item.quantity} id="quantity-${item.uniqueId}">
                    <a href="javascript:void(0)" class="btn-counter btn_next" onclick="handleUpdateQuantity('${item.productId}', ${item.tier1?.id},${item.tier2?.id}, 1)">+</a>
                </div>
            </div>
            <span class="fs-primary pointer" style="cursor: pointer;" onclick="handleDeletePro('${item.productId}', ${item.tier1?.id},${item.tier2?.id})">
                <i class="fa-solid fa-trash-can"></i>
            </span>
        </div>`;
    });

    cartList.html(cartInner.join(" "));
}
const callGetCart = () => {
    $.ajax({
        url: '/api/cart/getCartSession',
        type: 'GET',
        cache: false,
        dataType: "html",
        success: function(res) {
            res = JSON.parse(res)
            $(".count-cart").text(res.data.listPro.length)
            $(".subtotal-text").text(parseInt(res.data.infoTotal?.subTotal).toLocaleString('vi-VN') + "₫")
            handleGetCart(res.data.listPro);
        },
        error: function(error) {
            console.error('Lấy cartItems thất bại', error);
        }
    });
}

const handleUpdateQuantity = async (productId,tier1,tier2, quantity) => {
    await callAddToCart({productId,tier1,tier2, quantity})
}
const handleDeletePro = async (productId,tier1,tier2) => {
    $.ajax({
        url: '/api/cart/deleteCartItem',
        type: 'POST',
        data: {productId,tier1,tier2},
        success: function(res) {
            $(".count-cart").text(res.data.listPro.length)
            $(".subtotal-text").text(parseInt(res.data.infoTotal.subTotal).toLocaleString('vi-VN') + "₫")
            handleGetCart(res.data.listPro);
            renderCart(res.data.listPro)
        },
        error: function(error) {
        console.error(error);
        }
    });
}
const renderCart = (data)=>{
    if(data.length > 0 && $('#cartList').length > 0){
        let htmls = data.map((item)=>{
            return `<div class="card_item row">
                <div class="col-lg-2 col-4">
                    <img src="${item.productImage}">
                </div>
                <div class="col">
                    <div class="product_name">${item.productName}</div>
                    <div class="box_price my-2">
                        <span class="product_price">${item.productPrice.toLocaleString('vi-VN')} ₫</span>
                        <span class="product_old_price price">${item.productOldPrice.toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <div class="box_selection my-2">
                        <div class="d-flex align-items-center">
                            ${item.tier1?`<p class="m-0 me-1" >${item.tier1.group_tier}: </p><strong>${item.tier1.name}</strong>`:''}
                        </div>
                        <div class="d-flex align-items-center">
                            ${item.tier2?`<p class="m-0 me-1" >${item.tier2.group_tier}: </p><strong>${item.tier2.name}</strong>`:''}
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="product_details_info_counter my-2">
                            <a href="javascript:void(0)" class="btn-counter btn_prev" onclick="handleUpdateQuantity('${item.productId}',${item.tier1?item.tier1.id:''},${item.tier2?item.tier2.id:''},-1)">-</a>
                            <input type="text" readonly value="${item.quantity}">
                            <a href="javascript:void(0)" class="btn-counter btn_next" onclick="handleUpdateQuantity('${item.productId}',${item.tier1?item.tier1.id:''},${item.tier2?item.tier2.id:''},1)">+</a>
                        </div>
                        <span class="fs-primary pointer" onclick="handleDeletePro('${item.productId}',${item.tier1?item.tier1.id:''},${item.tier2?item.tier2.id:''})">
                            <i class="fa-solid fa-trash-can"></i> Xóa
                        </span>
                    </div>
                </div>
            </div>`;
        })
        $('#cartList').html(htmls.join(''))
    }
}