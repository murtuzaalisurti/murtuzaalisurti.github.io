export interface TList {
    section: string,
    list: {
        id: string,
        title: string,
        desc?: string,
        url?: string
    }[]
}

export interface TSectionHeader {
    heading: string,
    anchor: string,
    emoji: string
}

export interface TSocialList {
    list: {
        link: string,
        text: string
    }[]
}
