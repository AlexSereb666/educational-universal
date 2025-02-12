import {User} from "entities/User";
import {ArticleTypeBlockList} from "../const/articles";

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

export interface ArticlesType {
    id: number;
    name: string;
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
    user: User;
}
