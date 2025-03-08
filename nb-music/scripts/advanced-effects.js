/**
 * 高级视觉交互脚本
 * 提供各种高级视觉效果和3D交互功能
 */

// 初始化所有高级效果
document.addEventListener('DOMContentLoaded', function() {
  init3DLogoEffect();
  initParallaxHover();
  initMaterialLighting();
  initDynamicColors();
  initSmoothReveal();
  initFloatingTags();
  initBackgroundShift();
  initTextScramble();
  initMouseGlowEffects();
  initBackToTop();
  initScrollProgress();
  initCustomCursor();
});

/**
 * 实现3D标志视差效果
 */
function init3DLogoEffect() {
  const logo3d = document.querySelector('.logo3d');
  if (!logo3d) return;
  
  const container = logo3d.parentElement;
  
  container.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 旋转角度根据鼠标位置计算，乘以15使效果更显著
    const rotateY = mouseX * 15;
    const rotateX = -mouseY * 15;
    
    // 应用3D变换，使用GSAP以获得更平滑的过渡
    gsap.to(logo3d, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // 为不同层应用不同的位移，增强3D效果
    const layers = logo3d.querySelectorAll('.logo3d-layer');
    layers.forEach((layer, index) => {
      const depth = index + 1;
      const translateX = mouseX * 10 * depth;
      const translateY = mouseY * 10 * depth;
      
      gsap.to(layer, {
        x: translateX,
        y: translateY,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
  
  // 鼠标离开时重置位置
  container.addEventListener('mouseleave', function() {
    gsap.to(logo3d, {
      rotateX: 10,
      rotateY: 15,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
    
    const layers = logo3d.querySelectorAll('.logo3d-layer');
    layers.forEach(layer => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });
  
  // 添加初始化动画
  gsap.from(logo3d, {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)"
  });
}

/**
 * 鼠标悬停视差效果
 * 为UI元素创建视差悬停效果，增强深度感
 */
function initParallaxHover() {
  // 选择所有具有视差效果的元素
  const parallaxItems = document.querySelectorAll('.parallax-hover');
  
  parallaxItems.forEach(item => {
    const layers = item.querySelectorAll('.parallax-layer');
    const strength = item.getAttribute('data-parallax-strength') || 20;
    
    item.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      
      layers.forEach((layer, index) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || index + 1);
        const moveX = mouseX * strength * depth;
        const moveY = mouseY * strength * depth;
        const rotateX = mouseY * 5 * depth;
        const rotateY = -mouseX * 5 * depth;
        
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    item.addEventListener('mouseleave', function() {
      layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
      });
    });
  });
  
  // 为特色卡片添加3D悬停效果
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // 计算鼠标相对位置(0-1)
      const xPos = mouseX / rect.width;
      const yPos = mouseY / rect.height;
      
      // 计算旋转角度，最大旋转5度
      const rotateY = 10 * (0.5 - xPos);
      const rotateX = 10 * (0.5 - yPos);
      
      // 设置卡片的深度旋转
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      
      // 动态调整阴影
      const shadowX = 5 * (0.5 - xPos);
      const shadowY = 5 * (0.5 - yPos);
      this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * 动态光照效果
 * 根据鼠标位置创建动态光照效果
 */
function initMaterialLighting() {
  const lightingElements = document.querySelectorAll('.lighting-effect');
  
  lightingElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      
      // 更新CSS变量
      el.style.setProperty('--mouse-x', `${mouseX}%`);
      el.style.setProperty('--mouse-y', `${mouseY}%`);
      
      // 为子元素添加位移效果
      const children = el.querySelectorAll('.lighting-child');
      children.forEach((child, index) => {
        const depth = parseFloat(child.getAttribute('data-depth') || (index + 1) * 0.2);
        const moveX = (mouseX - 50) * depth;
        const moveY = (mouseY - 50) * depth;
        
        child.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
    
    el.addEventListener('mouseleave', function() {
      const children = el.querySelectorAll('.lighting-child');
      children.forEach(child => {
        child.style.transform = 'translate(0, 0)';
      });
    });
  });
  
  // 动态添加鼠标跟随光效
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const lightGlow = document.createElement('div');
    lightGlow.className = 'mouse-light-glow';
    lightGlow.style.cssText = `
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      filter: blur(40px);
      opacity: 0.6;
      transform: translate(-50%, -50%);
    `;
    heroSection.appendChild(lightGlow);
    
    heroSection.addEventListener('mousemove', function(e) {
      lightGlow.style.left = `${e.clientX}px`;
      lightGlow.style.top = `${e.clientY}px`;
    });
    
    heroSection.addEventListener('mouseleave', function() {
      lightGlow.style.opacity = '0';
    });
    
    heroSection.addEventListener('mouseenter', function() {
      lightGlow.style.opacity = '0.6';
    });
  }
}

/**
 * 动态颜色系统
 * 根据用户交互动态变化颜色
 */
function initDynamicColors() {
  const dynamicElements = document.querySelectorAll('.dynamic-accent');
  
  // 初始色相值
  let hueShift = 0;
  
  // 为具有动态颜色的元素添加交互
  dynamicElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      // 临时改变元素色相
      const randomShift = Math.floor(Math.random() * 40) - 20; // -20到20的随机值
      el.style.setProperty('--accent-shift', randomShift);
    });
    
    el.addEventListener('mouseleave', function() {
      el.style.setProperty('--accent-shift', '0');
    });
  });
  
  // 滚动时渐变色相变化
  window.addEventListener('scroll', function() {
    // 基于滚动位置计算色相偏移
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    hueShift = Math.floor(scrollPercentage * 40) - 20; // -20到20的范围
    
    document.documentElement.style.setProperty('--global-hue-shift', hueShift);
  });
  
  // 添加颜色主题切换按钮动画
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // 添加按钮动画
      this.classList.add('theme-toggle-animation');
      
      // 添加页面过渡效果
      document.body.classList.add('theme-transition');
      
      // 动画结束后移除类
      setTimeout(() => {
        this.classList.remove('theme-toggle-animation');
        document.body.classList.remove('theme-transition');
      }, 1000);
    });
  }
}

