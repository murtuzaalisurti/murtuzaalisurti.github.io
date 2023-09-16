import type { TExperienceBlockWithChildren } from "../lib/types"

const ExperienceBlock = ({ children, list, section }: TExperienceBlockWithChildren) => {
    return (
        <div>
            <h3>{section.charAt(0).toUpperCase() + section.slice(1)}<hr /></h3>

            {list.map(block => {
                return (
                    <div key={block.id}>
                        <div className="data-box">
                            <div className="timeline">
                                <div className="line"></div>
                                <div className="point"></div>
                            </div>
                            <div className="data">
                                <div className="role">
                                    {block.link ?
                                        (
                                            <a rel="noreferrer" target="_blank" href={block.link}>{block.title}</a>
                                        ) : (
                                            <>{block.title}</>
                                        )
                                    }
                                </div>
                                <p className="time">{block.startDate} - {block.endDate}</p>
                                <p className="exp-desc">{block.role}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ExperienceBlock