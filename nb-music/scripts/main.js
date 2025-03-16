document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.getElementById('theme-toggle-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储中的主题设置或系统偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // 主题切换按钮点击事件
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const nav = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 滚动动画
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    checkReveal();
    
    // 滚动时检查
    window.addEventListener('scroll', checkReveal);
    
    // Safari 视差修复
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        document.querySelector('.parallax-bg').style.backgroundAttachment = 'scroll';
    }
    
    // 鼠标悬停效果增强
    const hoverElements = document.querySelectorAll('.feature-card, .primary-button, .secondary-button, .download-button');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 图片懒加载
    const images = document.querySelectorAll('img');
    const imgOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
        });
    }, imgOptions);
    
    images.forEach(image => {
        const src = image.src;
        if (src) {
            image.setAttribute('data-src', src);
            image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            imgObserver.observe(image);
        }
    });
    
    // 性能优化：节流滚动事件
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    window.addEventListener('scroll', throttle(function() {
        // 滚动事件处理
        checkReveal();
    }, 100));
    
    // GitHub风格的滚动覆盖效果 - 优化版，修复抽搐问题
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');
    
    // 如果英雄区元素存在
    if (heroSection && heroContent && heroImage) {
        // 初始状态，使用CSS变量存储当前变换状态
        document.documentElement.style.setProperty('--hero-content-y', '0px');
        document.documentElement.style.setProperty('--hero-content-opacity', '1');
        document.documentElement.style.setProperty('--hero-image-y', '0vh');
        document.documentElement.style.setProperty('--hero-image-rotation', '0deg');
        
        // 声明一个变量，用以记录上次的滚动位置
        let lastScrollPosition = 0;
        
        // 优化的滚动处理函数 - 使用requestAnimationFrame
        function handleHeroScroll() {
            // 只在滚动位置实际变化时更新
            if (window.scrollY !== lastScrollPosition) {
                lastScrollPosition = window.scrollY;
                
                const heroHeight = heroSection.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // 使用更平滑的缓动公式
                const scrollProgress = Math.max(0, Math.min(window.scrollY / (viewportHeight * 0.6), 1));
                
                // 使用 CSS 变量而不是直接操作 style，可以减少重排
                document.documentElement.style.setProperty('--hero-content-y', `${-scrollProgress * 100}px`);
                document.documentElement.style.setProperty('--hero-content-opacity', `${1 - scrollProgress * 1.5}`);
                document.documentElement.style.setProperty('--hero-content-scale', `${1 - scrollProgress * 0.2}`);
                
                // 只在英雄区可见时应用图片变换
                if (window.scrollY <= heroHeight) {
                    document.documentElement.style.setProperty('--hero-image-y', `${-scrollProgress * 45}vh`);
                    document.documentElement.style.setProperty('--hero-image-rotation', `${scrollProgress * 5}deg`);
                }
            }
            
            requestAnimationFrame(handleHeroScroll);
        }
        
        // 启动平滑动画循环
        requestAnimationFrame(handleHeroScroll);
    }

    // 优化性能的节流函数
    function throttle(func, limit) {
        let lastCall = 0;
        return function() {
            const now = Date.now();
            if (now - lastCall >= limit) {
                func.apply(this, arguments);
                lastCall = now;
            }
        };
    }

    // 滚动动画 - 增强版
    function initRevealElements() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-up');
        
        function checkReveal() {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('visible');
                }
            });
        }
        
        // 初始检查
        checkReveal();
        
        // 滚动时检查
        window.addEventListener('scroll', throttle(checkReveal, 100));
    }
    
    // 确保动画初始化在页面完全加载后执行
    window.addEventListener('load', function() {
        // 初始化滚动动画
        initRevealElements();
        
        // 如果存在预加载器，等待其消失后再重新检查一次
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(function() {
                initRevealElements(); // 重新检查一次
            }, 1000); // 给预加载器一些消失的时间
        }
        
        // 在1秒后重新检查一次，处理可能的动画未触发情况
        setTimeout(function() {
            const uncheckedElements = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .fade-up:not(.visible)');
            uncheckedElements.forEach(element => {
                element.classList.add('visible');
            });
        }, 1500);
    });
});
