let cart = [];

        // 更新數量
        function updateQuantity(productId, change) {
            const qtyElement = document.getElementById(productId);
            const newQty = Math.max(0, parseInt(qtyElement.textContent) + change);
            qtyElement.textContent = newQty;
        }

        // 加入購物車
        function addToCart(productName, productId) {
            const quantity = parseInt(document.getElementById(productId).textContent);
            if (quantity > 0) {
                // 檢查商品是否已在購物車中
                const existingItem = cart.find(item => item.productName === productName);
                if (existingItem) {
                    existingItem.quantity += quantity; // 累加數量
                } else {
                    cart.push({ productName, quantity }); // 新增商品
                }
                updateCartDisplay(); // 更新購物車顯示
                saveCart(); // 儲存到本地
                document.getElementById(productId).textContent = 0; // 更新商品數量顯示為 0
            } else {
                alert("請選擇數量");
            }
        }

        // 顯示購物車內容
        function updateCartDisplay() {
            const cartList = document.getElementById("cartList");
            cartList.innerHTML = ""; // 清空舊的購物車內容
        
            if (cart.length === 0) {
                cartList.innerHTML = "<tr><td colspan='3'>購物車是空的</td></tr>";
                return;
            }
        
            cart.forEach((item, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.productName}</td>
                    <td>
                        <button class="btn btn-outline-secondary btn-sm" onclick="changeCartQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="changeCartQuantity(${index}, 1)">+</button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">移除</button>
                    </td>
                `;
                cartList.appendChild(row);
            });
        }
        

        function changeCartQuantity(index, change) {
            cart[index].quantity = Math.max(0, cart[index].quantity + change);
        
            if (cart[index].quantity === 0) {
                cart.splice(index, 1); // 如果數量為 0，則移除該項
            }
        
            updateCartDisplay(); // 更新購物車顯示
            saveCart();          // 儲存到本地存儲
        }
        
        
        function removeFromCart(index) {
            cart.splice(index, 1); // 從購物車中移除該商品
            updateCartDisplay();   // 更新購物車顯示
            saveCart();            // 儲存到本地存儲
        }
        


        // 儲存購物車到 localStorage
        function saveCart() {
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        // 從 localStorage 加載購物車
        function loadCart() {
            const savedCart = localStorage.getItem("cart");
            try {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    cart = parsedCart;
                    updateCartDisplay();
                }
            } catch (e) {
                console.error("無法解析購物車數據", e);
                cart = [];
            }
        }
        
        // 頁面加載時執行
        document.addEventListener("DOMContentLoaded", loadCart);