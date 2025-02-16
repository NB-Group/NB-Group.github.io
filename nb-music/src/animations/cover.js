import gsap from "gsap";
import { size } from "../utils.js";
import { page } from "./page.js";

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".cover h1").style.left = `${(window.innerWidth - (size(".cover img", "width") + size(".cover h1", "width"))) / 2 + size(".cover img", "width")}px`;
    document.querySelector(".cover h1").style.top = `${(window.innerHeight - size(".cover h1", "height")) / 2}px`;
    const titletl = gsap.timeline({ defaults: { duration: 1, ease: "sine.inOut" }, onComplete: page });
    titletl.to(".cover img", {
        top: `${(window.innerHeight - size(".cover img", "height")) / 2}px`,
        ease: "elastic"
    });
    titletl.add([
        gsap.to(".cover img", {
            left: `${(window.innerWidth - (size(".cover img", "width") + size(".cover h1", "width"))) / 2}px`,
            duration: 1,
            ease: "back"
        }),
        gsap.to(".cover h1", {
            opacity: "1",
            duration: 1
        })
    ]);
    titletl.add(
        [
            gsap.to(".cover img", {
                left: `calc(${(window.innerWidth - (size(".cover img", "width") + size(".cover h1", "width"))) / 2}px + 3em)`,
                duration: 0.6,
                ease: "sine.inOut"
            }),
            gsap.to(".cover h1 .n", {
                left: "1em",
                duration: 0.7,
                ease: "sine.inOut"
            }),
            gsap.to(".cover h1 .hide", {
                opacity: 0,
                duration: 0.7
            }),
            gsap.to(".cover h1 .b", {
                left: "-0.5em",
                duration: 0.7,
                ease: "sine.inOut"
            }),
            gsap.to(".cover h1 .m", {
                left: "-1.1em",
                duration: 1,
                ease: "sine.inOut"
            })
        ],
        "+=0.1"
    );

    titletl.add(
        [
            gsap.to(".cover img", {
                top: `${size(".app-bar img", "y")}px`,
                left: `${size(".app-bar img", "x")}px`,
                width: `${size(".app-bar img", "width")}px`,
                duration: 1.3,
                ease: "sine.inOut"
            }),
            gsap.to(".cover h1", {
                top: `${size(".app-bar mdui-top-app-bar-title", "y") + 8}px`,
                left: `calc(${size(".app-bar mdui-top-app-bar-title", "x")}px - 1em)`,
                fontSize: `${window.getComputedStyle(document.querySelector(".app-bar mdui-top-app-bar-title")).fontSize}`,
                duration: 1.3,
                ease: "sine.inOut"
            })
        ],
        "+=0.3"
    );
});
