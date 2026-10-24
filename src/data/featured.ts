// featured links shown in the slider. Each one plays on the Macintosh's screen
// as a "channel card": screen.title in big type, screen.subtitle in small
// type, on screen.color. customImage pins a thumbnail (used where the screen
// can't be drawn) when the site's Open Graph image is unreliable
export const featured: {
    link: string;
    customTitle?: string;
    customImage?: string;
    screen: { title: string; subtitle: string; color: string };
}[] = [
    {
        link: "https://www.youtube.com/watch?v=2Oxu4y-RLrs",
        screen: {
            title: "The voice of simplicity",
            subtitle: "What the JAM · podcast",
            color: "#2f55d4",
        },
    },
    {
        link: "https://www.youtube.com/watch?v=7nG-x3Fs3oY",
        screen: {
            title: "Building projects & learning mindset",
            subtitle: "Ganesh Patil's podcast",
            color: "#c9502a",
        },
    },
    {
        customTitle: "AI Hackathon Winner at Imriel (Allata)",
        // LinkedIn sometimes serves a generic placeholder to the scraper
        customImage:
            "https://media.licdn.com/dms/image/v2/D4D22AQHTbZRF5eswmA/feedshare-image-high-res/feedshare-image-high-res/0/1728365637255?e=2147483647&v=beta&t=tMKNIQGPlfx4z2s09uAj27jOgKLsI3hmSmuNSyhSlTw",
        link: "https://www.linkedin.com/posts/imriel-technology-solutions-private-limited_imriel-allata-aihackathon-activity-7249290910922924032-Mqgj?utm_source=share&utm_medium=member_desktop",
        screen: {
            title: "AI hackathon winner",
            subtitle: "Imriel · an Allata company · 2024",
            color: "#1f7a5c",
        },
    },
];

// some sites (e.g. LinkedIn) return a brand bug or placeholder — prefer a real image
export const pickImage = (imgs?: { url: string }[]) => {
    if (!imgs || !imgs.length) return null;
    const real = imgs.find(
        (i) =>
            i.url &&
            !i.url.includes("linkedin-bug-color") &&
            !i.url.includes("static.licdn.com")
    );
    return (real || imgs[imgs.length - 1] || imgs[0]).url;
};
