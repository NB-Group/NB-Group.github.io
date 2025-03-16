/**
 * NB Music - 网站视觉效果脚本
 * 包含多种常规视觉效果和动画
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化磁性按钮效果
    initMagneticButtons();
    
    // 初始化平滑滚动
    initSmoothScrolling();
    
    // 初始化视差效果
    initParallaxEffects();
    
    // 初始化悬停效果
    initHoverEffects();
    
    // 初始化加载动画
    initLoadingAnimations();
});

/**
 * 磁性按钮效果 - 鼠标靠近时有吸引效果
 */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const btnRect = this.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            
            // 计算鼠标与按钮中心的距离
            const deltaX = e.clientX - btnCenterX;
            const deltaY = e.clientY - btnCenterY;
            
            // 设置最大位移距离（像素）
            const maxMove = 10;
            
            // 基于鼠标位置计算位移，有限制
            const moveX = (deltaX / btnRect.width) * maxMove;
            const moveY = (deltaY / btnRect.height) * maxMove;
            
            // 应用变换
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            // 鼠标离开时恢复原位置，添加平滑过渡
            this.style.transition = 'transform 0.3s ease-out';
            this.style.transform = 'translate(0, 0)';
            
            // 过渡完成后移除过渡属性
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
    });
}

/**
 * 平滑滚动实现
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 更新URL，但不触发页面跳转
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * 视差滚动效果
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const depth = element.getAttribute('data-depth') || 0.2;
            const movement = scrollY * depth;
            
            // 使用transform而不是top，以获得更好的性能
            element.style.transform = `translateY(${movement}px)`;
        });
    });
    
    // 应用鼠标移动视差效果
    const parallaxContainers = document.querySelectorAll('.parallax-hover');
    
    parallaxContainers.forEach(container => {
        const layers = container.querySelectorAll('.parallax-layer');
        
        container.addEventListener('mousemove', function(e) {
            const containerRect = container.getBoundingClientRect();
            
            // 计算鼠标在容器内的相对位置 (0 ~ 1)
            const relX = (e.clientX - containerRect.left) / containerRect.width;
            const relY = (e.clientY - containerRect.top) / containerRect.height;
            
            // 从容器中心点计算偏移 (-0.5 ~ 0.5)
            const offsetX = relX - 0.5;
            const offsetY = relY - 0.5;
            
            // 为每一层应用不同程度的变换
            layers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.2;
                const moveX = offsetX * 30 * depth;
                const moveY = offsetY * 30 * depth;
                const rotate = Math.max(-3, Math.min(3, (offsetX * 5)));
                
                // 设置3D变换
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg)`;
            });
        });
        
        // 鼠标离开时重置位置
        container.addEventListener('mouseleave', function() {
            layers.forEach(layer => {
                layer.style.transition = 'transform 0.5s ease-out';
                layer.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
                
                setTimeout(() => {
                    layer.style.transition = '';
                }, 500);
            });
        });
    });
}

/**
 * 悬停效果
 */
function initHoverEffects() {
    // 发光效果
    const glowElements = document.querySelectorAll('.lighting-effect');
    
    glowElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // 计算相对位置
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 设置光照位置
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });
    
    // 3D傾斜效果
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // 计算鼠标在元素上的相对位置 (-1 ~ 1)
            const xRel = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const yRel = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            
            // 设置最大旋转角度
            const maxDeg = 10;
            
            // 计算旋转角度
            const rotateY = -xRel * maxDeg;
            const rotateX = yRel * maxDeg;
            
            // 应用3D变换
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // 添加阴影效果
            const shadowX = xRel * 10;
            const shadowY = -yRel * 10;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2)`;
        });
        
        // 重置效果
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

/**
 * 加载动画
 */
function initLoadingAnimations() {
    // 添加页面预加载动画处理
    const preloader = document.querySelector('.preloader');
    
    // 确保有预加载器并且页面已完全加载
    if (preloader) {
        window.addEventListener('load', function() {
            // 逐渐隐藏预加载动画
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
    
    // 初始化加载进度动画
    const progressBar = document.querySelector('.loader-progress');
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            
            progressBar.style.width = `${progress}%`;
        }, 200);
    }
}
