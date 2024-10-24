import {memo} from "react";
import {useSelector} from "react-redux";
import * as cls from './ChatBox.module.scss';
import {getChatMessangerChat, getChatMessangerIsLoading} from "@/entities/ChatMessanger";
import {Loader} from "@/shared/ui/Loader/Loader";

export const ChatBox = memo(() => {
    const chat = useSelector(getChatMessangerChat);
    const isLoading = useSelector(getChatMessangerIsLoading);

    return (
        <div className={cls.chat_box}>
            {isLoading ? (
                <div className={cls.not_found_chat}>
                    <Loader/>
                </div>
            ) : chat ? (
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            ) : (
                <div className={cls.not_found_chat}>
                    Выберите чат для начала общения
                </div>
            )}
        </div>
    )
})
