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

export interface TSectionHeader {
    heading: string,
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