import {memo, useCallback} from "react";
import * as cls from './AddCommentForm.module.scss';
import {TextArea} from "@/shared/ui/TextArea/TextArea";
import {Button} from "@/shared/ui/Button/Button";
import {useSelector} from "react-redux";
import {getAddCommentFormError, getAddCommentFormText} from "../../model/selectors/addCommentFormSelectors";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {addCommentFormActions, addCommentFormReducer} from "../../model/slice/AddCommentFormSlice";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

export interface AddCommentFormProps {
    onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const {
        onSendComment
    } = props;

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text);
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.container}>
                <div className={cls.text}>
                    <TextArea
                        size={'small'}
                        value={text}
                        onChange={onCommentTextChange}
                        placeholder={'Введите текст комментария...'}
                    />
                </div>
                <div className={cls.btn}>
                    <Button
                        size={'small'}
                        onClick={onSendHandler}
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </DynamicModuleLoader>
    )
});

export default AddCommentForm;
