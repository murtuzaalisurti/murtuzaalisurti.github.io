import type { PropsWithChildren } from "react"

export interface TList {
    section: string,
    list: {
        id: number,
        title: string,
        desc: string,
        url: string | undefined
    }[]
}

export type TListPropsWithChildren = PropsWithChildren<TList>

export interface TExperienceBlock {
    section: string,
    list: {
        id: number,
        title: string,
        link: string,
        startDate: string,
        endDate: string,
        role: string
    }[]
}

export type TExperienceBlockWithChildren = PropsWithChildren<TExperienceBlock>