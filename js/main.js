// console.log((1086.78*137)/1080);
console.log(document.querySelectorAll(".desc_text span"));
let iteration = 1;
function text_animate() {
    let skills = Array("<span>S</span><span>o</span><span>f</span><span>t</span><span>w</span><span>a</span><span>r</span><span>e</span><span>&nbsp</span><span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>e</span><span>r</span>", "<span>B</span><span>l</span><span>o</span><span>g</span><span>g</span><span>e</span><span>r</span>", "<span>P</span><span>r</span><span>o</span><span>b</span><span>l</span><span>e</span><span>m</span><span>&nbsp</span><span>S</span><span>o</span><span>l</span><span>v</span><span>e</span><span>r</span>");
    let spans = document.querySelectorAll(".desc_text span");

    for (let i = 0; i < spans.length; i++) {
        spans[i].animate([
            {
                opacity: 0,
                transform: `translateY(${Number(10)}px)`
            },
            {
                opacity: 1,
                transform: `translateY(${Number(0)}px)`
            }
        ], {
            delay: ((i + 2) / 2) * 100,
            duration: (i + 0.1) * 10,
            easing: `ease-out`,
            iterations: 1,
            fill: `forwards`
        })

        if (i == (spans.length - 1)) {
            setTimeout(() => {
                spans.forEach((span) => {
                    span.style = `opacity: 0`;
                })
                // let iteration = 1;
                if(iteration%3 != 0){
                    if(iteration%2 != 0){
                        console.log(iteration);
                        document.querySelector(".desc_text").innerHTML = skills[0];
                    }
                    if(iteration%2 == 0){
                        console.log(iteration);
                        document.querySelector(".desc_text").innerHTML = skills[1];
                    }
                    // console.log(iteration);
                    // console.log(skills[1]);
                    // document.querySelector(".desc_text").innerHTML = skills[0];
                }
                if(iteration%3 == 0){
                    // console.log(skills[0]);
                    console.log(iteration);
                    document.querySelector(".desc_text").innerHTML = skills[2];
                }
                // iteration++;
                // document.querySelector(".desc_text").innerHTML = "<span>B</span><span>l</span><span>o</span><span>g</span><span>g</span><span>e</span><span>r</span>";
                text_animate();
            }, 2000)
        }
    }
    iteration++;
}

text_animate();

// document.querySelectorAll(".desc_text span").forEach((letter) => {
// })