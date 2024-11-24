export class CreateArticlesDto {
    readonly id: number;
    readonly title: string;
    readonly subtitle: string;
    readonly img: string;
    readonly view: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
