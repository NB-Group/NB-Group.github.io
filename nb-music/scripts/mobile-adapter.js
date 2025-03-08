/**
 * 移动端适配脚本
 * 优化触摸屏体验和性能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 768;
    
    // 检测是否为触摸屏设备
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 ||
                         navigator.msMaxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        enableMobileOptimizations();
    }
    
    // 添加方向变化监听
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // 为所有按钮添加Active状态，提升触摸反馈
    enhanceTouchFeedback();
});

/**
 * 启用移动端性能和交互优化
 */
function enableMobileOptimizations() {
    // 添加移动端类，用于CSS选择器定位
    document.documentElement.classList.add('mobile-device');
    
    // 禁用重量级动画效果
    disableHeavyAnimations();
    
    // 简化DOM，移除非关键元素
    simplifyDOM();
    
    // 图片延迟加载优化
    optimizeLazyLoading();
    
    // 替换视频为静态图像（如果存在）
    replaceVideosWithImages();
    
    // 优化触摸交互
    optimizeTouchInteractions();
    
    // 禁用某些悬停效果
    disableHoverEffects();

    // 添加页面快速滚动功能
    enableFastScroll();
    
    // 特殊处理下载区域
    optimizeDownloadSection();
    
    console.log('移动端优化已启用');
}

/**
 * 处理设备方向变化
 */
function handleOrientationChange() {
    // 获取新的方向
    const isLandscape = window.innerWidth > window.innerHeight;
    
    // 根据方向调整UI
    if (isLandscape) {
        document.documentElement.classList.add('landscape');
        document.documentElement.classList.remove('portrait');
        
        // 在横屏模式下优化重要内容可见性
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '100vh';
            hero.style.height = 'auto';
        }
    } else {
        document.documentElement.classList.add('portrait');
        document.documentElement.classList.remove('landscape');
        
        // 恢复竖屏布局
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '100vh';
        }
    }
    
    // 重新计算关键元素位置和尺寸
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 300);
}

/**
 * 禁用耗性能的重量级动画
 */
function disableHeavyAnimations() {
    // 移除或简化重量级动画类
    const animatedElements = document.querySelectorAll(
        '.parallax-bg, .dynamic-glow, .floating-notes, .texture-container, .wave-texture'
    );
    
    animatedElements.forEach(el => {
        // 移除动画类
        el.style.animation = 'none';
        el.style.transform = 'none';
        
        // 简化背景
        if (el.classList.contains('parallax-bg')) {
            el.style.backgroundAttachment = 'scroll';
            el.style.opacity = '0.2'; // 降低不必要背景的显著性
        }
        
        // 隐藏非核心装饰元素
        if (el.classList.contains('floating-notes') || 
            el.classList.contains('texture-container')) {
            el.style.display = 'none';
        }
    });
    
    // 简化滚动动画效果
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in').forEach(el => {
        el.classList.add('visible');
        el.style.transform = 'none';
        el.style.opacity = '1';
        el.style.transition = 'none';
    });
}

/**
 * 简化DOM结构，减少不必要元素
 */
function simplifyDOM() {
    // 移除纯装饰性元素
    const decorativeElements = document.querySelectorAll(
        '.geo-2, .geo-3, .texture-plus, .mouse-light-glow, .decorative-line'
    );
    
    decorativeElements.forEach(el => {
        el.parentNode.removeChild(el);
    });
    
    // 简化一些复杂结构
    document.querySelectorAll('.ultra-card').forEach(card => {
        card.classList.remove('ultra-card');
        card.classList.add('simple-card');
    });
}

/**
 * 图片延迟加载优化
 */
function optimizeLazyLoading() {
    // 选择所有图片
    const images = document.querySelectorAll('img[data-src]');
    
    // 为关键图片立即加载（前几个可视图片）
    let visibleCount = 0;
    images.forEach(img => {
        if (isElementInViewport(img) && visibleCount < 3) {
            loadImage(img);
            visibleCount++;
        }
    });
    
    // 降低其他图片质量或延迟更久
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    }
    
    // 优化懒加载阈值，使图片提前加载
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px 300px 0px', // 提前300px加载，防止滚动过快看到空白
        threshold: 0.01
    });
    
    // 监视所有待加载图片
    images.forEach(img => {
        if (img.hasAttribute('data-src')) {
            imgObserver.observe(img);
        }
    });
}

