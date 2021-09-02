let text_element_1 = document.querySelector(".hey");
let text_element_2 = document.querySelector(".immurtuza");
let text_array_1 = text_element_1.innerHTML.split("");
let text_array_2 = text_element_2.innerHTML.split("");
let text_array_slice_1 = text_element_1.innerHTML.split(" ");
let text_array_slice_2 = text_element_2.innerHTML.split(" ");
let text_len_1 = text_array_1.length;
let text_len_2 = text_array_2.length;

const word_len_1 = text_array_slice_1.map((word) => {
    return word.length;
})

const word_len_2 = text_array_slice_2.map((word) => {
    return word.length;
})

let cards_contain = document.querySelector(".cards");
let all_cards = document.querySelectorAll(".cards .card");
let left_btn = document.querySelector(".control").firstElementChild;
let right_btn = document.querySelector(".control").lastElementChild;

let dev_projects_drop_button = document.querySelector(".dev-projects-title");
let dev_projects = document.querySelector(".dev-projects");
let dev_projects_drop_icon = document.querySelector(".dev-projects-title .drop");
let view_project_links = document.querySelectorAll(".dev-projects a");

let blog_projects_drop_button = document.querySelector(".blogs-title");
let blog_projects = document.querySelector(".blog-projects");
let blog_projects_drop_icon = document.querySelector(".blogs-title .drop");
let view_blog_links = document.querySelectorAll(".blog-projects a");

const skills_name = ["Software Developer", "Blogger", "Web Developer"];
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
    let text_string = document.querySelector(".desc_text");

    for (let i = 0; i < spans.length; i++) {
        let word_length = spans.length;
        let zoom_in = text_string.animate([
            {
                transform: `scale(${Number(2)})`,
                opacity: 0.2
            },
            {
                opacity: 1, offset: 0.2
            },
            {
                transform: `scale(${Number(1)})`,
                opacity: 1
            }
        ], {
            // delay: 300,
            delay: `${Number((word_length/3)*100)}`,
            duration: 400,
            iterations: 1,
            easing: `cubic-bezier(.74,.16,.38,.88)`,
            fill: `both`
        });
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
    link.addEventListener("keydown", (e) => {
        if(e.key === 'Enter'){
            let anchor = String(e.target.innerText.toLowerCase());
            let anchored_element = document.querySelector(`#${anchor}`);
            anchored_element.scrollIntoView({behavior: "smooth"});
        }
    })
})


all_cards.forEach((card) => {
    card.addEventListener("mouseover", () => {
        if(card.classList.contains("card-1-pos")){
            left_btn.classList.add("btn-hover");
        }
        if(card.classList.contains("card-3-pos")){
            right_btn.classList.add("btn-hover");
        }
    })
    card.addEventListener("mouseleave", () => {
        if(card.classList.contains("card-1-pos")){
            left_btn.classList.remove("btn-hover");
        }
        if(card.classList.contains("card-3-pos")){
            right_btn.classList.remove("btn-hover");
        }
    })
})

left_btn.addEventListener("click", () => {

    if (all_cards[1].classList.contains('card-2-pos')) {

        all_cards[0].classList.remove("card-1-pos");
        all_cards[0].classList.add("card-2-pos");

        all_cards[1].classList.remove("card-2-pos");
        all_cards[1].classList.add("card-3-pos");

        all_cards[2].classList.remove("card-3-pos");
        all_cards[2].classList.add("card-1-pos");
    }

    else if (all_cards[1].classList.contains("card-1-pos")) {

        all_cards[0].classList.remove("card-3-pos");
        all_cards[0].classList.add("card-1-pos");

        all_cards[1].classList.remove("card-1-pos");
        all_cards[1].classList.add("card-2-pos");

        all_cards[2].classList.remove("card-2-pos");
        all_cards[2].classList.add("card-3-pos");
    }

    else if (all_cards[1].classList.contains("card-3-pos")) {

        all_cards[0].classList.remove("card-2-pos");
        all_cards[0].classList.add("card-3-pos");

        all_cards[1].classList.remove("card-3-pos");
        all_cards[1].classList.add("card-1-pos");

        all_cards[2].classList.remove("card-1-pos");
        all_cards[2].classList.add("card-2-pos");
    }
})

