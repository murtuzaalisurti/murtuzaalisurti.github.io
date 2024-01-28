import type { PropsWithChildren } from "react"

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

export type TListPropsWithChildren = PropsWithChildren<TList>
export type TSectionHeaderWithChildren = PropsWithChildren<TSectionHeader>
export type TSocialListWithChildren = PropsWithChildren<TSocialList>