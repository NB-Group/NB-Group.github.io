/**
 * NB Music - 高级交互效果脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 预加载动画处理
    const preloader = document.querySelector('.preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // 延迟一下再隐藏预加载器，让用户看到100%
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                // 完全移除预加载器
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 400);
        }
        loaderProgress.style.width = `${progress}%`;
    }, 150);
    
    // 自定义鼠标光标效果
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        outline: document.querySelector('.cursor-outline'),
        init: function() {
            // 检查设备是否支持触摸 - 如果是触摸设备则不显示自定义光标
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                this.dot.style.display = 'none';
                this.outline.style.display = 'none';
                return;
            }
            
            this.attachListeners();
            this.hideNativeCursor();
        },
        attachListeners: function() {
            window.addEventListener('mousemove', (e) => {
                // 添加一些鼠标跟随延迟以创造平滑效果
                window.requestAnimationFrame(() => {
                    this.dot.style.left = `${e.clientX}px`;
                    this.dot.style.top = `${e.clientY}px`;
                });
                
                // 轮廓跟随有一点延迟
                setTimeout(() => {
                    this.outline.style.left = `${e.clientX}px`;
                    this.outline.style.top = `${e.clientY}px`;
                }, 80);
            });
            
            document.addEventListener('mousedown', () => {
                document.body.classList.add('cursor-clicked');
            });
            
            document.addEventListener('mouseup', () => {
                document.body.classList.remove('cursor-clicked');
            });
        },
        hideNativeCursor: function() {
            document.body.style.cursor = 'none';
        }
    };
    
    cursor.init();
    
    // 初始化所有效果
    initParallaxEffects();
    initMagneticButtons();
    initTiltEffect();
    initSmoothAppearing();
    initCursorEffect();
    initMaskedBackground();
});

// 性能优化：节流函数
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

/**
 * 高级视差效果
 * 根据滚动位置对元素应用不同的变换
 */