right_btn.addEventListener("click", () => {

    if (all_cards[1].classList.contains('card-2-pos')) {
        
        all_cards[0].classList.remove("card-1-pos");
        all_cards[0].classList.add("card-3-pos");
        
        all_cards[1].classList.remove("card-2-pos");
        all_cards[1].classList.add("card-1-pos");
        
        all_cards[2].classList.remove("card-3-pos");
        all_cards[2].classList.add("card-2-pos");
    }

    else if (all_cards[1].classList.contains("card-1-pos")) {
        
        all_cards[0].classList.remove("card-3-pos");
        all_cards[0].classList.add("card-2-pos");

        all_cards[1].classList.remove("card-1-pos");
        all_cards[1].classList.add("card-3-pos");

        all_cards[2].classList.remove("card-2-pos");
        all_cards[2].classList.add("card-1-pos");
    }

    else if (all_cards[1].classList.contains("card-3-pos")) {

        all_cards[0].classList.remove("card-2-pos");
        all_cards[0].classList.add("card-1-pos");
        
        all_cards[1].classList.remove("card-3-pos");
        all_cards[1].classList.add("card-2-pos");

        all_cards[2].classList.remove("card-1-pos");
        all_cards[2].classList.add("card-3-pos");
    }

})

dev_projects_drop_button.addEventListener("click", () => {
    if(!dev_projects.style.maxHeight){
        dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
        dev_projects_drop_button.classList.add("projects-reveal");
        dev_projects.style.maxHeight = `${dev_projects.scrollHeight}px`;
    }
    else{
        dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
        dev_projects_drop_button.classList.remove("projects-reveal");
        dev_projects.style.maxHeight = null;
    }
})

dev_projects_drop_button.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        if(!dev_projects.style.maxHeight){
            dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
            dev_projects_drop_button.classList.add("projects-reveal");
            dev_projects.style.maxHeight = `${dev_projects.scrollHeight}px`;
            view_project_links.forEach(link => {
                link.setAttribute("tabindex", 0);
            })
        }
        else{
            dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
            dev_projects_drop_button.classList.remove("projects-reveal");
            dev_projects.style.maxHeight = null;
            view_project_links.forEach(link => {
                link.setAttribute("tabindex", -1);
            })
        }
    }
})

dev_projects_drop_button.addEventListener("focus", (e) => {
    if(!dev_projects.style.maxHeight){
        view_project_links.forEach(link => {
            link.setAttribute("tabindex", -1);
        })
    }
    else{
        view_project_links.forEach(link => {
            link.setAttribute("tabindex", 0);
        })
    }
})

blog_projects_drop_button.addEventListener("click", () => {
    if(!blog_projects.style.maxHeight){
        blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
        blog_projects_drop_button.classList.add("projects-reveal");
        blog_projects.style.maxHeight = `${blog_projects.scrollHeight}px`;
    }
    else{
        blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
        blog_projects_drop_button.classList.remove("projects-reveal");
        blog_projects.style.maxHeight = null;
    }
})

blog_projects_drop_button.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        if(!blog_projects.style.maxHeight){
            blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
            blog_projects_drop_button.classList.add("projects-reveal");
            blog_projects.style.maxHeight = `${blog_projects.scrollHeight}px`;
            view_blog_links.forEach(link => {
                link.setAttribute("tabindex", 0);
            })
        }
        else{
            blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
            blog_projects_drop_button.classList.remove("projects-reveal");
            blog_projects.style.maxHeight = null;
            view_blog_links.forEach(link => {
                link.setAttribute("tabindex", -1);
            })
        }
    }
})

blog_projects_drop_button.addEventListener("focus", (e) => {
    if(!blog_projects.style.maxHeight){
        view_blog_links.forEach(link => {
            link.setAttribute("tabindex", -1);
        })
    }
    else{
        view_blog_links.forEach(link => {
            link.setAttribute("tabindex", 0);
        })
    }
})


