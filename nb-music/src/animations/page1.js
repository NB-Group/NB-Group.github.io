import gsap from "gsap";
import { $ } from "mdui";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function page1() {
    console.log("Cover animation Completed");
    const pagetl = gsap.timeline();
    const pagestate = Flip.getState(".page1", { props: "opacity" });
    $(".page1").css("position", "static");
    $(".page1").css("opacity", "1");
    pagetl.add([
        Flip.from(pagestate, {
            duration: 1,
            absolute: true
        })
    ]);
}
