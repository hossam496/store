let inputProduct = document.getElementById('inputProduct')
let addBtn = document.getElementById('addBtn')
let count = document.getElementById('count')
let content = document.getElementById('content')
let Edit = null

let allProducts = [
    {id: 1, name: "Apple TV 4K", price: "10000", desc: "with Wi-Fi and Ethernet", image: "https://www.apple.com/mideast/buy/images/products/tv/apple_4k_ethernet__dbqrjd7wvsuq_large.jpg"},
    {id: 2, name: "Apple TV 4K", price: "20000", desc: "with Wi-Fi", image: "https://www.apple.com/mideast/buy/images/products/tv/apple_4k_wifi__fpjm9mmlrzyy_large.jpg"},
    {id: 3, name: "iPhone 16e", price: "30000", desc: "Latest iPhone. Greatest price", image: "https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_16e__cubm3xoy5qaa_large.png"},
    {id: 4, name: "iPhone 15", price: "40000", desc: "As amazing as ever.", image: "https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_15__buwagff0mwwi_large.png"},
    {id: 5, name: "iPhone 16", price: "50000", desc: "Latest iPhone. Greatest price.", image: "https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_16__c5bvots96jee_large.png"},
    {id: 6, name: "iPhone 16 Pro", price: "100000", desc: "The ultimate iPhone.", image: "https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_16pro__erw9alves2qa_large.png"},
    {id: 7, name: "iPad Air", price: "17000", desc: "Serious performance in a thin and light design.", image: "https://www.apple.com/mideast/buy/images/products/ipad/pt_ipad_air__cr381zljqdiu_large.png"},
    {id: 8, name: "MacBook Air 13", price: "22000", desc: "Strikingly thin and fast so you can work, play, or create anywhere.", image: "https://www.apple.com/assets-www/en_WW/mac/product_tile/large/mba_13_15_5b2ef1589.png"},
    {id: 9, name: "Apple Watch Ultra 2", price: "10000", desc: "The ultimate sportsand adventure watch.", image: "https://www.apple.com/mideast/buy/images/products/watch/select/product_u2__ebztafh9rvau_large.png"},
    {id: 10, name: "Apple Watch SE", price: "60000", desc: "All the essentials.Light on price.", image: "https://www.apple.com/mideast/buy/images/products/watch/product_se__frx4hb13romm_large.png"},
    {id: 11, name: "AirPods 4", price: "20000", desc: "The next evolution of sound and comfort.", image: "https://www.apple.com/mideast/buy/images/products/airpods/compare_airpods_4__fy4e25bzx1u2_large.png"},
    {id: 12, name: "AirPods Pro 2", price: "30000", desc: "Pro-level Active Noise Cancellation and advancements in hearing health", image: "https://www.apple.com/mideast/buy/images/products/airpods/compare_airpods_pro_2__c3r137ebxwae_large.png"},
]

count.innerHTML = `عدد المنتجات: ${allProducts.length}`

function drow() {
    content.innerHTML = ""
    allProducts.forEach((ele) => {
        content.innerHTML += `
        <div class="product-item">
            <img src="${ele.image}" class="product-image" alt="${ele.name}" onload="this.classList.add('loaded')">
            <div class="product-content">
                <div class="product-info">
                    <h3 class="product-title">${ele.name}</h3>
                    <p class="product-price">السعر: ${ele.price}$</p>
                    <p class="product-desc">${ele.desc}</p>
                </div>
                <div class="product-actions">
                    <button class="edit-btn" onclick="EditBtn(${ele.id})">تعديل</button>
                    <button class="delete-btn" onclick="deleteBtn(${ele.id})">حذف</button>
                </div>
            </div>
        </div>
        `
    })
}

drow()

inputProduct.addEventListener('input', () => {
    if(inputProduct.value.trim() !== "") {
        addBtn.removeAttribute('disabled')
    } else {
        addBtn.setAttribute('disabled', true)
    }
})

