import React, {ButtonHTMLAttributes, DetailedHTMLProps, useState} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const [clicked, setClicked] = useState(false)

    const finalClassName = `${red ? s.red : s.default} ${clicked ? s.clicked : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
