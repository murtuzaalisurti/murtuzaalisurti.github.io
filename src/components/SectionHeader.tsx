import type { TSectionHeaderWithChildren } from "../lib/types"

const SectionHeader = ({ children, heading, emoji }: TSectionHeaderWithChildren) => {
    return (
        <>
            <h3 className="section-heading">
                <span className="headingAnchorLink">
                    <a href={`#${heading}`}><sup>🔗</sup></a>
                </span>
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
                <hr />
                <span>{emoji}</span>
            </h3>
            { children }
        </>
    )
}

export default SectionHeader