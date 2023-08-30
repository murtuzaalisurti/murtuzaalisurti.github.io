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