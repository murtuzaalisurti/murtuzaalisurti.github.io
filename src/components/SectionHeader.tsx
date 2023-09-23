import type { TSectionHeaderWithChildren } from "../lib/types"

const SectionHeader = ({children, heading}: TSectionHeaderWithChildren) => {
    return (
        <>
            <h3 className="section-heading">
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
                <hr />
                {
                    (heading === "projects" && <span>🚀</span>) ||
                    (heading === "experience" && <span>🙃</span>) ||
                    (heading === "contact" && <span>🤙</span>) ||
                    (heading === "socials" && <span>😜</span>)
                }
            </h3>
            {children}
        </>
    )
}

export default SectionHeader