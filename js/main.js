// console.log((1086.78*137)/1080);
// console.log(document.querySelectorAll(".desc_text span"));
const skills_name = ["Software Developer", "Blogger", "Content Creator"];
let iteration = 1;
function text_animate() {
    
    let skill_split = skills_name.map((skill) => {
        return skill.split("");
    })

    let skill_string = skill_split.map((a_skill) => {
        let string_skill = a_skill.map((letter) => {
            if(letter == " "){
                return `<span>&nbsp;<span>`;
            }
            return `<span>${letter}</span>`;
        })
        return string_skill.join("");
    })
    
    // console.log(skill_string);
    // let skills = Array("<span>S</span><span>o</span><span>f</span><span>t</span><span>w</span><span>a</span><span>r</span><span>e</span><span>&nbsp</span><span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>e</span><span>r</span>", "<span>B</span><span>l</span><span>o</span><span>g</span><span>g</span><span>e</span><span>r</span>", "<span>P</span><span>r</span><span>o</span><span>b</span><span>l</span><span>e</span><span>m</span><span>&nbsp</span><span>S</span><span>o</span><span>l</span><span>v</span><span>e</span><span>r</span>");
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
                        // console.log(iteration);
                        document.querySelector(".desc_text").innerHTML = skill_string[0];
                    }
                    if(iteration%2 == 0){
                        // console.log(iteration);
                        document.querySelector(".desc_text").innerHTML = skill_string[1];
                    }
                    // console.log(iteration);
                    // console.log(skills[1]);
                    // document.querySelector(".desc_text").innerHTML = skills[0];
                }
                if(iteration%3 == 0){
                    // console.log(skills[0]);
                    // console.log(iteration);
                    document.querySelector(".desc_text").innerHTML = skill_string[2];
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

document.querySelectorAll("nav ul div").forEach((link) => {
    link.addEventListener("click", (e) => {
        console.log(e.target);
        let anchor = String(e.target.innerText.toLowerCase());
        console.log(document.querySelector(`#${anchor}`));
        document.querySelector(`#${anchor}`).scrollIntoView({behavior: "smooth"});

        // document.querySelector(`#${anchor}`).addEventListener("scrollIntoView", {behavior: "smooth"});
    })
})

// document.querySelectorAll(".desc_text span").forEach((letter) => {
// })