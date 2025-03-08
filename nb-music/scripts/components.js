/**
 * 现代UI组件系统
 * 提供高端交互组件实现
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化各种组件
    initMobileMenu();
    initFloatingLabels();
    initCarousels();
    initModals();
    initTooltips();
    initAppearanceAnimations();
    initAudioPlayers();
    initNotifications();
});

/**
 * 高级移动菜单实现
 * 处理移动设备上的导航
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!menuToggle || !mobileNav) {
        // 如果页面上没有移动菜单的元素，创建它
        createMobileMenu();
        return;
    }
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // 关闭菜单的点击处理
    const closeMenu = () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    };
    
    // 点击链接关闭菜单
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // 点击菜单外区域关闭菜单
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

/**
 * 创建移动菜单元素
 * 如果页面上不存在移动菜单，动态添加一个
 */
function createMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return; // 如果没有导航链接，则不需要移动菜单
    
    // 创建移动菜单切换按钮
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', '菜单');
    
    // 创建汉堡图标
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('span');
        bar.className = 'toggle-bar';
        menuToggle.appendChild(bar);
    }
    
    // 创建移动导航容器
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    
    // 克隆现有导航链接并添加到移动导航
    const clonedLinks = navLinks.cloneNode(true);
    mobileNav.appendChild(clonedLinks);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 20px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1100;
            position: relative;
        }
        
        .toggle-bar {
            width: 100%;
            height: 2px;
            background-color: var(--text-primary);
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .menu-toggle.active .toggle-bar:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
            background-color: var(--accent-color);
        }
        
        .menu-toggle.active .toggle-bar:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active .toggle-bar:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
            background-color: var(--accent-color);
        }
        
        .mobile-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background-color: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 1000;
            transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
            padding: 100px 2rem 2rem;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
            overflow-y: auto;
        }
        
        .mobile-nav.active {
            right: 0;
        }
        
        .mobile-nav .nav-links {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
        }
        
        .mobile-nav .nav-links a {
            font-size: 1.2rem;
            padding: 0.5rem;
            display: block;
            width: 100%;
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
            }
            
            .main-nav .nav-links {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 添加到DOM
    document.querySelector('.main-nav').appendChild(menuToggle);
    document.body.appendChild(mobileNav);
    
    // 添加事件监听器
    initMobileMenu();
}

/**
 * 浮动标签效果
 * 用于表单输入时的动态标签
 */
function initFloatingLabels() {
    const floatingInputs = document.querySelectorAll('.floating-input');
    
    if (floatingInputs.length === 0) return;
    
    floatingInputs.forEach(input => {
        // 检查输入框是否有值，如果有则添加has-value类
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        // 输入时添加has-value类
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
        
        // 获取焦点时添加focus类
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focus');
        });
        
        // 失去焦点时移除focus类
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focus');
        });
    });
}

/**
 * 高级轮播组件
 * 支持自动播放、触摸滑动和键盘导航
 */
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (!container || slides.length === 0) return;
        
        let currentIndex = 0;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;
        let animationID = 0;
        let autoplayInterval = null;
        
        // 自动播放
        const autoplay = carousel.getAttribute('data-autoplay') === 'true';
        const delay = parseInt(carousel.getAttribute('data-delay') || 5000);
        
        // 创建导航点
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }
        
        // 设置容器宽度
        container.style.width = `${slides.length * 100}%`;
        
        // 导航函数
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            currentTranslate = -index * (100 / slides.length);
            prevTranslate = currentTranslate;
            
            container.style.transform = `translateX(${currentTranslate}%)`;
            
            // 更新导航点
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }
        
        // 下一张/上一张按钮
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                resetAutoplay();
                goToSlide(currentIndex - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                resetAutoplay();
                goToSlide(currentIndex + 1);
            });
        }
        
        // 触摸事件
        carousel.addEventListener('touchstart', touchStart);
        carousel.addEventListener('touchmove', touchMove);
        carousel.addEventListener('touchend', touchEnd);
        
        // 鼠标事件
        carousel.addEventListener('mousedown', touchStart);
        carousel.addEventListener('mousemove', touchMove);
        carousel.addEventListener('mouseup', touchEnd);
        carousel.addEventListener('mouseleave', touchEnd);
        
        // 阻止图像拖动
        carousel.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });
        
        function touchStart(event) {
            resetAutoplay();
            startX = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            container.style.transition = 'none';
        }
        
        function touchMove(event) {
            if (isDragging) {
                const currentX = getPositionX(event);
                currentTranslate = prevTranslate + (currentX - startX) * 100 / carousel.offsetWidth;
            }
        }
        
        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            container.style.transition = 'transform 0.3s ease';
            
            // 确定滑动方向
            const movedBy = currentTranslate - prevTranslate;
            
            if (movedBy < -10) { // 向左滑动，下一张
                goToSlide(currentIndex + 1);
            } else if (movedBy > 10) { // 向右滑动，上一张
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex); // 回到当前
            }
            
            startAutoplay();
        }
        
        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }
        
        function setSliderPosition() {
            container.style.transform = `translateX(${currentTranslate}%)`;
        }
        
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        // 键盘导航
        carousel.tabIndex = 0;
        carousel.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') {
                resetAutoplay();
                goToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                resetAutoplay();
                goToSlide(currentIndex + 1);
            }
        });
        
        // 自动播放
        function startAutoplay() {
            if (autoplay) {
                autoplayInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, delay);
            }
        }
        
        function resetAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                startAutoplay();
            }
        }
        
        // 初始化自动播放
        startAutoplay();
    });
}

