// script.js - Malala Yousafzai Tribute Page
// Interactive features and dynamic content

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. TIMELINE INTERACTION ==========
    // Add click events to list items to show more details
    const allListItems = document.querySelectorAll('li');
    
    allListItems.forEach((item, index) => {
        // Add a data attribute for tracking
        item.setAttribute('data-index', index);
        
        // Create tooltip or additional info on click
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active class from all items
            allListItems.forEach(li => {
                li.classList.remove('active-item');
            });
            
            // Add active class to clicked item
            this.classList.add('active-item');
            
            // Create or update tooltip
            showTooltip(this);
        });
    });
    
    // Function to show tooltip with additional info
    function showTooltip(element) {
        // Remove existing tooltip if any
        const existingTooltip = document.querySelector('.custom-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Get text content
        const text = element.textContent.trim();
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        
        // Add different tooltip content based on text
        if (text.includes('Prêmio Nobel')) {
            tooltip.innerHTML = `
                <strong>🏆 Detalhe:</strong> Malala recebeu o Nobel da Paz em 10 de dezembro de 2014, compartilhando o prêmio com Kailash Satyarthi.
                <br><small>Clique novamente para fechar</small>
            `;
        } else if (text.includes('Fundação Malala')) {
            tooltip.innerHTML = `
                <strong>💫 Detalhe:</strong> O Malala Fund já investiu mais de $6 milhões em educação feminina em todo o mundo.
                <br><small>Clique novamente para fechar</small>
            `;
        } else if (text.includes('atentado') || text.includes('ataque')) {
            tooltip.innerHTML = `
                <strong>⚠️ Detalhe:</strong> O ataque ocorreu em 9 de outubro de 2012. Malala foi transportada para o Reino Unido para tratamento especializado.
                <br><small>Clique novamente para fechar</small>
            `;
        } else if (text.includes('Oxford')) {
            tooltip.innerHTML = `
                <strong>🎓 Detalhe:</strong> Malala se formou em Oxford em 2020 com honras em Filosofia, Política e Economia.
                <br><small>Clique novamente para fechar</small>
            `;
        } else {
            tooltip.innerHTML = `
                <strong>📖 Saiba mais:</strong> ${text.substring(0, 100)}...
                <br><small>Clique novamente para fechar</small>
            `;
        }
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 80) + 'px';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.zIndex = '1000';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip when clicking anywhere else
        setTimeout(() => {
            document.addEventListener('click', function removeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== element) {
                    tooltip.remove();
                    document.removeEventListener('click', removeTooltip);
                    element.classList.remove('active-item');
                }
            });
        }, 100);
    }
    
    // ========== 2. BACK TO TOP BUTTON ==========
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== 3. PROGRESS BAR ==========
    // Create reading progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Update progress bar width based on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ========== 4. QUOTE GENERATOR ==========
    // Create quote section
    const quoteSection = document.createElement('div');
    quoteSection.className = 'quote-section';
    quoteSection.innerHTML = `
        <div class="quote-container">
            <div class="quote-icon">"</div>
            <p class="quote-text">Carregando citação inspiradora...</p>
            <button class="quote-btn">Nova Citação</button>
        </div>
    `;
    
    // Insert after h1
    const h1 = document.querySelector('h1');
    h1.insertAdjacentElement('afterend', quoteSection);
    
    // Malala's quotes
    const quotes = [
        "Uma criança, um professor, um livro, uma caneta podem mudar o mundo.",
        "Quando o mundo inteiro está em silêncio, até uma voz se torna poderosa.",
        "Eu levanto minha voz não para gritar mais alto que os outros, mas para aqueles que não têm voz.",
        "Não podemos ter sucesso quando metade de nós está sendo segurada.",
        "Não tenha medo das pessoas que querem te derrubar, porque elas são mais fracas que você.",
        "O extremismo tentou me silenciar, mas falhou.",
        "Sonhar não é suficiente, é preciso agir.",
        "A educação é a única solução para a paz mundial."
    ];
    
    const quoteText = document.querySelector('.quote-text');
    const quoteBtn = document.querySelector('.quote-btn');
    
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = quotes[randomIndex];
        
        // Add animation
        quoteText.style.animation = 'none';
        quoteText.offsetHeight; // Trigger reflow
        quoteText.style.animation = 'fadeIn 0.5s ease';
    }
    
    // Display initial quote
    displayRandomQuote();
    
    // Change quote on button click
    quoteBtn.addEventListener('click', displayRandomQuote);
    
    // ========== 5. STATS COUNTER ==========
    // Create stats section
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section';
    statsSection.innerHTML = `
        <h3 style="text-align: center; font-size: 1.5em;">📊 Impacto Global</h3>
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-number" data-target="130">0</div>
                <div class="stat-label">Milhões de meninas<br>impactadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-target="2014">0</div>
                <div class="stat-label">Prêmio Nobel<br>da Paz</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-target="100">0</div>
                <div class="stat-label">Países com<br>programas do Malala Fund</div>
            </div>
        </div>
    `;
    
    // Insert before h3 (principais realizações)
    const h3 = document.querySelector('h3');
    h3.insertAdjacentElement('beforebegin', statsSection);
    
    // Animate numbers when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (statsPosition < screenPosition) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
            });
        }
    }
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // Check on load
    
    // ========== 6. SEARCH/FILTER FUNCTION ==========
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="🔍 Pesquisar informações sobre Malala..." class="search-input">
    `;
    
    // Insert after stats section
    statsSection.insertAdjacentElement('afterend', searchContainer);
    
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const allSections = document.querySelectorAll('li, h2, h3, h4, h5, h6');
        
        allSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) && searchTerm.length > 2) {
                section.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                section.style.transition = 'all 0.3s ease';
                
                // Scroll to first match
                if (searchTerm.length > 2 && !window.firstMatchHighlighted) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    window.firstMatchHighlighted = true;
                }
            } else {
                section.style.backgroundColor = '';
            }
        });
        
        // Reset flag when search is cleared
        if (searchTerm.length === 0) {
            window.firstMatchHighlighted = false;
        }
    });
    
    // ========== 7. DATE COUNTDOWN ==========
    // Create countdown for next birthday
    const countdownSection = document.createElement('div');
    countdownSection.className = 'countdown-section';
    countdownSection.innerHTML = `
        <div class="countdown-container">
            <h4 style="color: #FFD700; margin-bottom: 10px;">🎂 Próximo Aniversário de Malala</h4>
            <div class="countdown-timer">
                <span id="days">00</span>d 
                <span id="hours">00</span>h 
                <span id="minutes">00</span>m 
                <span id="seconds">00</span>s
            </div>
        </div>
    `;
    
    const h6 = document.querySelector('h6');
    h6.insertAdjacentElement('afterend', countdownSection);
    
    function updateCountdown() {
        const today = new Date();
        const birthday = new Date(today.getFullYear(), 6, 12); // July 12 (month is 0-indexed)
        
        if (today > birthday) {
            birthday.setFullYear(today.getFullYear() + 1);
        }
        
        const diff = birthday - today;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // ========== 8. KEYBOARD NAVIGATION ==========
    document.addEventListener('keydown', function(e) {
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('Voltando ao topo!', 'info');
        }
        
        // Press 'Q' for new quote
        if (e.key === 'q' || e.key === 'Q') {
            displayRandomQuote();
            showNotification('Nova citação carregada!', 'success');
        }
    });
    
    // ========== 9. NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ========== 10. PRINT FRIENDLY BUTTON ==========
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ Imprimir Página';
    printBtn.className = 'print-btn';
    printBtn.setAttribute('aria-label', 'Imprimir página');
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // ========== 11. ADD CSS ANIMATIONS ==========
    // Add animation styles dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .custom-tooltip {
            background: linear-gradient(135deg, #CC0000, #8B0000);
            color: #FFD700;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 14px;
            max-width: 300px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            border-left: 4px solid #FFD700;
            animation: slideIn 0.3s ease;
            z-index: 1000;
        }
        
        .active-item {
            background: rgba(204, 0, 0, 0.3);
            transform: translateX(10px);
            border-left-color: #FFD700;
        }
        
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #CC0000;
            color: #FFD700;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 999;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #FFD700;
            color: #CC0000;
            transform: scale(1.1);
        }
        
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #CC0000, #FFD700);
            z-index: 9999;
            transition: width 0.2s ease;
        }
        
        .quote-section {
            background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(204,0,0,0.2));
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            border: 1px solid #FFD700;
        }
        
        .quote-icon {
            font-size: 60px;
            color: #FFD700;
            opacity: 0.5;
            margin-bottom: -20px;
        }
        
        .quote-text {
            font-size: 1.3em;
            font-style: italic;
            color: #FFFFFF;
            margin: 20px 0;
            line-height: 1.6;
        }
        
        .quote-btn {
            background: #CC0000;
            color: #FFD700;
            border: none;
            padding: 10px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s ease;
        }
        
        .quote-btn:hover {
            background: #FFD700;
            color: #CC0000;
            transform: scale(1.05);
        }
        
        .stats-section {
            background: rgba(0,0,0,0.5);
            border-radius: 15px;
            padding: 30px;
            margin: 40px 0;
            border: 1px solid #CC0000;
        }
        
        .stats-container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        
        .stat-card {
            text-align: center;
            flex: 1;
            min-width: 150px;
            padding: 20px;
            background: rgba(204, 0, 0, 0.1);
            border-radius: 10px;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 10px;
        }
        
        .stat-label {
            color: #FFFFFF;
            font-size: 0.9em;
        }
        
        .search-container {
            margin: 30px 0;
        }
        
        .search-input {
            width: 100%;
            padding: 15px;
            background: rgba(0,0,0,0.7);
            border: 2px solid #CC0000;
            border-radius: 10px;
            color: #FFD700;
            font-size: 1em;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #FFD700;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        
        .search-input::placeholder {
            color: rgba(255, 215, 0, 0.5);
        }
        
        .countdown-section {
            background: rgba(204, 0, 0, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        
        .countdown-timer {
            font-size: 1.5em;
            color: #FFD700;
            font-weight: bold;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: #FFD700;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #CC0000, #8B0000);
            border-left: 4px solid #FFD700;
        }
        
        .notification-success {
            background: linear-gradient(135deg, #FFD700, #CC0000);
            color: #000000;
            border-left: 4px solid #000000;
        }
        
        .print-btn {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: #CC0000;
            color: #FFD700;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .print-btn:hover {
            background: #FFD700;
            color: #CC0000;
            transform: scale(1.05);
        }
        
        @media print {
            .back-to-top, .quote-btn, .search-container, .print-btn, 
            .progress-bar, .notification, .custom-tooltip {
                display: none !important;
            }
            
            body {
                background: white;
                color: black;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: black;
            }
        }
        
        @media (max-width: 768px) {
            .stats-container {
                flex-direction: column;
            }
            
            .back-to-top, .print-btn {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
            
            .print-btn {
                width: auto;
                padding: 8px 15px;
            }
            
            .quote-text {
                font-size: 1em;
            }
            
            .countdown-timer {
                font-size: 1.2em;
            }
        }
    `;
    
    document.head.appendChild(styleSheet);
    
    // Console welcome message
    console.log('%c✨ Malala Yousafzai Tribute Page ✨', 'color: #FFD700; font-size: 16px; font-weight: bold;');
    console.log('%c"Uma criança, um professor, um livro, uma caneta podem mudar o mundo."', 'color: #CC0000; font-style: italic;');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Bem-vindo à página de tributo à Malala! Use "Q" para novas citações e "T" para voltar ao topo.', 'info');
    }, 1000);
});