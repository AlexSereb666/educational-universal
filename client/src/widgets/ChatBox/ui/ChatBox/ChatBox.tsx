import {memo, useEffect} from "react";
import {useSelector} from "react-redux";
import {getIdSelectedUserMessanger} from "@/entities/SelectedUserMessanger";

export const ChatBox = memo(() => {
    const id = useSelector(getIdSelectedUserMessanger);

    useEffect(() => {
        console.log('ПРОВЕРКА', id)
    }, [id]);

    return (
        <div>
            {id}
        </div>
    )
})