/**
 * 平滑元素显示效果
 * 高级版滚动触发动画
 */
function initSmoothReveal() {
  // 检查IntersectionObserver API是否可用
  if (!('IntersectionObserver' in window)) return;
  
  // 创建滚动观察器配置
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  };
  
  // 为每种显示效果类型创建不同的观察器
  const animations = {
    'fade-up': { y: 30, opacity: 0 },
    'fade-down': { y: -30, opacity: 0 },
    'fade-left': { x: -30, opacity: 0 },
    'fade-right': { x: 30, opacity: 0 },
    'zoom-in': { scale: 0.9, opacity: 0 },
    'zoom-out': { scale: 1.1, opacity: 0 },
    'flip-up': { rotateX: 90, opacity: 0 },
    'flip-down': { rotateX: -90, opacity: 0 },
    'flip-left': { rotateY: -90, opacity: 0 },
    'flip-right': { rotateY: 90, opacity: 0 }
  };
  
  // 选择所有动画元素
  const animateElements = document.querySelectorAll('[data-animate]');
  
  // 处理每个元素的动画
  animateElements.forEach(el => {
    // 读取动画类型，默认为fade-up
    const type = el.getAttribute('data-animate') || 'fade-up';
    // 读取延迟时间
    const delay = parseFloat(el.getAttribute('data-delay') || 0) * 1000;
    // 读取动画持续时间
    const duration = parseFloat(el.getAttribute('data-duration') || 0.6) * 1000;
    
    // 设置初始状态
    if (animations[type]) {
      const initialState = animations[type];
      Object.keys(initialState).forEach(key => {
        el.style[key] = initialState[key];
      });
    }
    
    // 创建观察器实例
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 元素进入视口，执行动画
          setTimeout(() => {
            el.style.transition = `all ${duration/1000}s cubic-bezier(0.23, 1, 0.32, 1)`;
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, delay);
          
          // 取消观察
          observer.unobserve(el);
        }
      });
    }, options);
    
    // 开始观察元素
    observer.observe(el);
  });
}

