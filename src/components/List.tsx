import type { TListPropsWithChildren } from "../lib/types";

const List = ({ children, list, section }: TListPropsWithChildren) => {
    if (section === "experience" || section === "projects") {
        return (
            <>
                <h3>{section.charAt(0).toUpperCase() + section.slice(1)}<hr /></h3>
                <div className="listContainer">
                    {
                        list.map(entry => {
                            return (
                                <div key={entry.id} className="item">
                                    <a href={entry.url}>{entry.title}</a>
                                    <p>{entry.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    return <></>
}

export default List