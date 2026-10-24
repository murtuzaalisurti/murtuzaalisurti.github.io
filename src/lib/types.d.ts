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

// a milestone line: plain text with optional inline links
export type MilestonePart = string | { text: string; href: string };

export interface Milestone {
    year: number;
    parts: MilestonePart[];
}