/**
 * 模态窗口组件
 * 支持多个模态窗口和动画过渡
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalClosers = document.querySelectorAll('[data-modal-close]');
    
    // 打开模态窗口
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // 关闭模态窗口
    modalClosers.forEach(closer => {
        closer.addEventListener('click', e => {
            e.preventDefault();
            const modal = closer.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // 点击背景关闭模态窗口
    document.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // 按ESC键关闭模态窗口
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            if (modal) {
                closeModal(modal);
            }
        }
    });
    
    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // 触发打开事件
        const event = new CustomEvent('modal:open', {
            bubbles: true,
            detail: { modal }
        });
        modal.dispatchEvent(event);
    }
    
    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // 触发关闭事件
        const event = new CustomEvent('modal:close', {
            bubbles: true,
            detail: { modal }
        });
        modal.dispatchEvent(event);
    }
}

/**
 * 工具提示组件
 * 自动定位和响应式调整
 */
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        const tooltipText = trigger.getAttribute('data-tooltip');
        const position = trigger.getAttribute('data-tooltip-position') || 'top';
        
        // 创建工具提示元素
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip-${position}`;
        tooltip.textContent = tooltipText;
        
        // 添加工具提示到文档中
        document.body.appendChild(tooltip);
        
        // 显示工具提示
        trigger.addEventListener('mouseenter', () => {
            const rect = trigger.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // 根据位置设置工具提示位置
            switch (position) {
                case 'top':
                    tooltip.style.top = rect.top + scrollTop - tooltip.offsetHeight - 10 + 'px';
                    tooltip.style.left = rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    break;
                case 'bottom':
                    tooltip.style.top = rect.bottom + scrollTop + 10 + 'px';
                    tooltip.style.left = rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    break;
                case 'left':
                    tooltip.style.top = rect.top + scrollTop + (rect.height / 2) - (tooltip.offsetHeight / 2) + 'px';
                    tooltip.style.left = rect.left + scrollLeft - tooltip.offsetWidth - 10 + 'px';
                    break;
                case 'right':
                    tooltip.style.top = rect.top + scrollTop + (rect.height / 2) - (tooltip.offsetHeight / 2) + 'px';
                    tooltip.style.left = rect.right + scrollLeft + 10 + 'px';
                    break;
            }
            
            tooltip.classList.add('active');
        });
        
        // 隐藏工具提示
        trigger.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

/**
 * 外观动画系统
 * 添加高级动画效果
 */
function initAppearanceAnimations() {
    // 逐个字母显示效果
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const letters = text.split('');
        
        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = letter === ' ' ? 'inline' : 'inline-block';
            span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            span.style.transitionDelay = `${i * 0.05}s`;
            
            element.appendChild(span);
        });
        
        // 当元素进入视口时显示文字
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = element.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    });
    
    // 数字递增动画
    const countUpElements = document.querySelectorAll('.count-up');
    
    countUpElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = parseInt(element.getAttribute('data-duration') || '2000', 10);
        const format = element.getAttribute('data-format') || 'number'; // 'number' 或 'currency'
        
        element.textContent = '0';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(element, 0, target, duration, format);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    });
    
    function animateValue(element, start, end, duration, format) {
        let startTimestamp = null;
        
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            
            if (format === 'currency') {
                element.textContent = new Intl.NumberFormat('zh-CN', { 
                    style: 'currency', 
                    currency: 'CNY' 
                }).format(currentValue);
            } else {
                element.textContent = currentValue.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
}

/**
 * 高级音频播放器组件
 */
function initAudioPlayers() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(player => {
        const audio = player.querySelector('audio');
        if (!audio) return;
        
        const playBtn = player.querySelector('.play-btn');
        const pauseBtn = player.querySelector('.pause-btn');
        const progress = player.querySelector('.progress');
        const progressFill = player.querySelector('.progress-fill');
        const currentTime = player.querySelector('.current-time');
        const duration = player.querySelector('.duration');
        const volumeControl = player.querySelector('.volume-control');
        
        // 初始化显示总时长
        audio.addEventListener('loadedmetadata', () => {
            if (duration) {
                duration.textContent = formatTime(audio.duration);
            }
        });
        
        // 播放/暂停按钮
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                audio.play();
                playBtn.style.display = 'none';
                if (pauseBtn) pauseBtn.style.display = 'flex';
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                audio.pause();
                pauseBtn.style.display = 'none';
                if (playBtn) playBtn.style.display = 'flex';
            });
        }
        
        // 进度条更新和拖动
        if (progress && progressFill) {
            audio.addEventListener('timeupdate', () => {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = `${percent}%`;
                
                if (currentTime) {
                    currentTime.textContent = formatTime(audio.currentTime);
                }
            });
            
            progress.addEventListener('click', e => {
                const progressRect = progress.getBoundingClientRect();
                const percent = (e.clientX - progressRect.left) / progressRect.width;
                audio.currentTime = percent * audio.duration;
            });
        }
        
        // 音量控制
        if (volumeControl) {
            volumeControl.addEventListener('input', () => {
                audio.volume = volumeControl.value;
            });
        }
        
        // 播放结束时重置
        audio.addEventListener('ended', () => {
            if (playBtn) playBtn.style.display = 'flex';
            if (pauseBtn) pauseBtn.style.display = 'none';
            
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            
            if (currentTime) {
                currentTime.textContent = '0:00';
            }
        });
    });
    
    // 格式化时间为 mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}

/**
 * 通知系统组件
 * 显示应用通知和提示
 */
function initNotifications() {
    // 检查是否已经存在通知容器
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        // 创建通知容器
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column-reverse;
                gap: 10px;
            }
            
            .notification {
                min-width: 280px;
                max-width: 380px;
                background-color: var(--card-bg);
                border-radius: 12px;
                padding: 16px 20px;
                box-shadow: var(--card-shadow);
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.3s ease, transform 0.3s ease;
                display: flex;
                align-items: flex-start;
                backdrop-filter: blur(10px);
                border: 1px solid var(--border-color);
            }
            
            .notification.active {
                opacity: 1;
                transform: translateX(0);
            }
            
            .notification-icon {
                margin-right: 12px;
                font-size: 20px;
            }
            
            .notification-success .notification-icon {
                color: #22c55e;
            }
            
            .notification-error .notification-icon {
                color: #ef4444;
            }
            
            .notification-warning .notification-icon {
                color: #f59e0b;
            }
            
            .notification-info .notification-icon {
                color: var(--accent-color);
            }
            
            .notification-content {
                flex: 1;
            }
            
            .notification-title {
                font-weight: 600;
                margin-bottom: 4px;
                color: var(--text-primary);
            }
            
            .notification-message {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .notification-close {
                font-size: 16px;
                background: transparent;
                border: none;
                cursor: pointer;
                color: var(--text-tertiary);
                padding: 0;
                margin-left: 10px;
                transition: color 0.2s;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--accent-color);
                border-radius: 0 0 0 12px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 添加全局通知方法
    window.showNotification = function(options) {
        const defaults = {
            title: '',
            message: '',
            type: 'info', // success, error, warning, info
            duration: 5000, // ms
            dismissible: true
        };
        
        const settings = { ...defaults, ...options };
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${settings.type}`;
        
        // 图标
        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        // 通知内容
        notification.innerHTML = `
            <div class="notification-icon">${iconMap[settings.type]}</div>
            <div class="notification-content">
                ${settings.title ? `<div class="notification-title">${settings.title}</div>` : ''}
                ${settings.message ? `<div class="notification-message">${settings.message}</div>` : ''}
            </div>
            ${settings.dismissible ? `<button class="notification-close">&times;</button>` : ''}
            <div class="notification-progress"></div>
        `;
        
        // 添加到容器
        notificationContainer.appendChild(notification);
        
        // 激活通知（用于动画）
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // 设置进度条动画
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${settings.duration}ms linear`;
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 10);
        }
        
        // 关闭按钮
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeNotification(notification);
            });
        }
        
        // 自动关闭
        if (settings.duration > 0) {
            setTimeout(() => {
                closeNotification(notification);
            }, settings.duration);
        }
        
        // 返回通知元素，以便可以手动控制
        return notification;
    };
    
    function closeNotification(notification) {
        notification.classList.remove('active');
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}