/**
 * 浮动标签效果
 * 为标签添加浮动悬停效果
 */
function initFloatingTags() {
  const tags = document.querySelectorAll('.floating-tag');
  
  tags.forEach((tag, index) => {
    // 为每个标签设置不同的动画延迟
    const delay = index * 0.2;
    tag.style.animationDelay = `${delay}s`;
    
    // 鼠标悬停时暂停动画
    tag.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  });
  
  // 动态创建标签浮动容器
  const createFloatingTagsContainer = () => {
    const sections = document.querySelectorAll('.features, .about');
    
    sections.forEach(section => {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'floating-tags-container';
      tagsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      `;
      
      // 创建随机浮动标签
      const tags = ['音乐', '跨平台', '自由', '歌词', 'B站资源', '开源', '无限制'];
      const tagCount = Math.min(tags.length, 5);
      
      for (let i = 0; i < tagCount; i++) {
        const tag = document.createElement('div');
        tag.className = 'micro-tag';
        tag.textContent = tags[i];
        
        // 随机位置和动画
        const left = Math.random() * 90 + 5; // 5-95%
        const top = Math.random() * 80 + 10; // 10-90%
        const delay = Math.random() * 5; // 0-5s
        const duration = 15 + Math.random() * 10; // 15-25s
        
        tag.style.cssText = `
          position: absolute;
          left: ${left}%;
          top: ${top}%;
          padding: 3px 10px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 20px;
          color: var(--accent-color);
          font-size: 0.8rem;
          pointer-events: auto;
          animation: floatAround ${duration}s ease-in-out infinite alternate;
          animation-delay: ${delay}s;
          opacity: 0.5;
        `;
        
        tagsContainer.appendChild(tag);
      }
      
      section.appendChild(tagsContainer);
    });
  };
  
  // 只在大屏幕设备上创建浮动标签
  if (window.innerWidth > 768) {
    createFloatingTagsContainer();
  }
}

/**
 * 背景动态变换
 * 为背景添加动态变换效果
 */
function initBackgroundShift() {
  // 为主页英雄区添加动态波浪背景
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    const waveCanvas = document.createElement('canvas');
    waveCanvas.className = 'wave-canvas';
    waveCanvas.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30%;
      z-index: 1;
      opacity: 0.2;
    `;
    
    heroSection.appendChild(waveCanvas);
    
    // 初始化波浪动画
    const ctx = waveCanvas.getContext('2d');
    let time = 0;
    let animationFrameId;
    
    // 设置画布尺寸
    function resizeCanvas() {
      waveCanvas.width = heroSection.offsetWidth;
      waveCanvas.height = waveCanvas.offsetHeight;
    }
    
    // 绘制波浪
    function drawWaves() {
      ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
      
      // 绘制两层波浪
      drawWave(ctx, time, 'rgba(99, 102, 241, 0.3)', 1.5, 50);
      drawWave(ctx, time * 0.8, 'rgba(139, 92, 246, 0.2)', 2, 30);
      
      time += 0.005;
      animationFrameId = requestAnimationFrame(drawWaves);
    }
    
    // 单个波浪绘制函数
    function drawWave(ctx, time, color, amplitude, wavelength) {
      ctx.beginPath();
      
      const width = waveCanvas.width;
      const height = waveCanvas.height;
      
      ctx.moveTo(0, height);
      
      // 绘制波浪路径
      for (let x = 0; x <= width; x += 5) {
        const y = Math.sin(x / wavelength + time) * amplitude * 5 + height / 2;
        ctx.lineTo(x, y);
      }
      
      // 完成路径
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      // 填充波浪
      ctx.fillStyle = color;
      ctx.fill();
    }
    
    // 初始化并开始动画
    resizeCanvas();
    drawWaves();
    
    // 窗口调整大小时重新计算
    window.addEventListener('resize', resizeCanvas);
    
    // 当组件不可见时停止动画
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!animationFrameId) {
          drawWaves();
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
    
    observer.observe(heroSection);
  }
  
  // 添加滚动触发的背景色移动效果
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / docHeight) * 100;
    
    // 基于滚动位置更新背景位置
    document.body.style.setProperty('--scroll-percentage', scrollPercentage);
  });
}

