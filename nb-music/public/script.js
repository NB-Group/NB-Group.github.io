// window.addEventListener("keydown", (e) => {
//     if (e.key == "F12") {
//         ipcRenderer.send("open-dev-tools");
//     }
// });
// // 窗口控制按钮
// document.getElementById("minimize").addEventListener("click", () => {
//     ipcRenderer.send("window-minimize");
// });

// document.getElementById("maximize").addEventListener("click", () => {
//     ipcRenderer.send("window-maximize");
// });

// document.getElementById("close").addEventListener("click", () => {
//     ipcRenderer.send("window-close");
// });

// ipcRenderer.on("window-state-changed", (event, maximized) => {
//     this.isMaximized = maximized;
//     if (this.isMaximized) {
//         this.minimizeBtn.innerHTML = `<svg version="1.1" width="12" height="12" viewBox="0,0,37.65105,35.84556" style="margin-top:1px;"><g transform="translate(-221.17804,-161.33903)"><g style="stroke:var(--text);" data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" fill-rule="nonzero" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"><path d="M224.68734,195.6846c-2.07955,-2.10903 -2.00902,-6.3576 -2.00902,-6.3576l0,-13.72831c0,0 -0.23986,-1.64534 2.00902,-4.69202c1.97975,-2.68208 4.91067,-2.00902 4.91067,-2.00902h14.06315c0,0 3.77086,-0.23314 5.80411,1.67418c2.03325,1.90732 1.33935,5.02685 1.33935,5.02685v13.39347c0,0 0.74377,4.01543 -1.33935,6.3576c-2.08312,2.34217 -5.80411,1.67418 -5.80411,1.67418h-13.39347c0,0 -3.50079,0.76968 -5.58035,-1.33935z"></path><path d="M229.7952,162.85325h16.06111c0,0 5.96092,-0.36854 9.17505,2.64653c3.21412,3.01506 2.11723,7.94638 2.11723,7.94638v18.55642"></path></g></g></svg>`;
//     } else {
//         this.minimizeBtn.innerHTML = '<i class="bi bi-app"></i>';
//     }
// });

// 音频进度条
// document.addEventListener("timeupdate", () => {
//     const progress = (this.audioPlayer.audio.currentTime / this.audioPlayer.audio.duration) * 100;
//     document.querySelector(".player .control .progress .progress-bar .progress-bar-inner").style.width = progress + "%";
// });

// 进度条点击
document.querySelector(".player .control .progress .progress-bar").addEventListener("click", (event) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const progress = (clickPosition / progressBarWidth) * this.audioPlayer.audio.duration;
    this.audioPlayer.audio.currentTime = progress;
});

// 侧边栏点击事件
document.addEventListener("click", (event) => {
    if (!event.target.closest(".sidebar") && !event.target.closest(".dock.sidebar")) {
        document.querySelector(".sidebar").classList.add("hide");
    }
});

document.querySelector(".sidebar").addEventListener("mouseover", () => {
    document.querySelector(".sidebar").classList.remove("hide");
});

// 列表焦点效果
document.querySelectorAll("#function-list").forEach((list) => {
    list.addEventListener("click", (e) => {
        const clickedItem = e.target.closest("a");
        if (!clickedItem) return;

        const spanFocs = list.querySelector("span.focs");
        if (!spanFocs) return;

        // 移除之前的所有选中状态
        list.querySelectorAll("a").forEach((a) => a.classList.remove("check"));
        // 添加新的选中状态
        clickedItem.classList.add("check");

        // 显示焦点指示器
        spanFocs.style.display = "block";
        spanFocs.classList.add("moving");

        // 设置位置 - 不再使用 transform，直接设置 top
        if (spanFocs.dataset.type === "abs") {
            spanFocs.style.top = clickedItem.offsetTop + 10 + "px";
        } else {
            spanFocs.style.top = clickedItem.offsetTop + 10 + "px";
            spanFocs.style.left = clickedItem.offsetLeft + 10 + "px";
        }

        setTimeout(() => {
            spanFocs.classList.remove("moving");
        }, 300);
    });
});

// 搜索输入框事件
document.querySelector(".search input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        this.handleSearch(event);
    }
});

document.querySelectorAll('nav').forEach(nav => {
    // 生成唯一标识
    const navId = nav.dataset.navId || `nav-${Math.random().toString(36).slice(2, 6)}`;
    nav.dataset.navId = navId;

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // 检查浏览器是否支持 View Transitions API
            if (!document.startViewTransition) {
                console.warn('Browser does not support View Transitions API');
                // 降级处理
                const activeLink = nav.querySelector('.active');
                activeLink?.classList.remove('active');
                link.classList.add('active');
                return;
            }

            // 避免重复点击
            if (link.classList.contains('active')) return;

            const activeLink = nav.querySelector('.active');

            try {
                // 设置动态 view-transition-name
                if (activeLink) {
                    activeLink.style.viewTransitionName = `${navId}-old`;
                }
                link.style.viewTransitionName = `${navId}-new`;

                const transition = document.startViewTransition(() => {
                    activeLink?.classList.remove('active');
                    link.classList.add('active');
                });

                // 等待过渡完成
                await transition.finished;
            } catch (error) {
                console.error('View transition failed:', error);
            } finally {
                // 清理 view-transition-name
                if (activeLink) {
                    activeLink.style.viewTransitionName = '';
                }
                link.style.viewTransitionName = '';
            }
        });
    });
});
document.querySelector(".listname .controls .rename").addEventListener("click", (e) => {
    e.stopPropagation();
    this.playlistManager.renamePlaylist();
});