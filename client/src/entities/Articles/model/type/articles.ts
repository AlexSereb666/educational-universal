
export enum ArticleTypeBlockList {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE',
}

interface ArticlesTypeBlock {
    id: number;
    name: ArticleTypeBlockList;
}

export interface ArticlesBlock {
    id: number;
    step: number;
    content: string;
    title: string;
    typeBlock: ArticlesTypeBlock;
}

interface ArticlesType {
    id: number;
    name: string;
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    view: number;
    createdAt: string;
    updatedAt: string;
    types: ArticlesType[];
    blocks: ArticlesBlock[];
}
