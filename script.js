// Menu Day Switching
        document.addEventListener('DOMContentLoaded', function() {
            const dayButtons = document.querySelectorAll('.day-btn');
            const menuDays = document.querySelectorAll('.menu-day');

            dayButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const day = this.getAttribute('data-day');

                    // Update active button
                    dayButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Show selected day menu
                    menuDays.forEach(dayMenu => {
                        dayMenu.classList.remove('active');
                        if (dayMenu.id === `${day}-menu`) {
                            dayMenu.classList.add('active');
                        }
                    });
                });
            });

            // Check if user is logged in
            checkLoginStatus();

            // Inventory Data
            const inventoryItems = [
                { id: 1, name: "Ertalabki Nonushta", category: "breakfast", quantity: 15 },
                { id: 2, name: "Mastava va Salad", category: "lunch", quantity: 12 },
                { id: 3, name: "Qovurilgan Baliq", category: "dinner", quantity: 8 },
                { id: 4, name: "Sutli Choy va Qaymoq", category: "breakfast", quantity: 20 },
                { id: 5, name: "Osh", category: "lunch", quantity: 18 },
                { id: 6, name: "Sabzavotli Kebab", category: "dinner", quantity: 10 },
                { id: 7, name: "Omlet va Kolbasa", category: "breakfast", quantity: 14 },
                { id: 8, name: "Moshxo'rda", category: "lunch", quantity: 12 },
                { id: 9, name: "Qozon Kabob", category: "dinner", quantity: 9 },
                { id: 10, name: "Quymoq va Asal", category: "breakfast", quantity: 16 },
                { id: 11, name: "Chuchvara", category: "lunch", quantity: 14 },
                { id: 12, name: "Somsa", category: "dinner", quantity: 22 },
                { id: 13, name: "Tuxum Qovurma", category: "breakfast", quantity: 25 },
                { id: 14, name: "Lag'mon", category: "lunch", quantity: 13 },
                { id: 15, name: "Qovurma Shashlik", category: "dinner", quantity: 11 },
                { id: 16, name: "Sutli Bo'tqa", category: "breakfast", quantity: 18 },
                { id: 17, name: "Norin", category: "lunch", quantity: 9 },
                { id: 18, name: "Tovuq Kabob", category: "dinner", quantity: 12 }
            ];

            const inventoryGrid = document.getElementById('inventory-grid');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const searchInput = document.getElementById('search-input');

            // Render inventory items
            function renderInventory(items) {
                inventoryGrid.innerHTML = '';

                items.forEach(item => {
                    const inventoryItem = document.createElement('div');
                    inventoryItem.className = 'inventory-item';
                    inventoryItem.setAttribute('data-category', item.category);

                    inventoryItem.innerHTML = `
                        <div class="item-header">
                            <div class="item-name">${item.name}</div>
                            <div class="item-category">${getCategoryName(item.category)}</div>
                        </div>
                        <div class="item-quantity">
                            <div>
                                <div style="font-size: 0.9rem; color: var(--light-text);">Mavjud:</div>
                                <div class="quantity-value">${item.quantity} ta</div>
                            </div>
                            <div class="quantity-controls">
                                <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
                                <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    `;

                    inventoryGrid.appendChild(inventoryItem);
                });

                // Add event listeners to quantity buttons
                document.querySelectorAll('.minus-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.getAttribute('data-id'));
                        const item = inventoryItems.find(item => item.id === id);
                        if (item.quantity > 0) {
                            item.quantity--;
                            applyFilters();
                        }
                    });
                });

                document.querySelectorAll('.plus-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.getAttribute('data-id'));
                        const item = inventoryItems.find(item => item.id === id);
                        item.quantity++;
                        applyFilters();
                    });
                });
            }

            // Get category name
            function getCategoryName(category) {
                switch(category) {
                    case 'breakfast': return 'Nonushta';
                    case 'lunch': return 'Tushlik';
                    case 'dinner': return 'Kechki ovqat';
                    default: return 'Boshqa';
                }
            }

            // Apply filters
            function applyFilters() {
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                const searchTerm = searchInput.value.toLowerCase();

                let filteredItems = inventoryItems.filter(item => item.quantity > 0);

                if (activeFilter !== 'all') {
                    filteredItems = filteredItems.filter(item => item.category === activeFilter);
                }

                if (searchTerm) {
                    filteredItems = filteredItems.filter(item =>
                        item.name.toLowerCase().includes(searchTerm)
                    );
                }

                renderInventory(filteredItems);
            }

            // Filter inventory items
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');

                    // Update active filter button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    applyFilters();
                });
            });

            // Search functionality
            searchInput.addEventListener('input', applyFilters);

            // Initial render
            applyFilters();

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });

                        // Update active nav link
                        document.querySelectorAll('.nav-links a').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                });
            });
        });

        // Auth Functions
        function showModal(type) {
            document.getElementById(type + 'Modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function hideModal(type) {
            document.getElementById(type + 'Modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function switchToRegister() {
            hideModal('login');
            showModal('register');
        }

        function switchToLogin() {
            hideModal('register');
            showModal('login');
        }

        // Close modal on outside click
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Password strength checker
        function checkPasswordStrength() {
            const password = document.getElementById('regPassword').value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');

            let strength = 0;

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]+/)) strength++;
            if (password.match(/[A-Z]+/)) strength++;
            if (password.match(/[0-9]+/)) strength++;
            if (password.match(/[$@#&!]+/)) strength++;

            switch(strength) {
                case 0:
                case 1:
                    strengthBar.style.width = '20%';
                    strengthBar.style.background = '#E74C3C';
                    strengthText.textContent = 'Juda zaif parol';
                    strengthText.style.color = '#E74C3C';
                    break;
                case 2:
                    strengthBar.style.width = '40%';
                    strengthBar.style.background = '#F39C12';
                    strengthText.textContent = 'Zaif parol';
                    strengthText.style.color = '#F39C12';
                    break;
                case 3:
                    strengthBar.style.width = '60%';
                    strengthBar.style.background = '#3498DB';
                    strengthText.textContent = 'O\'rtacha parol';
                    strengthText.style.color = '#3498DB';
                    break;
                case 4:
                    strengthBar.style.width = '80%';
                    strengthBar.style.background = '#2ECC71';
                    strengthText.textContent = 'Kuchli parol';
                    strengthText.style.color = '#2ECC71';
                    break;
                case 5:
                    strengthBar.style.width = '100%';
                    strengthBar.style.background = 'linear-gradient(90deg, #2ECC71, #27AE60)';
                    strengthText.textContent = 'Juda kuchli parol';
                    strengthText.style.color = '#27AE60';
                    break;
            }
        }

        // Handle login
        function handleLogin(event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                if (rememberMe) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                hideModal('login');
                updateUIForLoggedInUser(user);
                showNotification(`Xush kelibsiz, ${user.name}!`, 'success');
            } else {
                showNotification('Email yoki parol noto\'g\'ri!', 'error');
            }
        }

        // Handle register
        function handleRegister(event) {
            event.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const className = document.getElementById('regClass').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('Parollar mos kelmadi!', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.some(u => u.email === email)) {
                showNotification('Bu email allaqachon ro\'yxatdan o\'tgan!', 'error');
                return;
            }

            const newUser = {
                id: users.length + 1,
                name,
                email,
                class: className,
                password,
                avatar: name.charAt(0).toUpperCase()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            showNotification('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi tizimga kiring.', 'success');
            hideModal('register');
            showModal('login');
        }

        // Check login status
        function checkLoginStatus() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) ||
                               JSON.parse(sessionStorage.getItem('currentUser'));

            if (currentUser) {
                updateUIForLoggedInUser(currentUser);
            }
        }

        // Update UI for logged in user
        function updateUIForLoggedInUser(user) {
            document.getElementById('authSection').style.display = 'none';
            document.getElementById('userSection').style.display = 'flex';
            document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
            document.getElementById('userName').textContent = user.name.split(' ')[0];
        }

        // Logout
        function logout() {
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');

            document.getElementById('authSection').style.display = 'flex';
            document.getElementById('userSection').style.display = 'none';

            showNotification('Tizimdan chiqildi!', 'info');
        }

        // Show notification
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = 'notification';

            let icon, bgColor;
            if (type === 'success') {
                icon = 'fa-check-circle';
                bgColor = 'linear-gradient(135deg, #2ECC71, #27AE60)';
            } else if (type === 'error') {
                icon = 'fa-exclamation-circle';
                bgColor = 'linear-gradient(135deg, #E74C3C, #C0392B)';
            } else {
                icon = 'fa-info-circle';
                bgColor = 'linear-gradient(135deg, #3498DB, #2980B9)';
            }

            notification.style.background = bgColor;
            notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }