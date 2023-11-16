import type { TExperienceBlockWithChildren } from "../lib/types"
import { DateTime } from 'luxon'
const ExperienceBlock = ({ list }: TExperienceBlockWithChildren) => {
    return (
        <div className="experience-data">
            {
                list.map(block => {
                    const ArrayStartDate = block.startDate.split(",").filter(i => i !== " ").map(e => e.trim())

                    const ArrayEndDate = block.endDate === "Present" ?
                        `${new Date().toLocaleString('default', { month: 'short' })}, ${new Date().getFullYear()}`.split(",").filter(i => i !== " ").map(e => e.trim())
                        : block.endDate.split(",").filter(i => i !== " ").map(e => e.trim());

                    ArrayStartDate.unshift("1")
                    ArrayEndDate.unshift("1")

                    const EndDate = DateTime.fromFormat(ArrayEndDate.join(" "), "d MMM yyyy");
                    const StartDate = DateTime.fromFormat(ArrayStartDate.join(" "), "d MMM yyyy");

                    const diffObject = EndDate.diff(StartDate, ['years', 'months'])
                    const diffYears = diffObject.years
                    const diffMonths = diffObject.months
                    return (
                        <div key={block.id} id={`${block.id}`}>
                            <div className="data-box">
                                <div className="timeline">
                                    <div className="line"></div>
                                    <div className="point"></div>
                                </div>
                                <div className="data">
                                    <div className="role">
                                        {block.link ?
                                            (
                                                <h4><a rel="noreferrer" target="_blank" href={block.link}>{block.title}</a></h4>
                                            ) : (
                                                <h4>{block.title}</h4>
                                            )
                                        }
                                    </div>
                                    <p className="time">{block.startDate} - {block.endDate} • {diffYears ? `${diffYears} yr` : ''}{diffMonths ? ` ${diffMonths} mos` : ''}</p>
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