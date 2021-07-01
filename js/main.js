const skills_name = ["Software Developer", "Blogger", "Front-end Developer"];
let header_links = document.querySelectorAll("nav ul div");
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
                
                if(iteration%3 != 0){
                    if(iteration%2 != 0){
                        document.querySelector(".desc_text").innerHTML = skill_string[0];
                    }
                    if(iteration%2 == 0){
                        document.querySelector(".desc_text").innerHTML = skill_string[1];
                    }
                }
                if(iteration%3 == 0){
                    document.querySelector(".desc_text").innerHTML = skill_string[2];
                }
                text_animate();
            }, 2000)
        }
    }
    iteration++;
}

text_animate();

header_links.forEach((link) => {
    link.addEventListener("click", (e) => {
        let anchor = String(e.target.innerText.toLowerCase());
        let anchored_element = document.querySelector(`#${anchor}`);
        anchored_element.scrollIntoView({behavior: "smooth"});
    })
})
