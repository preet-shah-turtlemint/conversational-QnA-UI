export interface SideNavConfigType {
    title: string;
    links: Link[];
    permission: string;
}

export interface Link {
    text: string;
    link: string;
    permission: string;
}