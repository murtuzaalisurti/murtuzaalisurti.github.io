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

export interface TExperienceBlock {
    list: {
        id: number,
        title: string,
        link: string,
        startDate: string,
        endDate: string,
        role: string
    }[]
}

export interface TSectionHeader {
    heading: string
}

export interface TSocialList {
    list: {
        link: string,
        text: string
    }[]
}

export type TListPropsWithChildren = PropsWithChildren<TList>
export type TExperienceBlockWithChildren = PropsWithChildren<TExperienceBlock>
export type TSectionHeaderWithChildren = PropsWithChildren<TSectionHeader>
export type TSocialListWithChildren = PropsWithChildren<TSocialList>