function EditBtn(id) {
    let findProduct = allProducts.find(f => f.id === id)
    if(findProduct) {
        Swal.fire({
            title: 'تعديل المنتج',
            html: `
                <input id="swal-name" class="swal2-input" value="${findProduct.name}" placeholder="اسم المنتج">
                <input id="swal-price" class="swal2-input" type="number" min="0" step="0.01" value="${findProduct.price}" placeholder="سعر المنتج">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'حفظ التعديل',
            cancelButtonText: 'إلغاء',
            preConfirm: () => {
                const name = document.getElementById('swal-name').value.trim()
                const price = parseFloat(document.getElementById('swal-price').value)
                
                if(!name) {
                    Swal.showValidationMessage('يجب إدخال اسم المنتج')
                    return false
                }
                
                if(isNaN(price) ){
                    Swal.showValidationMessage('يجب إدخال سعر صحيح')
                    return false
                }
                
                return {
                    name: name,
                    price: price
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                findProduct.name = result.value.name
                findProduct.price = result.value.price
                
                drow()
                
                Swal.fire({
                    icon: 'success',
                    title: 'تم التعديل',
                    text: 'تم تعديل المنتج بنجاح',
                    confirmButtonText: 'حسناً'
                })
            }
        })
    }
}
addBtn.addEventListener('click', () => {
    if(inputProduct.value.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يجب إدخال اسم المنتج',
            confirmButtonText: 'حسناً'
        })
        return
    }

    let db = allProducts.some(d => d.name === inputProduct.value)
    if (db) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'الاسم موجود بالفعل',
            confirmButtonText: 'حسناً'
        })
        return
    }

    Swal.fire({
        title: 'إضافة منتج جديد',
        html: `
            <p>اسم المنتج: <strong>${inputProduct.value}</strong></p>
            <input id="swal-price" class="swal2-input" type="number" min="0" step="0.01" placeholder="ادخل السعر">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'إضافة',
        cancelButtonText: 'إلغاء',
        preConfirm: () => {
            const price = parseFloat(document.getElementById('swal-price').value)
            
            if(isNaN(price)) {
                Swal.showValidationMessage('يجب إدخال سعر صحيح')
                return false
            }
            
            return {
                name: inputProduct.value,
                price: price
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value.price) {
            let lasId = allProducts.length ? allProducts[allProducts.length -1].id : 0
            allProducts.push({
                id: ++lasId,
                name: result.value.name,
                price: result.value.price,
                desc: "the new mobile",
            })
            drow()
            count.innerHTML = `عدد المنتجات: ${allProducts.length}`
            Swal.fire({
                icon: 'success',
                title: 'تمت الإضافة',
                text: 'تم إضافة المنتج بنجاح',
                confirmButtonText: 'حسناً'
            })
            
            inputProduct.value = ""
            addBtn.setAttribute('disabled', true)
        }
    })
})
function deleteBtn(id) {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من استعادة هذا المنتج!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'نعم، احذف',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            const itemToDelete = document.querySelector(`.product-item button[onclick="deleteBtn(${id})"]`).closest('.product-item');
            if (itemToDelete) {
                itemToDelete.classList.add('deleting');
                
                setTimeout(() => {
                    let index = allProducts.map((del) => del.id).indexOf(id);
                    if(index !== -1) {
                        allProducts.splice(index, 1);
                    }
                    drow();
                    count.innerHTML = `عدد المنتجات: ${allProducts.length}`;
                    Swal.fire(
                        'تم الحذف!',
                        'تم حذف المنتج بنجاح.',
                        'success'
                    );
                }); 
            }
        }
    })
}


////////////////////////////////////////////////////////////////////


let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cartItems');
let cartTotal = document.getElementById('cartTotal');
let cartSidebar = document.getElementById('cartSidebar');
let searchInput = document.getElementById('searchInput');
let filterPrice = document.getElementById('filterPrice');

function drow(products = allProducts) {
    content.innerHTML = "";
    products.forEach((ele) => {
        content.innerHTML += `
        <div class="product-item">
            <img src="${ele.image}" class="product-image" alt="${ele.name}" onload="this.classList.add('loaded')">
            <div class="product-content">
                <div class="product-info">
                    <h3 class="product-title">${ele.name}</h3>
                    <p class="product-price">السعر: ${ele.price}$</p>
                    <p class="product-desc">${ele.desc}</p>
                    <p class="product-stock">الكمية المتاحة: ${ele.stock || 10}</p>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${ele.id})">أضف إلى السلة</button>
                    <button class="edit-btn" onclick="EditBtn(${ele.id})">تعديل</button>
                    <button class="delete-btn" onclick="deleteBtn(${ele.id})">حذف</button>
                </div>
            </div>
        </div>
        `;
    });
}

function addToCart(id) {
    let product = allProducts.find(p => p.id === id);
    if (!product) return;

    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        if (existingItem.quantity < (product.stock || 10)) {
            existingItem.quantity++;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'لا يوجد كمية كافية في المخزن',
                confirmButtonText: 'حسناً'
            });
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    Swal.fire({
        icon: 'success',
        title: 'تمت الإضافة',
        text: 'تمت إضافة المنتج إلى السلة',
        confirmButtonText: 'حسناً'
    });
}

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price}$ × ${item.quantity}</p>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
        `;
    });
    
    cartTotal.textContent = total;
}

function changeQuantity(id, delta) {
    let item = cart.find(item => item.id === id);
    if (!item) return;

    let product = allProducts.find(p => p.id === id);
    if (delta > 0 && item.quantity >= (product.stock || 10)) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'لا يوجد كمية كافية في المخزن',
            confirmButtonText: 'حسناً'
        });
        return;
    }

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

document.querySelector('.cart-icon').addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'السلة فارغة',
            text: 'الرجاء إضافة منتجات إلى السلة أولاً',
            confirmButtonText: 'حسناً'
        });
        return;
    }

    Swal.fire({
        title: 'إتمام الشراء',
        html: `
            <p>إجمالي الطلب: ${cartTotal.textContent}$</p>
            <input id="swal-name" class="swal2-input" placeholder="الاسم الكامل">
            <input id="swal-address" class="swal2-input" placeholder="العنوان">
            <input id="swal-phone" class="swal2-input" placeholder="رقم الهاتف">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'تأكيد الطلب',
        cancelButtonText: 'إلغاء',
        preConfirm: () => {
            return {
                name: document.getElementById('swal-name').value,
                address: document.getElementById('swal-address').value,
                phone: document.getElementById('swal-phone').value
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: 'انت نصاب و مش معاك فلوس',
                confirmButtonText: 'حسناً'
            });
            
            cart = [];
            updateCart();
        }
    });
});

searchInput.addEventListener('input', () => {
    filterProducts();
});

filterPrice.addEventListener('change', () => {
    filterProducts();
});

function filterProducts() {
    let filtered = [...allProducts];
    
    if (searchInput.value.trim()) {
        filtered = filtered.filter(product => 
            product.name.includes(searchInput.value.trim()) || 
            product.desc.includes(searchInput.value.trim())
        );
    }
    
    if (filterPrice.value === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (filterPrice.value === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    drow(filtered);
    count.innerHTML = `عدد المنتجات: ${filtered.length}`;
}

