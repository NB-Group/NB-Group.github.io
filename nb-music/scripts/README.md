# 脚本文件夹

此文件夹包含NB Music网站所有JavaScript文件。

## 文件说明

- `main.js` - 主要的JavaScript文件，包含网站的所有交互功能：
  - 深色/浅色主题切换
  - 滚动动画和效果
  - 导航栏行为
  - 图片懒加载
  - 响应式交互

## 开发指南

### 添加新功能

如果需要添加新的JavaScript功能，建议按以下步骤操作：

1. 在`main.js`中创建一个新函数
2. 在`DOMContentLoaded`事件监听器内初始化该功能
3. 使用注释清晰地标记每个功能模块

### 性能优化

- 使用throttle和debounce函数处理高频事件（如滚动、调整大小）
- 优先使用CSS转换和动画，而不是JavaScript动画
- 使用IntersectionObserver进行懒加载和动画触发
- 避免频繁的DOM操作

### 调试技巧

如果遇到问题，可以在浏览器控制台使用以下方法调试：

```javascript
// 检查主题切换是否正常工作
console.log('当前主题: ' + (document.body.getAttribute('data-theme') || 'light'));

// 调试滚动动画
const elements = document.querySelectorAll('.reveal');
console.log('需要动画的元素数量: ' + elements.length);
console.log('已显示的元素: ' + document.querySelectorAll('.reveal.visible').length);
```

## 代码结构

JavaScript代码遵循模块化结构，每个功能都被组织在独立的函数中：

- 主题管理
- 导航和滚动
- 动画效果
- 图片处理
- 性能优化

请保持这种组织结构以便于维护。
