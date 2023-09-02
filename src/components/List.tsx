import type { TListPropsWithChildren } from "../lib/types";
import { motion } from "framer-motion";

const List = ({ children, list, section }: TListPropsWithChildren) => {
    if (section === "experience" || section === "projects") {
        return (
            <>
                <h3>{section.charAt(0).toUpperCase() + section.slice(1)}<hr /></h3>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="listContainer"
                >
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
                </motion.div>
            </>
        )
    }
    return <></>
}

export default List