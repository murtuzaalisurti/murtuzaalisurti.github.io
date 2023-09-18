import type { TListPropsWithChildren } from "../lib/types";
import { motion } from "framer-motion";

const List = ({ list }: TListPropsWithChildren) => {
    return (
        <div>
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
        </div>
    )
}

export default List