function typing_anime(word){
    if(word == 1){
        let timings = {
            easing: `steps(${Number(word_len_1[0] + 1)}, end)`,
            delay: 2000,
            duration: 2000,
            fill: 'forwards'
        }
        
        let cursor_timings = {
            duration: 700,
            iterations: Infinity,
            easing: 'cubic-bezier(0,.26,.44,.93)'
        }
        
        document.querySelector(".text_cursor_hey").animate([
            {
                opacity: 0
            },
            {
                opacity: 0, offset: 0.7
            },
            {
                opacity: 1
            }
        ], cursor_timings);
        
        if(text_array_slice_1.length == 1){
            timings.easing = `steps(${Number(word_len_1[0])}, end)`;
        
            let reveal_animation_1 = document.querySelector(".text_hide_hey").animate([
                { left: '0%' },
                { left: `${(100 / text_len_1) * (word_len_1[0])}%` }
            ], timings);
        
            document.querySelector(".text_cursor_hey").animate([
                { left: '0%' },
                { left: `${(100 / text_len_1) * (word_len_1[0])}%` }
            ], timings);

            reveal_animation_1.onfinish = () => {
                document.querySelector(".text_cursor_div_murtuza").classList.add("text_cursor_murtuza");
                document.querySelector(".text_cursor_div_hey").classList.remove("text_cursor_hey");
                document.querySelector(".text_hide_div_hey").classList.remove("text_hide_hey");
                typing_anime(2);
            }
        } else{
            document.querySelector(".text_hide_hey").animate([
                { left: '0%' },
                { left: `${(100 / text_len_1) * (word_len_1[0] + 1)}%` }
            ], timings);
        
            document.querySelector(".text_cursor_hey").animate([
                { left: '0%' },
                { left: `${(100 / text_len_1) * (word_len_1[0] + 1)}%` }
            ], timings);
        }
        
        
        for (let i = 1; i < text_array_slice_1.length; i++) {
            const single_word_len = word_len_1[i];
        
            if (i == 1) {
                var left_instance = (100 / text_len_1) * (word_len_1[i - 1] + 1);
            }
        
            let timings_2 = {
                easing: `steps(${Number(single_word_len + 1)}, end)`,
                delay: (2 * (i + 1) + (2 * i)) * (1000),
                duration: 2000,
                fill: 'forwards'
            }
        
            if (i == (text_array_slice_1.length - 1)) {
                timings_2.easing = `steps(${Number(single_word_len)}, end)`;
                let reveal_animation_1 = document.querySelector(".text_hide_hey").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_1) * (word_len_1[i]))}%` }
                ], timings_2);
        
                document.querySelector(".text_cursor_hey").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_1) * (word_len_1[i]))}%` }
                ], timings_2);

                reveal_animation_1.onfinish = () => {
                    document.querySelector(".text_cursor_div_murtuza").classList.add("text_cursor_murtuza");
                    document.querySelector(".text_cursor_div_hey").classList.remove("text_cursor_hey");
                    document.querySelector(".text_hide_div_hey").classList.remove("text_hide_hey");
                    typing_anime(2);
                }
            } else {
                document.querySelector(".text_hide_hey").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_1) * (word_len_1[i] + 1))}%` }
                ], timings_2);
        
                document.querySelector(".text_cursor_hey").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_1) * (word_len_1[i] + 1))}%` }
                ], timings_2);
            }
        
            left_instance = left_instance + ((100 / text_len_1) * (word_len_1[i] + 1));
        }
    }
    if(word == 2){
        let timings = {
            easing: `steps(${Number(word_len_2[0] + 1)}, end)`,
            delay: 2000,
            duration: 2000,
            fill: 'forwards'
        }
        
        let cursor_timings = {
            duration: 700,
            iterations: Infinity,
            easing: 'cubic-bezier(0,.26,.44,.93)'
        }
        
        document.querySelector(".text_cursor_murtuza").animate([
            {
                opacity: 0
            },
            {
                opacity: 0, offset: 0.7
            },
            {
                opacity: 1
            }
        ], cursor_timings);
        
        if(text_array_slice_2.length == 1){
            timings.easing = `steps(${Number(word_len_2[0])}, end)`;
        
            let reveal_animation_2 = document.querySelector(".text_hide_murtuza").animate([
                { left: '0%' },
                { left: `${(100 / text_len_2) * (word_len_2[0])}%` }
            ], timings);
        
            document.querySelector(".text_cursor_murtuza").animate([
                { left: '0%' },
                { left: `${(100 / text_len_2) * (word_len_2[0])}%` }
            ], timings);

            reveal_animation_2.onfinish = () => {
                document.querySelector(".text_cursor_div_murtuza").classList.remove("text_cursor_murtuza");
                document.querySelector(".text_hide_div_murtuza").classList.add("text_hide_murtuza");
                document.querySelector(".text_hide_murtuza").animate([
                    {left: '100%'},
                    {left: '0%'}
                ], 
                {
                    duration: 200,
                    fill: 'forwards',
                    easing: 'ease-out'
                })
                document.querySelector(".text_cursor_div_hey").classList.add("text_cursor_hey");
                document.querySelector(".text_hide_div_hey").classList.add("text_hide_hey");
                typing_anime(1);
            }
        } else{
            document.querySelector(".text_hide_murtuza").animate([
                { left: '0%' },
                { left: `${(100 / text_len_2) * (word_len_2[0] + 1)}%` }
            ], timings);
        
            document.querySelector(".text_cursor_murtuza").animate([
                { left: '0%' },
                { left: `${(100 / text_len_2) * (word_len_2[0] + 1)}%` }
            ], timings);
        }
        
        
        for (let i = 1; i < text_array_slice_2.length; i++) {
            const single_word_len = word_len_2[i];
            if (i == 1) {
                var left_instance = (100 / text_len_2) * (word_len_2[i - 1] + 1);
            }
        
            let timings_2 = {
                easing: `steps(${Number(single_word_len + 1)}, end)`,
                delay: (2 * (i + 1) + (2 * i)) * (1000),
                duration: 2000,
                fill: 'forwards'
            }
        
            if (i == (text_array_slice_2.length - 1)) {
                timings_2.easing = `steps(${Number(single_word_len)}, end)`;
                let reveal_animation_2 = document.querySelector(".text_hide_murtuza").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_2) * (word_len_2[i]))}%` }
                ], timings_2);
        
                document.querySelector(".text_cursor_murtuza").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_2) * (word_len_2[i]))}%` }
                ], timings_2);

                reveal_animation_2.onfinish = () => {
                    document.querySelector(".text_cursor_div_murtuza").classList.remove("text_cursor_murtuza");
                    document.querySelector(".text_hide_div_murtuza").classList.add("text_hide_murtuza");
                    document.querySelector(".text_cursor_div_hey").classList.add("text_cursor_hey");
                    document.querySelector(".text_hide_div_hey").classList.add("text_hide_hey");
                    typing_anime(1);
                }
            } else {
                document.querySelector(".text_hide_murtuza").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_2) * (word_len_2[i] + 1))}%` }
                ], timings_2);
        
                document.querySelector(".text_cursor_murtuza").animate([
                    { left: `${left_instance}%` },
                    { left: `${left_instance + ((100 / text_len_2) * (word_len_2[i] + 1))}%` }
                ], timings_2);
            }
        
            left_instance = left_instance + ((100 / text_len_2) * (word_len_2[i] + 1));
        }
    }
}
typing_anime(1);

document.querySelectorAll(".experience-data a").forEach((a) => {
    a.addEventListener("mouseover", () => {
        a.style = `text-decoration: underline`;
    })
    a.addEventListener("mouseleave", () => {
        a.style = `text-decoration: none`;
    })
})

document.querySelectorAll(".data-box .timeline .point").forEach((point) => {
    let anchor = document.createElement("a");
    point.appendChild(anchor);

    let data_id = point.parentElement.parentElement.id;
    let link_element_a = document.querySelector(`#${data_id} .data .role a`);

    if(data_id != "data-5"){
        let link = link_element_a.getAttribute("href");
        anchor.setAttribute("href", link);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noreferrer");
    }

    point.addEventListener("mouseover", (e) => {
        if(e.target.classList.contains("point")){
            if(data_id != "data-5"){
                link_element_a.style = `text-decoration: underline;`;
            }
        }
    })
    point.addEventListener("mouseleave", (e) => {
        if(e.target.classList.contains("point")){
            if(data_id != "data-5"){
                link_element_a.style = `text-decoration: none;`;
            }
        }
    })
    
})

document.querySelector("#header button").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark");
    document.querySelector(".sun-logo").classList.toggle("animate-sun");
    document.querySelector(".moon-logo").classList.toggle("animate-moon");
})