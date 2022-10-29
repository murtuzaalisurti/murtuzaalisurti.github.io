let cards_contain = document.querySelector(".cards");
let all_cards = document.querySelectorAll(".cards .card");
let left_btn = document.querySelector(".control").firstElementChild;
let right_btn = document.querySelector(".control").lastElementChild;

let dev_projects_drop_button = document.querySelector(".dev-projects-title");
let dev_projects = document.querySelector(".dev-projects");
let dev_projects_blocks = document.querySelectorAll(".dev-projects .block");
let dev_projects_drop_icon = document.querySelector(".dev-projects-title .drop");
let view_project_links = document.querySelectorAll(".dev-projects a");

let blog_projects_drop_button = document.querySelector(".blogs-title");
let blog_projects = document.querySelector(".blog-projects");
let blog_projects_blocks = document.querySelectorAll(".blog-projects .block");
let blog_projects_drop_icon = document.querySelector(".blogs-title .drop");
let view_blog_links = document.querySelectorAll(".blog-projects a");

let dark_mode_toggle_btn = document.querySelector("#dark-mode-toggle");

let hamburger_menu = document.querySelector("#hamburger-menu");
let navbar = document.querySelector("#navbar");

const skills_name = ["Full-stack Developer", "Content Creator", "Web Dev", "Blogger"];
document.querySelector(".desc_text").setAttribute("aria-label", skills_name[0]);
let header_links = document.querySelectorAll("nav ul > li");
let iteration = 1;
let skill_split = skills_name.map((skill) => {
    return skill.split("");
})
let skill_string = skill_split.map((a_skill) => {
    let string_skill = a_skill.map((letter) => {
        if (letter == " ") {
            return `<span>&nbsp;</span>`;
        }
        return `<span>${letter}</span>`;
    })
    return string_skill.join("");
})
let text_string = document.querySelector(".desc_text");
text_string.innerHTML = skill_string[0];
function text_animate() {
    let spans = document.querySelectorAll(".desc_text span");

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
            delay: `${Number((word_length / 3) * 100)}`,
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

                for (let k = 0; k < skills_name.length; k++) {
                    if (iteration == (k + 1)) {
                        text_string.innerHTML = skill_string[k];
                        break;
                    }
                }

                text_animate();
            }, 2000)
        }
    }

    if (iteration == skills_name.length) {
        iteration = 1;
    } else {
        iteration++;
    }
}

text_animate();

all_cards.forEach((card) => {
    card.addEventListener("mouseover", () => {
        if (card.classList.contains("card-1-pos")) {
            left_btn.classList.add("btn-hover");
        }
        if (card.classList.contains("card-3-pos")) {
            right_btn.classList.add("btn-hover");
        }
    })
    card.addEventListener("mouseleave", () => {
        if (card.classList.contains("card-1-pos")) {
            left_btn.classList.remove("btn-hover");
        }
        if (card.classList.contains("card-3-pos")) {
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

for (let k = 0; k < dev_projects_blocks.length; k++) {
    dev_projects_blocks[k].id = `project-${k + 1}`;
}

for (let k = 0; k < blog_projects_blocks.length; k++) {
    blog_projects_blocks[k].id = `blog-project-${k + 1}`;
}

dev_projects_drop_button.addEventListener("click", () => {
    if (!dev_projects.style.maxHeight) {
        dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
        dev_projects_drop_button.classList.add("projects-reveal");
        dev_projects.style = `border: 0.3rem solid; border-color: var(--only-dark-border);`;
        dev_projects.style.maxHeight = `${dev_projects.scrollHeight}px`;
    }
    else {
        dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
        dev_projects_drop_button.classList.remove("projects-reveal");
        dev_projects.style = `border: 1px solid transparent;`;
        dev_projects.style.maxHeight = null;
    }
})

dev_projects_drop_button.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        if (!dev_projects.style.maxHeight) {
            dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
            dev_projects_drop_button.classList.add("projects-reveal");
            dev_projects.style = `border: 0.3rem solid; border-color: var(--only-dark-border);`;
            dev_projects.style.maxHeight = `${dev_projects.scrollHeight}px`;
            view_project_links.forEach(link => {
                link.setAttribute("tabindex", 0);
            })
        }
        else {
            dev_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
            dev_projects_drop_button.classList.remove("projects-reveal");
            dev_projects.style = `border: 1px solid transparent;`;
            dev_projects.style.maxHeight = null;
            view_project_links.forEach(link => {
                link.setAttribute("tabindex", -1);
            })
        }
    }
})

dev_projects_drop_button.addEventListener("focus", (e) => {
    if (!dev_projects.style.maxHeight) {
        view_project_links.forEach(link => {
            link.setAttribute("tabindex", -1);
        })
    }
    else {
        view_project_links.forEach(link => {
            link.setAttribute("tabindex", 0);
        })
    }
})

blog_projects_drop_button.addEventListener("click", () => {
    if (!blog_projects.style.maxHeight) {
        blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
        blog_projects_drop_button.classList.add("projects-reveal");
        blog_projects.style = `border: 0.3rem solid; border-color: var(--only-dark-border);`;
        blog_projects.style.maxHeight = `${blog_projects.scrollHeight}px`;
    }
    else {
        blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
        blog_projects_drop_button.classList.remove("projects-reveal");
        blog_projects.style = `border: 1px solid transparent;`;
        blog_projects.style.maxHeight = null;
    }
})

blog_projects_drop_button.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        if (!blog_projects.style.maxHeight) {
            blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
            blog_projects_drop_button.classList.add("projects-reveal");
            blog_projects.style = `border: 0.3rem solid; border-color: var(--only-dark-border);`;
            blog_projects.style.maxHeight = `${blog_projects.scrollHeight}px`;
            view_blog_links.forEach(link => {
                link.setAttribute("tabindex", 0);
            })
        }
        else {
            blog_projects_drop_icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
            blog_projects_drop_button.classList.remove("projects-reveal");
            blog_projects.style = `border: 1px solid transparent;`;
            blog_projects.style.maxHeight = null;
            view_blog_links.forEach(link => {
                link.setAttribute("tabindex", -1);
            })
        }
    }
})