function initParallaxEffects() {
    // 获取所有需要视差效果的元素
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const heroSection = document.querySelector('.hero');
    
    // 如果没有可应用的元素，退出
    if (parallaxElements.length === 0 && !heroSection) return;
    
    // 添加鼠标移动监听来创建视差效果
    document.addEventListener('mousemove', throttle(function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax-speed') || 20;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    }, 30));
    
    // 添加滚动监听器
    window.addEventListener('scroll', throttle(function() {
        // 计算当前滚动位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 对每个视差元素应用变换
        parallaxElements.forEach(el => {
            // 获取自定义属性值，默认为5
            const speed = el.getAttribute('data-scroll-speed') || 5;
            const direction = el.getAttribute('data-scroll-direction') || 'vertical';
            
            if (isElementInViewport(el)) {
                const yPos = -scrollTop / speed;
                const xPos = scrollTop / (speed * 2);
                
                if (direction === 'horizontal') {
                    el.style.transform = `translateX(${xPos}px)`;
                } else if (direction === 'diagonal') {
                    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
                } else {
                    el.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
        
        // 英雄区滚动效果增强
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const heroProgress = Math.min(scrollTop / heroHeight, 1);
            
            // 选择英雄区内的元素
            const heroContent = heroSection.querySelector('.hero-content');
            const heroImage = heroSection.querySelector('.hero-image-container');
            
            if (heroContent && scrollTop <= heroHeight) {
                // 创建3D视差效果
                heroContent.style.transform = `translate3d(0, ${-heroProgress * 120}px, 0) scale(${1 - heroProgress * 0.2})`;
                heroContent.style.opacity = `${1 - heroProgress * 1.5}`;
            }
            
            if (heroImage && scrollTop <= heroHeight * 1.2) {
                // 图片以不同速度移动，创造深度感
                heroImage.style.transform = `translate3d(-50%, ${-heroProgress * 45}vh, 0)`;
                // 添加一些旋转效果
                heroImage.style.transform += ` rotate(${heroProgress * 5}deg)`;
            }
        }
    }, 20));
}

/**
 * 磁性按钮效果
 * 当鼠标靠近按钮时，按钮会轻微向鼠标方向移动
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // 根据鼠标位置移动按钮
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            
            // 添加内部元素的浮动效果
            const inner = this.querySelector('.button-inner');
            if (inner) {
                inner.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
        });
        
        button.addEventListener('mouseleave', function() {
            // 重置位置
            this.style.transform = '';
            const inner = this.querySelector('.button-inner');
            if (inner) {
                inner.style.transform = '';
            }
        });
    });
}

/**
 * 3D倾斜效果
 * 当鼠标在元素上移动时，元素会根据鼠标位置产生3D倾斜效果
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            // 获取元素尺寸和位置
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 计算倾斜角度，最大倾斜度为10度
            const tiltX = ((y / rect.height) * 20 - 10).toFixed(2);
            const tiltY = (((x / rect.width) * 20) - 10).toFixed(2);
            
            // 应用变换
            this.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // 添加光照效果
            const glare = this.querySelector('.tilt-glare');
            if (glare) {
                // 根据鼠标位置更新光照效果
                const glareX = (x / rect.width * 100).toFixed(2);
                const glareY = (y / rect.height * 100).toFixed(2);
                glare.style.backgroundImage = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%, 
                        rgba(255,255,255,0.2) 0%, 
                        rgba(255,255,255,0) 70%
                    )`;
            }
        });
        
        el.addEventListener('mouseleave', function() {
            // 复位变换
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            // 清除光照效果
            const glare = this.querySelector('.tilt-glare');
            if (glare) {
                glare.style.backgroundImage = '';
            }
        });
        
        // 添加光照效果容器（如果不存在）
        if (!el.querySelector('.tilt-glare')) {
            const glareEl = document.createElement('div');
            glareEl.className = 'tilt-glare';
            glareEl.style.position = 'absolute';
            glareEl.style.top = '0';
            glareEl.style.left = '0';
            glareEl.style.right = '0';
            glareEl.style.bottom = '0';
            glareEl.style.pointerEvents = 'none';
            el.appendChild(glareEl);
            
            // 确保父元素有相对定位
            if (getComputedStyle(el).position === 'static') {
                el.style.position = 'relative';
            }
        }
    });
}

/**
 * 平滑出现效果
 * 增强版的滚动触发动画
 */
function initSmoothAppearing() {
    const appearElements = document.querySelectorAll('[data-appear]');
    
    // 添加对具有 .reveal, .reveal-left, .reveal-right, .fade-in 等类名的处理
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in, .fade-up');
    
    // 将所有元素合并到一个数组中处理
    const allAnimateElements = [...appearElements, ...revealElements];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                let delay = 0;
                let duration = 0.5;
                let effect = 'fade-up';
                
                // 获取动画类型和延迟（从data属性或类名）
                if(el.hasAttribute('data-appear')) {
                    effect = el.getAttribute('data-appear-effect') || 'fade-up';
                    delay = parseFloat(el.getAttribute('data-appear-delay') || 0);
                    duration = parseFloat(el.getAttribute('data-appear-duration') || 0.5);
                } else if(el.classList.contains('reveal-left')) {
                    effect = 'fade-left';
                } else if(el.classList.contains('reveal-right')) {
                    effect = 'fade-right';
                } else if(el.classList.contains('fade-in')) {
                    effect = 'fade-in';
                    // 处理延迟类
                    if(el.classList.contains('delay-1')) delay = 0.2;
                    if(el.classList.contains('delay-2')) delay = 0.4;
                    if(el.classList.contains('delay-3')) delay = 0.6;
                    if(el.classList.contains('delay-4')) delay = 0.8;
                }
                
                // 设置初始状态
                if (effect === 'fade-up') {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                } else if (effect === 'fade-left') {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(-30px)';
                } else if (effect === 'fade-right') {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(30px)';
                } else if (effect === 'fade-in') {
                    el.style.opacity = '0';
                }
                
                // 应用动画
                setTimeout(() => {
                    el.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0, 0)';
                    
                    // 添加可见类，兼容现有代码
                    el.classList.add('visible');
                }, delay * 1000);
                
                observer.unobserve(el);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // 提前触发
    });
    
    // 开始观察所有动画元素
    allAnimateElements.forEach(el => observer.observe(el));
}

/**
 * 自定义光标效果
 */
function initCursorEffect() {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    
    // 如果body中已存在这些元素，则不再添加
    if (document.querySelector('.custom-cursor') || 
        document.querySelector('.custom-cursor-follower')) {
        return;
    }
    
    cursor.className = 'custom-cursor';
    follower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--accent-color);
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
        }
        
        .custom-cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid var(--accent-color);
            border-radius: 50%;
            z-index: 9998;
            pointer-events: none;
            transition: transform 0.15s, width 0.4s, height 0.4s, border 0.4s;
            transform: translate(-50%, -50%);
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: var(--accent-color-hover);
        }
        
        a:hover ~ .custom-cursor-follower,
        button:hover ~ .custom-cursor-follower {
            transform: translate(-50%, -50%) scale(0.5);
            border-color: var(--accent-color-hover);
        }
    `;
    document.head.appendChild(style);
    
    // 平滑跟随鼠标
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // 使用 requestAnimationFrame 使跟随光标移动更平滑
        requestAnimationFrame(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // 在移动设备上禁用自定义光标
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

/**
 * 带遮罩的背景效果
 * 创建具有动态遮罩的背景元素
 */
function initMaskedBackground() {
    const maskedBgs = document.querySelectorAll('.masked-bg');
    
    maskedBgs.forEach(el => {
        const pattern = el.getAttribute('data-mask-pattern') || 'dots';
        const color = el.getAttribute('data-mask-color') || 'var(--accent-color)';
        const bgColor = el.getAttribute('data-mask-bg') || 'transparent';
        const size = el.getAttribute('data-mask-size') || '20px';
        
        let maskImage = '';
        
        // 根据模式设置不同的遮罩图案
        switch (pattern) {
            case 'dots':
                maskImage = `radial-gradient(circle, ${color} 2px, transparent 2px)`;
                break;
            case 'lines':
                maskImage = `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color})`;
                break;
            case 'grid':
                maskImage = `
                    linear-gradient(${color} 1px, transparent 1px),
                    linear-gradient(to right, ${color} 1px, transparent 1px)
                `;
                break;
            case 'zigzag':
                // 更复杂的锯齿形图案
                el.style.backgroundImage = `
                    linear-gradient(135deg, ${color} 25%, transparent 25%),
                    linear-gradient(225deg, ${color} 25%, transparent 25%),
                    linear-gradient(45deg, ${color} 25%, transparent 25%),
                    linear-gradient(315deg, ${color} 25%, ${bgColor} 25%)
                `;
                el.style.backgroundSize = `${size} ${size}`;
                return;
        }
        
        // 应用遮罩背景
        el.style.backgroundImage = maskImage;
        el.style.backgroundColor = bgColor;
        el.style.backgroundSize = size;
    });
}

/**
 * 辅助函数：检查元素是否在视口内
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

/**
 * 添加按钮涟漪效果
 * 点击时产生水波纹动画
 */
function addRippleEffect() {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .download-button, .credit-badge');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪元素
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            // 获取按钮的位置信息
            const rect = this.getBoundingClientRect();
            
            // 计算涟漪大小 (取按钮宽高中的较大值)
            const size = Math.max(rect.width, rect.height);
            
            // 设置涟漪的尺寸和位置
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            // 动画完成后移除涟漪元素
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
}

/**
 * 创建视差背景追踪鼠标
 * 背景会根据鼠标位置微微移动，产生3D感
 */
function createParallaxBackground() {
    const sections = document.querySelectorAll('.hero, .features, .experience, .download, .about');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            // 只对大屏幕应用此效果
            if (window.innerWidth < 768) return;
            
            // 计算鼠标位置相对于section中心的偏移
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const moveX = (e.clientX - centerX) / 25; // 移动幅度缩小25倍
            const moveY = (e.clientY - centerY) / 25;
            
            // 获取section中的背景元素
            const bgElements = this.querySelectorAll('.hero-bg-circle, .texture-plus, .geometric-element');
            if (bgElements.length === 0) return;
            
            // 应用不同程度的移动，创造深度感
            bgElements.forEach((el, index) => {
                // 获取或设置深度系数，数值越大移动越明显
                const depth = el.getAttribute('data-depth') || (index + 1) * 0.5;
                const moveFactorX = moveX * depth;
                const moveFactorY = moveY * depth;
                
                // 应用3D变换
                el.style.transform = `translate3d(${moveFactorX}px, ${moveFactorY}px, 0)`;
                el.style.transition = 'transform 0.1s ease-out';
            });
        });
        
        // 鼠标离开section时重置位置
        section.addEventListener('mouseleave', function() {
            const bgElements = this.querySelectorAll('.hero-bg-circle, .texture-plus, .geometric-element');
            bgElements.forEach(el => {
                el.style.transform = 'translate3d(0, 0, 0)';
                el.style.transition = 'transform 0.5s ease-out';
            });
        });
    });
}

/**
 * 图片悬停特效
 * 为图片添加高级悬停效果
 */
function enhanceImageEffects() {
    const images = document.querySelectorAll('.glass-image-wrapper');
    
    images.forEach(img => {
        // 创建高光效果层
        const highlight = document.createElement('div');
        highlight.className = 'image-highlight';
        highlight.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0), rgba(255,255,255,0.15));
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 3;
        `;
        img.appendChild(highlight);
        
        // 添加悬停事件
        img.addEventListener('mouseenter', function() {
            highlight.style.opacity = '1';
            
            // 获取实际图片元素
            const actualImg = this.querySelector('img');
            if (actualImg) {
                actualImg.style.transform = 'scale(1.05)';
                actualImg.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
            }
        });
        
        img.addEventListener('mousemove', function(e) {
            // 获取鼠标在元素内的相对位置
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 更新高光位置
            highlight.style.background = `radial-gradient(
                circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, 
                rgba(255,255,255,0.2), 
                rgba(255,255,255,0) 70%
            )`;
        });
        
        img.addEventListener('mouseleave', function() {
            highlight.style.opacity = '0';
            
            const actualImg = this.querySelector('img');
            if (actualImg) {
                actualImg.style.transform = '';
            }
        });
    });
}

