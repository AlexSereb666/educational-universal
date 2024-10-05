import cls from './PageError.module.scss';

export const PageError = () => {

    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={cls.PageError}>
            <p>{'Произошла непредвиденная ошибка'}</p>
            <button onClick={reloadPage}>
                {'Обновить страницу'}
            </button>
        </div>
    );
};