blog_projects_drop_button.addEventListener("focus", (e) => {
    if (!blog_projects.style.maxHeight) {
        view_blog_links.forEach(link => {
            link.setAttribute("tabindex", -1);
        })
    }
    else {
        view_blog_links.forEach(link => {
            link.setAttribute("tabindex", 0);
        })
    }
})


document.querySelectorAll(".experience-data a").forEach((a) => {
    a.addEventListener("mouseover", () => {
        a.style = `text-decoration: underline`;
    })
    a.addEventListener("mouseleave", () => {
        a.style = `text-decoration: none`;
    })
})

let all_experiences = document.querySelectorAll(".experience-data .data-box");

for (let i = 0; i < all_experiences.length; i++) {
    all_experiences[i].id = `data-${i + 1}`;
}

document.querySelectorAll(".data-box .timeline .point").forEach((point) => {
    let anchor = document.createElement("a");

    let data_id = point.parentElement.parentElement.id;
    let link_element_a;
    if (document.querySelector(`#${data_id} .data .role a`) != null) {
        point.appendChild(anchor);
        link_element_a = document.querySelector(`#${data_id} .data .role a`);
        let link = link_element_a.getAttribute("href");
        let timeline_point_aria_label = link_element_a.innerText;
        anchor.setAttribute("href", link);
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noreferrer");
        anchor.setAttribute("aria-label", timeline_point_aria_label);
        anchor.setAttribute("title", timeline_point_aria_label);
    }

    point.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("point")) {
            if (document.querySelector(`#${data_id} .data .role a`) != null) {
                link_element_a.style = `text-decoration: underline;`;
            }
        }
    })
    point.addEventListener("mouseleave", (e) => {
        if (e.target.classList.contains("point")) {
            if (document.querySelector(`#${data_id} .data .role a`) != null) {
                link_element_a.style = `text-decoration: none;`;
            }
        }
    })

})

dark_mode_toggle_btn.addEventListener("click", () => {
    theme_check('toggle');
    animation_toggle_logo();
})

let back_to_top = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        back_to_top.classList.add("show-back-to-top");
    }
    else {
        back_to_top.classList.remove("show-back-to-top");
    }
})
back_to_top.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

hamburger_menu.addEventListener("click", () => {
    navbar.classList.toggle("none");
    if (!navbar.classList.contains("none")) {
        hamburger_menu.innerHTML = `<i class="fas fa-times"></i>`;
        hamburger_menu.style = `position: fixed; top: 5rem;`;
    } else {
        hamburger_menu.innerHTML = `<i class="fas fa-bars"></i>`;
        hamburger_menu.style = `position: default;`;
    }
})

const media = window.matchMedia('(max-width: 62em)');

function onNavLinkClick(e) {
    let anchor = String(e.target.innerText.toLowerCase());
    let anchored_element = document.querySelector(`#${anchor}`);
    anchored_element.scrollIntoView({ behavior: "smooth" });
    navbar.classList.add("none");
    hamburger_menu.innerHTML = `<i class="fas fa-bars"></i>`;
    hamburger_menu.style = `position: default;`;
}

function onNavLinkEnter(e) {
    if (e.key === 'Enter') {
        let anchor = String(e.target.innerText.toLowerCase());
        let anchored_element = document.querySelector(`#${anchor}`);
        anchored_element.scrollIntoView({ behavior: "smooth" });
        navbar.classList.add("none");
        hamburger_menu.innerHTML = `<i class="fas fa-bars"></i>`;
        hamburger_menu.style = `position: default;`;
    }
}

function onNavLinkClickDesktop(e) {
    let anchor = String(e.target.innerText.toLowerCase());
    let anchored_element = document.querySelector(`#${anchor}`);
    anchored_element.scrollIntoView({ behavior: "smooth" });
}

function onNavLinkEnterDesktop(e) {
    if (e.key === 'Enter') {
        let anchor = String(e.target.innerText.toLowerCase());
        let anchored_element = document.querySelector(`#${anchor}`);
        anchored_element.scrollIntoView({ behavior: "smooth" });
    }
}

function handle_viewport_change(e) {
    if (e.matches) {
        navbar.classList.add("none");

        header_links.forEach((link) => {
            // https://sebhastian.com/javascript-remove-event-listener/
            link.removeEventListener("click", onNavLinkClickDesktop)
            link.addEventListener("click", onNavLinkClick)

            link.removeEventListener("keydown", onNavLinkEnterDesktop)
            link.addEventListener("keydown", onNavLinkEnter)
        })
    } else if (!e.matches) {
        navbar.classList.remove("none");

        header_links.forEach((link) => {

            link.removeEventListener("click", onNavLinkClick)
            link.addEventListener("click", onNavLinkClickDesktop)

            link.removeEventListener("keydown", onNavLinkEnter)
            link.addEventListener("keydown", onNavLinkEnterDesktop)

        })
    }
}

media.addEventListener("change", handle_viewport_change);
handle_viewport_change(media);