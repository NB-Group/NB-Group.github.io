import gsap from "gsap";
import { $ } from "mdui";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip, ScrollTrigger, TextPlugin);

export function page() {
    console.log("Cover animation Completed");
    const tl = gsap.timeline();
    const pagestate = Flip.getState(".page1", { props: "opacity" });
    $(".page1").css("position", "static");
    $(".page1").css("opacity", "1");
    tl.add([
        Flip.from(pagestate, {
            duration: 1,
            absolute: true
        })
    ]);
    tl.to(".app", { top: "80px", opacity: "1", duration: 1 });
    const scroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-element",
            pin: true,
            start: "top top",
            scrub: true
        }
    });
    const appdoc = document.querySelector(".app").contentDocument;
    function $app(selector) {
        return appdoc.querySelector(selector);
    }
    scroll.add([
        gsap.to(".page1 .text", {
            top: "-80%"
        }),
        gsap.to(".app", {
            left: "40px"
        }),
        gsap.to(".page2", {
            top: "64px",
            opacity: "1"
        })
    ]);
    scroll.add(
        [
            gsap.set($app(".player-content .cover-img"), {
                attr: {
                    src: "./app-res/posterA.png"
                }
            }),
            gsap.set($app(":root"), {
                "--bgul": "url('./app-res/posterA.png')"
            }),
            gsap.set($app(".player-content .info .title"), {
                textContent: "天使のクローバー（天使的幸运草）【『世界计划 多彩舞台』主题原创曲】"
            }),
            gsap.set($app(".player-content .info .artist"), {
                textContent: "MORE MORE JUMP！ × 鏡音リン"
            }),
            gsap.set($app(".player #lyrics-container"), {
                innerHTML: `<div class="lyrics-scroll-wrapper" style="transform: translateY(0px);"><div class="lyric-line"><span class="char">やっほー！　準備はOK</span></div><div class="lyric-line"><span class="char">今日は何処まで歩こう</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">しゅっと背伸びをしたら</span></div><div class="lyric-line active"><span class="char">もっと近づけるかな</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">勇気を出して</span></div><div class="lyric-line"><span class="char">踏み出してみたって</span></div><div class="lyric-line"><span class="char">次の壁にぶち当たる日々</span></div><div class="lyric-line"><span class="char">頼りなくても</span></div><div class="lyric-line"><span class="char">不器用な愛でも</span></div><div class="lyric-line"><span class="char">誰かに届けたい！</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">この翼が折れてしまっても</span></div><div class="lyric-line"><span class="char">君が居ればまた</span></div><div class="lyric-line"><span class="char">また頑張れるよ</span></div><div class="lyric-line"><span class="char">百年先も思いは消えずに</span></div><div class="lyric-line"><span class="char">今炎を纏って舞い降りた</span></div><div class="lyric-line"><span class="char">いつかのステージ</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">やっほー！　笑顔はCUTE</span></div><div class="lyric-line"><span class="char">今日も元気はつらつ</span></div><div class="lyric-line"><span class="char">ぐっと夢を抱いたら</span></div><div class="lyric-line"><span class="char">きっと輝く場所へ</span></div><div class="lyric-line"><span class="char">「行けたらいいな」</span></div><div class="lyric-line"><span class="char">なんて気持ちは</span></div><div class="lyric-line"><span class="char">宇宙（そら）の彼方</span></div><div class="lyric-line"><span class="char">蹴飛ばしてしまえ</span></div><div class="lyric-line"><span class="char">「絶対」が無くても</span></div><div class="lyric-line"><span class="char">絶対掴むんだ</span></div><div class="lyric-line"><span class="char">憧れの先を</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">進む道を見失っても</span></div><div class="lyric-line"><span class="char">君といればまだ歌は続くよ</span></div><div class="lyric-line"><span class="char">キラキラカラフル</span></div><div class="lyric-line"><span class="char">包まれてゆく</span></div><div class="lyric-line"><span class="char">私達だけの「とっておき」</span></div><div class="lyric-line"><span class="char">描いたステージ</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">もっと！腕を振って</span></div><div class="lyric-line"><span class="char">もっと！応えて</span></div><div class="lyric-line"><span class="char">混じりっ気のない全力届け</span></div><div class="lyric-line"><span class="char">もっと！愛を見せて</span></div><div class="lyric-line"><span class="char">ぎゅっと握りしめた</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">天使のクローバー</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">この翼が折れてしまっても</span></div><div class="lyric-line"><span class="char">君が居ればまた</span></div><div class="lyric-line"><span class="char">また頑張れるよ</span></div><div class="lyric-line"><span class="char">百年先も思いは消えずに</span></div><div class="lyric-line"><span class="char">今炎を纏って舞い降りた</span></div><div class="lyric-line"><span class="char">いつかのステージ</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">もっと！腕を振って</span></div><div class="lyric-line"><span class="char">もっと！応えて</span></div><div class="lyric-line"><span class="char">皆で集めた全力届け</span></div><div class="lyric-line"><span class="char">もっと！愛を見せて</span></div><div class="lyric-line"><span class="char">ぎゅっと握りしめた</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">天使のクローバー</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">（全身全霊！MOREMOREJUMP!!）</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">突き進むから</span></div><div class="lyric-line"><span class="char"></span></div></div>`
            }),
            gsap.set($app("#playing-list .song .poster"), {
                attr: {
                    src: "./app-res/posterA.png"
                }
            }),
            gsap.set($app("#playing-list .song .name"), {
                textContent: "天使のクローバー"
            })
        ],
        "-=0.25"
    );
    scroll.add(
        [
            gsap.to(".page2 .text", {
                top: "-80%"
            }),
            gsap.to(".app", {
                left: `${window.innerWidth - $(".app").width() - 40}px`
            }),
            gsap.to(".page3", {
                top: "64px",
                opacity: "1"
            })
        ],
        "+=0.5"
    );
    scroll.to($app("body"), {
        scale: 1.5,
        translateY: "50%"
    });
    scroll.set($app(".cursor"), {
        display: "block"
    });
    scroll.to($app(".cursor"), {
        left: $app(".search-music").getBoundingClientRect().left + 8,
        top: $app(".search-music").getBoundingClientRect().top + 2
    });
    scroll.set($app(".search-music"), {
        attr: {
            class: "search-music input focus"
        }
    });
    // 创建一个计数器
    let counter = { val: 0 };
    const finalText = "JUMPIN' OVER!";

    // 使用计数器来创建动画
    scroll.to(counter, {
        val: finalText.length,
        duration: 1,
        onUpdate: function () {
            const currentText = finalText.substring(0, Math.floor(counter.val));
            $app(".search-music").value = currentText;
        },
        ease: "none"
    });

    scroll.set($app(".search-music"), {
        attr: {
            class: "search-music input"
        }
    });

    scroll.add([
        gsap.to($app("body"), {
            scale: 1,
            translateY: 0
        }),
        gsap.to($app(".cursor"), {
            left: 50,
            top: 100
        })
    ]);

    scroll.add(
        [
            gsap.set($app(".content .search-result"), {
                attr: {
                    class: "search-result"
                }
            }),
            gsap.set($app(".content .player"), {
                attr: {
                    class: "player hide"
                }
            })
        ],
        "+=0.4"
    );

    console.log($app(".search-result .search .song:first-child"));
    scroll.to($app(".cursor"), {
        left: function () {
            return $app(".search-result .search .song:first-child").getBoundingClientRect().left + 30;
        },
        top: function () {
            return $app(".search-result .search .song:first-child").getBoundingClientRect().top + 8;
        }
    });

    scroll.set(
        $app(".search-result .search .song:first-child"),
        {
            attr: {
                class: "song hover"
            }
        },
        "-=0.2"
    );

    scroll.add(
        [
            gsap.set($app(".player-content .cover-img"), {
                attr: {
                    src: "./app-res/posterB.png"
                }
            }),
            gsap.set($app(":root"), {
                "--bgul": "url('./app-res/posterB.png')"
            }),
            gsap.set($app(".player-content .info .title"), {
                textContent: "JUMPIN’ OVER !【『世界计划 多彩舞台』主题原创曲】"
            }),
            gsap.set($app(".player #lyrics-container"), {
                innerHTML: `<div class="lyrics-scroll-wrapper" style="transform: translateY(107.392px);"><div class="lyric-line"><span class="char">また外れた今朝の晴れ予報</span></div><div class="lyric-line"><span class="char">汗をかいた見慣れた赤信号</span></div><div class="lyric-line"><span class="char">冷たいのはわたしの右肩</span></div><div class="lyric-line active"><span class="char">まだ不慣れなあなたの⻩色い傘</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">いっせえので</span></div><div class="lyric-line"><span class="char">跳んで越した水溜りを</span></div><div class="lyric-line"><span class="char">いつかきっと懐かしむでしょう</span></div><div class="lyric-line"><span class="char">物語みたいだね</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">この先でずっと待っている悲しみも</span></div><div class="lyric-line"><span class="char">拭った後には笑っていてほしいから</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">貴方を呼ぶの</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">眠れなくてあなたにかけた電話</span></div><div class="lyric-line"><span class="char">眠れないのは貴方も同じで</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">夜の音がごまかしていたんだ</span></div><div class="lyric-line"><span class="char">表と裏の境界線</span></div><div class="lyric-line"><span class="char">見つけられたのはそう</span></div><div class="lyric-line"><span class="char">あなたが黙っていたから</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">ほどいた髪は戻らないわ</span></div><div class="lyric-line"><span class="char">夜明け前の色になびかせてた</span></div><div class="lyric-line"><span class="char">立ち止まったわたしの不安も</span></div><div class="lyric-line"><span class="char">⻄の満ちた月に話したから</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">今、朝が来るわ</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">いっせえので</span></div><div class="lyric-line"><span class="char">跳んで越した白い線よ</span></div><div class="lyric-line"><span class="char">いつか遥かな飛行機雲</span></div><div class="lyric-line"><span class="char">つかめない理由だね</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">葉の先で⻘く光った雫ひとつ</span></div><div class="lyric-line"><span class="char">あがった雨には息をのむ祈りを</span></div><div class="lyric-line"><span class="char"></span></div><div class="lyric-line"><span class="char">呼ぶ声の方へ</span></div><div class="lyric-line"><span class="char"></span></div></div>`
            }),
            gsap.set($app(".player-content .info .artist"), {
                textContent: "MORE MORE JUMP！ × 初音ミク"
            }),
            gsap.set($app("#playing-list .song .poster"), {
                attr: {
                    src: "./app-res/posterB.png"
                }
            }),
            gsap.set($app("#playing-list .song .name"), {
                textContent: "JUMPIN’ OVER !"
            })
        ],
        "+=0.25"
    );

    scroll.add([
        gsap.set($app(".content .search-result"), {
            attr: {
                class: "search-result hide"
            }
        }),
        gsap.set($app(".content .player"), {
            attr: {
                class: "player"
            }
        }),
        gsap.set($app(".search-music"), {
            value: ""
        })
    ]);

    scroll.add(
        [
            gsap.to(".page3 .text", {
                top: "-80%"
            }),
            gsap.to(".app", {
                left: 40
            }),
            gsap.to(".page4", {
                top: "64px",
                opacity: "1"
            })
        ],
        "+=0.5"
    );

    scroll.add([
        gsap.to($app("body"), {
            scale: 2,
            translateX: "45%"
        }),

        gsap.to($app(".cursor"), {
            left: $app("#playing-list .song .controls .love").getBoundingClientRect().left + 10,
            top: $app("#playing-list .song .controls .love").getBoundingClientRect().top - 4
        })
    ]);

    scroll.set(
        $app("#playing-list .song"),
        {
            attr: {
                class: "song hover"
            }
        },
        "-=0.2"
    );

    scroll.set(
        $app("#playing-list .song .controls .love i"),
        {
            attr: {
                class: "bi bi-heart-fill loved"
            }
        },
        "+=0.25"
    );

    scroll.set(
        $app("#playing-list .song"),
        {
            attr: {
                class: "song"
            }
        },
        "+=0.2"
    );
    scroll.add([
        gsap.to($app(".cursor"), {
            left: $app("#function-list .love-list").getBoundingClientRect().left + 10,
            top: $app("#function-list .love-list").getBoundingClientRect().top - 4
        }),
        gsap.to($app("body"), {
            translateY: "20%"
        })
    ]);

    scroll.set(
        $app("#function-list .love-list"),
        {
            attr: {
                class: "love-list hover"
            }
        },
        "-=0.2"
    );

    scroll.add([
        gsap.set($app("#function-list .player"), {
            attr: {
                class: "player"
            }
        }),
        gsap.set($app("#function-list .love-list"), {
            attr: {
                class: "love-list check"
            }
        }),
        gsap.set($app("#function-list .focs"), {
            top: 56
        }),
        gsap.to($app("body"), {
            translateX: 0,
            translateY: 0,
            scale: 1
        }),
        gsap.set($app(".content .love-list"), {
            attr: {
                class: "love-list"
            }
        }),
        gsap.set($app(".content .player"), {
            attr: {
                class: "player hide"
            }
        })
    ]);
    scroll.add(
        [
            gsap.to(".page4 .text", {
                top: "-80%"
            }),
            gsap.to(".app", {
                left: `${window.innerWidth - $(".app").width() - 40}px`
            }),
            gsap.to(".page5", {
                top: "64px",
                opacity: "1"
            })
        ],
        "+=0.5"
    );
    scroll.to($app(".cursor"), {
        left: $app("#function-list .music-list").getBoundingClientRect().left + 10,
        top: $app("#function-list .music-list").getBoundingClientRect().top - 4
    });
    scroll.set(
        $app("#function-list .music-list"),
        {
            attr: {
                class: "music-list hover"
            }
        },
        "-=0.2"
    );
    scroll.add([
        gsap.set($app("#function-list .love-list"), {
            attr: {
                class: "love-list"
            }
        }),
        gsap.set($app("#function-list .music-list"), {
            attr: {
                class: "music-list check"
            }
        }),
        gsap.set($app("#function-list .focs"), {
            top: 102
        }),
        gsap.set($app(".content .music-list"), {
            attr: {
                class: "music-list"
            }
        }),
        gsap.set($app(".content .love-list"), {
            attr: {
                class: "love-list hide"
            }
        })
    ]);

    scroll.to(
        $app(".cursor"),
        {
            left: () => {
                return $app(".content .music-list #playlistList li:last-child").getBoundingClientRect().left + 10;
            },
            top: () => {
                return $app(".content .music-list #playlistList li:last-child").getBoundingClientRect().top - 4;
            }
        },
        "+=0.5"
    );

    scroll.to($app(".content .music-list #playlistList .aaa"), {
        attr: {
            class: "hover"
        }
    }, "-=0.2");

    scroll.add([
        gsap.set($app(".content .music-list #playlistList li:first-child"), {
            attr: {
                class: ""
            }
        }),
        gsap.set($app(".content .music-list .song-section .list1"), {
            display: "none"
        }),
        gsap.set($app(".content .music-list .song-section .list2"), {
            display: "block"
        }),
        gsap.to($app(".content .music-list #playlistList .aaa"), {
            attr: {
                class: "hover active"
            }
        })
    ]);
    scroll.add(
        [
            gsap.to(".page5 .text", {
                top: "-80%"
            }),
            gsap.to(".app", {
                left: `40px`
            }),
            gsap.to(".page6", {
                top: "64px",
                opacity: "1"
            })
        ],
        "+=0.5"
    );
    scroll.to($app(".cursor"), {
        left: $app("#function-list .setting").getBoundingClientRect().left + 10,
        top: $app("#function-list .setting").getBoundingClientRect().top - 4
    });
    scroll.add([
        gsap.set($app("#function-list .music-list"), {
            attr: {
                class: "music-list"
            }
        }),
        gsap.set($app("#function-list .setting"), {
            attr: {
                class: "setting check"
            }
        }),
        gsap.set($app("#function-list .focs"), {
            top: 148
        }),
        gsap.set($app(".content .setting"), {
            attr: {
                class: "setting"
            }
        }),
        gsap.set($app(".content .music-list"), {
            attr: {
                class: "music-list hide"
            }
        })
    ]);
    scroll.to($app(".cursor"), {
        left: $app("#function-list .player").getBoundingClientRect().left + 10,
        top: $app("#function-list .player").getBoundingClientRect().top - 4
    }, "+=0.4");
    scroll.set(
        $app("#function-list .player"),
        {
            attr: {
                class: "player hover"
            }
        },
        "-=0.2"
    );
    scroll.add(
        [
            gsap.set($app("#function-list .player"), {
                attr: {
                    class: "player check"
                }
            }),
            gsap.set($app("#function-list .setting"), {
                attr: {
                    class: "setting"
                }
            }),
            gsap.set($app("#function-list .focs"), {
                top: 10
            }),
            gsap.set($app(".content .setting"), {
                attr: {
                    class: "setting hide"
                }
            }),
            gsap.set($app(".content .player"), {
                attr: {
                    class: "player"
                }
            })
        ],
        "+=0.5"
    );
    scroll.add([
        gsap.set($app(".player-content .cover-img"), {
            attr: {
                src: "/poster.png"
            }
        }),
        gsap.set($app(":root"), {
            "--bgul": "url('/poster.png')"
        }),
        gsap.set($app(".player-content .info .title"), {
            textContent: "歌曲名"
        }),
        gsap.set($app(".player-content .info .artist"), {
            textContent: "歌手"
        }),
        gsap.set($app("#playing-list .song .poster"), {
            attr: {
                src: "/poster.png"
            }
        }),
        gsap.set($app("#playing-list .song .name"), {
            textContent: "歌曲名"
        }),
        gsap.set($app(".player #lyrics-container"), {
            innerHTML: "无歌词"
        })
    ]);
    scroll.to($app(".cursor"), {
        left: -48
    })
}
