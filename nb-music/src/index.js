import "mdui";
import "mdui/mdui.css";
import "./style.scss";
import "./icons.js";
import "./animations/cover.js";

document.getElementById("change-mode").addEventListener("click", function () {
    document.querySelector(":root").classList.toggle("mdui-theme-dark");
    if (document.querySelector(":root").classList.contains("mdui-theme-dark")) {
        this.innerHTML = "<mdui-icon-dark-mode--rounded></mdui-icon-dark-mode--rounded>";
    } else {
        this.innerHTML = "<mdui-icon-light-mode--rounded></mdui-icon-light-mode--rounded>";
    }
});
