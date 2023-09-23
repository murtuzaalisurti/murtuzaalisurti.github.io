import type { TListPropsWithChildren } from "../lib/types";
import { motion } from "framer-motion";

const List = ({ list }: TListPropsWithChildren) => {
    return (
        <div>
            <motion.ol
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="listContainer"
            >
                {
                    list.map(entry => {
                        return (
                            <li key={entry.id} className="item">
                                <a href={entry.url}>{entry.title}</a> - {entry.desc}
                            </li>
                        )
                    })
                }
            </motion.ol>
        </div>
    )
}

export default List