/**
 * 文本加扰效果
 * 为标题添加酷炫的文字加扰效果
 */
function initTextScramble() {
  // 只在大屏幕上启用此效果
  if (window.innerWidth < 768) return;
  
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#_____';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // 选择要添加效果的标题
  const elements = document.querySelectorAll('[data-scramble]');
  
  // 为每个元素初始化文本加扰效果
  elements.forEach(el => {
    const originalText = el.textContent;
    const fx = new TextScramble(el);
    
    // 第一次初始化
    setTimeout(() => {
      fx.setText(originalText);
    }, 500);
    
    // 悬停时再次触发效果
    el.addEventListener('mouseenter', () => {
      fx.setText(originalText);
    });
  });
}

/**
 * 鼠标光晕跟随效果
 * 创建跟随鼠标的光晕效果
 */
function initMouseGlowEffects() {
  // 仅在非触摸设备上应用
  if ('ontouchstart' in window || navigator.maxTouchPoints) return;
  
  const createMouseGlow = () => {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow-effect';
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle at center, 
        rgba(99, 102, 241, 0.15) 0%, 
        rgba(99, 102, 241, 0) 70%);
      transform: translate(-50%, -50%);
      z-index: 9998;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(glow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // 平滑跟踪鼠标位置
    const updateGlowPosition = () => {
      // 缓动计算
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      
      requestAnimationFrame(updateGlowPosition);
    };
    
    // 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // 鼠标移动时显示光晕
      glow.style.opacity = '1';
    });
    
    // 鼠标离开页面时隐藏光晕
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
    
    // 启动更新循环
    updateGlowPosition();
  };
  
  // 创建轻量级交互元素
  const enhanceInteractiveElements = () => {
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .credit-badge');
    
    interactiveElements.forEach(el => {
      // 悬停时添加特殊光晕效果
      el.addEventListener('mouseenter', function() {
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const pulseGlow = document.createElement('div');
        pulseGlow.className = 'pulse-glow';
        pulseGlow.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: ${Math.max(rect.width, rect.height) * 1.5}px;
          height: ${Math.max(rect.width, rect.height) * 1.5}px;
          border-radius: 50%;
          background: radial-gradient(circle at center, 
            rgba(99, 102, 241, 0.2) 0%, 
            rgba(99, 102, 241, 0) 70%);
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          z-index: 9997;
          animation: pulseGlowAnim 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(pulseGlow);
        
        // 动画结束后移除元素
        setTimeout(() => {
          pulseGlow.remove();
        }, 1000);
      });
    });
    
    // 添加脉冲动画样式
    if (!document.querySelector('#pulse-glow-style')) {
      const style = document.createElement('style');
      style.id = 'pulse-glow-style';
      style.textContent = `
        @keyframes pulseGlowAnim {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // 初始化光晕效果
  createMouseGlow();
  enhanceInteractiveElements();
}

// 实现回到顶部按钮功能
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  // 显示/隐藏回到顶部按钮
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  // 点击事件
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 初始化滚动进度指示器
function initScrollProgress() {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

/**
 * 自定义鼠标跟随效果 - 完全禁用版本
 * 此功能已被禁用以解决光标问题
 */
function initCustomCursor() {
  // 完全停用自定义光标功能
  console.log("自定义光标功能已禁用");
  
  // 移除任何可能存在的光标元素
  const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-outline, .mouse-glow-effect, .pulse-glow');
  cursorElements.forEach(el => {
    if (el) el.remove();
  });
  
  // 恢复页面默认光标
  document.body.style.cursor = 'auto';
  
  // 恢复所有可点击元素的光标样式
  document.querySelectorAll('a, button, input, .feature-card, .interactive, [role="button"]')
    .forEach(el => el.style.cursor = 'pointer');
}

// 替换原有函数实现
window.initCustomCursor = initCustomCursor;

// 轻量级缓动函数，用于平滑动画
function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}