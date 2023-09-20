import type { TSocialListWithChildren } from "../lib/types"

const SocialList = ({ list }: TSocialListWithChildren) => {
    return <div id="socialList">
        {
            list.map((social, i) => {
                return <span key={i}>
                    <a href={social.link}>{social.text}</a>
                    {i !== list.length - 1 ? <p>•</p> : <></>}
                </span>
            })
        }
    </div>
}

export default SocialList