import type { TListPropsWithChildren } from "../lib/types";
import { motion } from "framer-motion";

const List = ({ list }: TListPropsWithChildren) => {
    return (
        <div>
            <ol
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
            </ol>
        </div>
    )
}

export default List