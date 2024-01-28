import type { TSectionHeaderWithChildren } from "../lib/types"

const SectionHeader = ({ children, heading, emoji, anchor }: TSectionHeaderWithChildren) => {
    return (
        <>
            <h3 className="section-heading">
                <span className="headingAnchorLink">
                    <a href={`#${anchor}`}><sup>🔗</sup></a>
                </span>
                {heading}
                <hr />
                <span>{emoji}</span>
            </h3>
            {children}
        </>
    )
}

export default SectionHeader