/**
 * 高级滚动进度指示器
 */
function createScrollProgressIndicator() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    // 更新进度条
    function updateProgress() {
        const winScroll = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // 根据滚动进度增加阴影效果
        if (scrolled > 5) {
            progressBar.style.boxShadow = '0 0 10px var(--accent-color)';
        } else {
            progressBar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', throttle(updateProgress, 10));
}

/**
 * 创建粒子效果背景
 * 添加轻量级的粒子动画，增强视觉深度
 */
function createParticleBackground() {
    // 只在大屏幕上运行此效果以节省性能
    if (window.innerWidth < 768) return;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0.5;
        pointer-events: none;
    `;
    
    heroSection.appendChild(canvas);
    
    // 设置画布尺寸
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = heroSection.clientWidth;
        canvas.height = heroSection.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子配置
    const particleCount = 50;
    const particles = [];
    const colors = ['#e0e7ff', '#8b5cf6', '#4f46e5'];
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.5 + 0.1,
            direction: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 更新和绘制粒子
        particles.forEach(p => {
            // 移动粒子
            p.x += Math.cos(p.direction) * p.speed;
            p.y += Math.sin(p.direction) * p.speed;
            
            // 边缘检测和反弹
            if (p.x < 0 || p.x > canvas.width) {
                p.direction = Math.PI - p.direction;
            }
            if (p.y < 0 || p.y > canvas.height) {
                p.direction = -p.direction;
            }
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
        });
        
        // 连接附近的粒子
        connectParticles(ctx, particles);
    }
    
    // 开始动画
    animate();
}

/**
 * 辅助函数：连接粒子
 */
function connectParticles(ctx, particles) {
    const maxDistance = 100;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            
            // 计算粒子间距离
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 如果距离小于阈值，则连接它们
            if (distance < maxDistance) {
                const opacity = 1 - (distance / maxDistance);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary');
                ctx.globalAlpha = opacity * 0.2;
                ctx.stroke();
            }
        }
    }
}

/**
 * 按钮悬停浮动效果强化
 */
function enhanceButtonHoverEffects() {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .download-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('button-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('button-hover');
            
            // 添加"浮回"动画
            this.classList.add('button-float-back');
            setTimeout(() => {
                this.classList.remove('button-float-back');
            }, 300);
        });
    });
    
    // 添加按钮悬停样式
    const style = document.createElement('style');
    style.textContent = `
        .button-hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        .button-float-back {
            animation: buttonFloatBack 0.3s forwards;
        }
        
        @keyframes buttonFloatBack {
            from { transform: translateY(-8px) scale(1.02); }
            to { transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 高级图片延迟加载效果
 */
function enhancedLazyLoading() {
    const imagesToLoad = document.querySelectorAll('img[data-src]');
    if (imagesToLoad.length === 0) return;
    
    const imgOptions = {
        threshold: 0,
        rootMargin: '0px 0px 200px 0px' // 提前200px加载
    };
    
    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // 创建图片加载的占位效果
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.2) 50%, 
                rgba(255,255,255,0.1) 100%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
            z-index: 1;
        `;
        
        // 如果父元素不是相对定位，则设置相对定位
        const parent = img.parentElement;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        
        parent.appendChild(placeholder);
        
        // 加载实际图片
        const actualImage = new Image();
        actualImage.onload = () => {
            img.src = src;
            img.classList.add('loaded-img');
            
            // 图片加载完成后淡出占位符
            placeholder.style.opacity = '0';
            setTimeout(() => {
                placeholder.remove();
            }, 500);
        };
        actualImage.src = src;
    };
    
    // IntersectionObserver API
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        });
    }, imgOptions);
    
    // 观察所有待加载图片
    imagesToLoad.forEach(img => {
        imgObserver.observe(img);
    });
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        .loaded-img {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 创建页面元素的交互感知能力
 */
function createInteractionAwareness() {
    const interactiveElements = document.querySelectorAll('.feature-card, .glass-card, .credit-badge');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // 让兄弟元素变暗，突出当前元素
            const siblings = Array.from(this.parentElement.children).filter(child => child !== this);
            
            siblings.forEach(sibling => {
                sibling.style.opacity = '0.7';
                sibling.style.transform = 'scale(0.97)';
                sibling.style.filter = 'grayscale(20%)';
                sibling.style.transition = 'all 0.4s ease';
            });
            
            // 当前元素突出显示
            this.style.transform = 'scale(1.03) translateY(-5px)';
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
            this.style.zIndex = '10';
        });
        
        el.addEventListener('mouseleave', function() {
            // 恢复兄弟元素
            const siblings = Array.from(this.parentElement.children);
            
            siblings.forEach(sibling => {
                sibling.style.opacity = '';
                sibling.style.transform = '';
                sibling.style.filter = '';
            });
            
            // 恢复当前元素
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });
}

/**
 * 初始化所有效果
 */
function initAllEffects() {
    // 初始化基本效果
    addRippleEffect();
    createParallaxBackground();
    enhanceImageEffects();
    createScrollProgressIndicator();
    enhanceButtonHoverEffects();
    enhancedLazyLoading();
    createInteractionAwareness();
    
    // 初始化高级效果（条件性启用）
    if (window.innerWidth > 768) {
        createParticleBackground();
    }
    
    // 添加固定的动态光晕到关键位置
    addDynamicGlow();
    
    // 初始化性能监控
    if (window.DEBUG) {
        initPerformanceMonitoring();
    }
}

/**
 * 添加动态光晕效果到关键区域
 */
function addDynamicGlow() {
    const glowPositions = [
        { x: '20%', y: '20%', section: '.hero' },
        { x: '80%', y: '50%', section: '.features' },
        { x: '30%', y: '70%', section: '.experience' },
        { x: '60%', y: '40%', section: '.about' }
    ];
    
    glowPositions.forEach(pos => {
        const section = document.querySelector(pos.section);
        if (!section) return;
        
        const glow = document.createElement('div');
        glow.className = 'dynamic-glow';
        glow.style.left = pos.x;
        glow.style.top = pos.y;
        
        section.appendChild(glow);
    });
}

/**
 * 性能监控（调试模式）
 */
function initPerformanceMonitoring() {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let totalFrameTime = 0;
    
    // 创建性能指示器
    const perfDiv = document.createElement('div');
    perfDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.7);
        color: #4ade80;
        padding: 5px 10px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
    `;
    document.body.appendChild(perfDiv);
    
    // 帧率计算
    function updateFPS() {
        const now = performance.now();
        const frameDelta = now - lastFrameTime;
        lastFrameTime = now;
        
        frameCount++;
        totalFrameTime += frameDelta;
        
        if (frameCount >= 30) { // 每30帧更新一次
            const avgFrameTime = totalFrameTime / frameCount;
            const fps = Math.round(1000 / avgFrameTime);
            
            let color;
            if (fps >= 55) color = '#4ade80'; // 绿色
            else if (fps >= 30) color = '#fbbf24'; // 黄色
            else color = '#ef4444'; // 红色
            
            perfDiv.innerHTML = `FPS: <span style="color:${color}">${fps}</span>`;
            perfDiv.title = `平均帧时间: ${avgFrameTime.toFixed(2)}ms`;
            
            frameCount = 0;
            totalFrameTime = 0;
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    updateFPS();
}

// 启动所有效果
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAllEffects, 500); // 页面加载后稍微延迟，确保DOM完全准备好
});

// 响应式设计优化
window.addEventListener('resize', throttle(function() {
    // 如果屏幕宽度变化超过一定阈值，刷新页面以获得最佳体验
    const width = window.innerWidth;
    if (!window.lastWidth) {
        window.lastWidth = width;
    } else if (Math.abs(window.lastWidth - width) > 200) {
        window.lastWidth = width;
        
        // 根据设备性能调整效果
        if (width < 768) {
            // 在小屏幕上禁用一些高消耗效果
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
}, 500));
