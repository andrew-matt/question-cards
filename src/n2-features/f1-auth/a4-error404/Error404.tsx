import style from './Error404.module.css'

export const Error404 = () => {
    return (
        <div className={style.mainBlock}>
            <div className={style.error}>Oops...</div>
            <div className={style.error}>Something went wrong</div>
        </div>
    )
}