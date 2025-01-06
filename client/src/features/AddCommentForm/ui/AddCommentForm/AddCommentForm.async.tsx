import {FC, lazy} from "react";
import {AddCommentFormProps} from "@/features/AddCommentForm/ui/AddCommentForm/AddCommentForm";

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./AddCommentForm'));
}));
