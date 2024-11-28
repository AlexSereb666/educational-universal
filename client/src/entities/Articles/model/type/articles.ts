
interface ArticlesTypeBlock {
    id: number;
    name: string;
}

interface ArticlesBlock {
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

export interface Articles {
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