/**
 * 将视频替换为静态图片
 */
function replaceVideosWithImages() {
    document.querySelectorAll('video').forEach(video => {
        // 检查是否有替代图片
        const posterSrc = video.getAttribute('poster');
        if (posterSrc) {
            // 创建替代图片
            const img = document.createElement('img');
            img.src = posterSrc;
            img.alt = "视频预览";
            img.classList.add('video-replacement');
            
            // 添加播放图标指示这是视频
            const playIcon = document.createElement('div');
            playIcon.className = 'play-icon';
            playIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)"/>
                    <path d="M10 8l6 4-6 4V8z" fill="white"/>
                </svg>
            `;
            
            // 添加父容器
            const container = document.createElement('div');
            container.className = 'video-container';
            container.appendChild(img);
            container.appendChild(playIcon);
            
            // 替换视频
            video.parentNode.replaceChild(container, video);
            
            // 点击时加载视频
            container.addEventListener('click', function() {
                // 恢复视频
                container.parentNode.replaceChild(video, container);
                // 播放视频
                video.play();
            });
        }
    });
}

/**
 * 优化触摸交互
 */
function optimizeTouchInteractions() {
    // 增大点击目标区域
    document.querySelectorAll('a, button, .nav-links li, .interactive').forEach(el => {
        // 检查元素大小，如果太小就增加内边距
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            el.style.minWidth = '44px';
            el.style.minHeight = '44px';
        }
    });
    
    // 优化页面滚动
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
    
    // 减少触摸延迟
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(meta);
    
    // 优化轻触反馈
    document.addEventListener('touchstart', function(){}, {passive: true});
}

/**
 * 禁用悬停效果
 */
function disableHoverEffects() {
    // 移除所有:hover相关样式，替换为active状态
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            /* 禁用所有悬停效果 */
            .feature-card:hover,
            .interactive:hover,
            .primary-button:hover,
            .secondary-button:hover,
            .download-option:hover,
            a:hover {
                transform: none !important;
                box-shadow: none !important;
            }
            
            /* 使用:active替代:hover */
            .feature-card:active,
            .interactive:active,
            .primary-button:active,
            .secondary-button:active,
            .download-option:active {
                transform: scale(0.98) !important;
                opacity: 0.9 !important;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 增强触摸反馈
 */
function enhanceTouchFeedback() {
    document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, {passive: true});
    });
    
    // 添加触摸反馈样式
    const style = document.createElement('style');
    style.textContent = `
        .touch-active {
            transform: scale(0.97) !important;
            opacity: 0.8 !important;
            transition: transform 0.1s, opacity 0.1s !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 添加页面快速滚动功能
 */
function enableFastScroll() {
    // 创建快速导航按钮
    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav';
    quickNav.innerHTML = `
        <button class="quick-nav-btn" data-target="top">↑</button>
        <button class="quick-nav-btn" data-target="features">特点</button>
        <button class="quick-nav-btn" data-target="download">下载</button>
        <button class="quick-nav-btn" data-target="about">关于</button>
    `;
    
    // 样式
    quickNav.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        padding: 8px;
        background: var(--glass-bg);
        border-radius: 30px;
        backdrop-filter: blur(10px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        border: 1px solid var(--border-color);
    `;
    
    // 按钮样式
    const btnStyle = document.createElement('style');
    btnStyle.textContent = `
        .quick-nav-btn {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .quick-nav-btn[data-target="top"] {
            background: var(--gradient-primary);
            color: white;
        }
    `;
    
    document.head.appendChild(btnStyle);
    document.body.appendChild(quickNav);
    
    // 添加点击事件
    quickNav.querySelectorAll('.quick-nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            if (target === 'top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 滚动时隐藏快速导航
    let lastScrollTop = 0;
    let isQuickNavVisible = true;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动时隐藏，向上滚动时显示
        if (scrollTop > lastScrollTop && isQuickNavVisible) {
            quickNav.style.transform = 'translate(-50%, 100px)';
            isQuickNavVisible = false;
        } else if (scrollTop < lastScrollTop && !isQuickNavVisible) {
            quickNav.style.transform = 'translate(-50%, 0)';
            isQuickNavVisible = true;
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * 为下载区域添加专门的优化
 */
function optimizeDownloadSection() {
    const downloadSection = document.querySelector('#download');
    if (!downloadSection) return;
    
    // 1. 添加触摸友好的下载提示
    const downloadOptions = downloadSection.querySelector('.download-options');
    if (downloadOptions) {
        // 检测设备类型以显示相关的下载选项
        const userAgent = navigator.userAgent.toLowerCase();
        const isAndroid = userAgent.indexOf("android") > -1;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isWindows = userAgent.indexOf("windows") > -1;
        const isMac = userAgent.indexOf("mac") > -1 && !isIOS;
        const isLinux = userAgent.indexOf("linux") > -1 && !isAndroid;
        
        // 根据设备类型突出显示合适的下载选项
        if (downloadOptions.children.length > 0) {
            Array.from(downloadOptions.children).forEach(option => {
                // 移除所有突出显示
                option.classList.remove('recommended');
                
                // 根据设备类型添加推荐标记
                if ((isAndroid && option.classList.contains('android')) ||
                    (isIOS && option.classList.contains('mac')) ||
                    (isWindows && option.classList.contains('windows')) ||
                    (isMac && option.classList.contains('mac')) ||
                    (isLinux && option.classList.contains('linux'))) {
                    
                    option.classList.add('recommended');
                    
                    // 添加推荐标签
                    if (!option.querySelector('.recommended-tag')) {
                        const recommendTag = document.createElement('div');
                        recommendTag.className = 'recommended-tag';
                        recommendTag.textContent = '推荐';
                        option.appendChild(recommendTag);
                    }
                }
                
                // 如果是移动设备，给对应的选项添加不支持提示
                if ((isAndroid || isIOS) && 
                    (option.classList.contains('windows') || 
                     option.classList.contains('linux') ||
                     option.classList.contains('mac'))) {
                    
                    option.classList.add('not-supported');
                    
                    // 添加移动设备提示
                    const mobileText = document.createElement('div');
                    mobileText.className = 'mobile-device-note';
                    mobileText.textContent = '请在电脑上下载';
                    
                    // 替换下载按钮内容
                    option.innerHTML = '';
                    option.appendChild(mobileText);
                }
            });
        }
        
        // 2. 为移动设备添加特殊提示
        if (isAndroid || isIOS) {
            const mobileNote = document.createElement('div');
            mobileNote.className = 'mobile-download-note';
            mobileNote.innerHTML = `
                <div class="info-icon">ℹ️</div>
                <p>检测到您正在使用移动设备，请使用电脑下载应用程序。</p>
            `;
            
            // 添加样式
            mobileNote.style.cssText = `
                background: var(--bg-secondary);
                border-radius: 12px;
                padding: 12px 16px;
                margin: 20px 0;
                display: flex;
                align-items: center;
                border: 1px solid var(--border-color);
            `;
            
            downloadOptions.parentNode.insertBefore(mobileNote, downloadOptions);
        }
    }
    
    // 3. 优化3D Logo效果
    const logo3d = downloadSection.querySelector('.logo3d');
    if (logo3d) {
        // 简化3D效果，减少性能消耗
        logo3d.style.transform = 'rotateX(5deg) rotateY(10deg)';
        
        // 移除可能导致滚动不流畅的事件监听器
        const clone = logo3d.cloneNode(true);
        logo3d.parentNode.replaceChild(clone, logo3d);
    }
    
    // 4. 添加操作系统检测并自动滚动到相应的下载选项
    if (downloadOptions) {
        const userAgent = navigator.userAgent.toLowerCase();
        let targetOS = null;
        
        if (userAgent.indexOf("windows") > -1) targetOS = "windows";
        else if (userAgent.indexOf("mac") > -1) targetOS = "mac";
        else if (userAgent.indexOf("linux") > -1) targetOS = "linux";
        
        if (targetOS) {
            const targetOption = downloadOptions.querySelector(`.${targetOS}`);
            if (targetOption) {
                // 添加一点延迟，确保页面已经完全加载
                setTimeout(() => {
                    targetOption.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // 添加突出高亮
                    targetOption.classList.add('highlight-option');
                    setTimeout(() => {
                        targetOption.classList.remove('highlight-option');
                    }, 2000);
                }, 1000);
            }
        }
    }
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
