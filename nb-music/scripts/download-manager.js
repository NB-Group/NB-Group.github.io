/**
 * NB Music 下载管理器
 * 自动从GitHub获取最新版本并更新下载链接
 */
document.addEventListener('DOMContentLoaded', function() {
    // GitHub仓库信息
    const REPO_OWNER = 'NB-Group';
    const REPO_NAME = 'NB_Music';
    const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
    const PROXY_URL = 'https://github.proxy.class3.fun/';

    // 文件匹配规则
    const FILE_PATTERNS = {
        windows: ['-win-x64.exe', '-Setup.exe', 'win.exe', 'windows.exe'],
        mac: ['.dmg', 'darwin', 'mac.zip'],
        linux: ['.AppImage', '.deb', 'linux', 'amd64.tar.gz']
    };

    // 获取下载按钮
    const downloadButtons = document.querySelectorAll('.download-option[data-os]');
    
    // 获取版本标签元素
    const versionLabels = document.querySelectorAll('.version-label');

    // 显示加载状态
    function showLoading() {
        downloadButtons.forEach(button => {
            button.classList.add('loading');
            const versionLabel = button.querySelector('.version-label');
            versionLabel.textContent = '加载中...';
        });
    }

    // 显示错误状态
    function showError() {
        downloadButtons.forEach(button => {
            button.classList.remove('loading');
            button.classList.add('error');
            const versionLabel = button.querySelector('.version-label');
            versionLabel.textContent = '获取失败';
        });
    }

    // 更新下载链接和版本信息
    function updateDownloadLinks(releaseData) {
        const version = releaseData.tag_name;
        const assets = releaseData.assets;

        // 更新版本信息显示区域
        document.querySelectorAll('.version-info').forEach(el => {
            el.innerHTML = `<span>最新版本: ${version} | 自动更新 | 开源免费</span>`;
        });

        // 处理每个下载按钮
        downloadButtons.forEach(button => {
            const os = button.getAttribute('data-os');
            const versionLabel = button.querySelector('.version-label');
            
            // 为对应系统找到合适的资源文件
            const matchingAsset = findMatchingAsset(assets, FILE_PATTERNS[os]);
            
            button.classList.remove('loading');
            
            if (matchingAsset) {
                // 设置代理加速下载链接
                const downloadUrl = createProxyUrl(matchingAsset.browser_download_url);
                button.href = downloadUrl;
                versionLabel.textContent = version;
            } else {
                // 直接使用发布页面链接
                button.href = releaseData.html_url;
                versionLabel.textContent = '查看发布页';
            }
        });
    }

    // 查找匹配当前操作系统的资源文件
    function findMatchingAsset(assets, patterns) {
        for (const pattern of patterns) {
            const asset = assets.find(asset => 
                asset.name.toLowerCase().includes(pattern.toLowerCase()));
            if (asset) return asset;
        }
        return null;
    }

    // 创建代理加速URL
    function createProxyUrl(originalUrl) {
        // 替换原始GitHub URL为代理URL
        return PROXY_URL + originalUrl;
    }

    // 获取最新版本信息
    function fetchLatestRelease() {
        showLoading();
        
        fetch(GITHUB_API)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(data => {
                updateDownloadLinks(data);
            })
            .catch(error => {
                console.error('获取GitHub版本信息失败:', error);
                showError();
                
                // 设置回退链接到GitHub发布页面
                downloadButtons.forEach(button => {
                    button.href = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
                });
            });
    }

    // 添加下载按钮悬停效果
    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // 初始化 - 获取最新版本
    fetchLatestRelease();
});
