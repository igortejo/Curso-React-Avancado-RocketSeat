import { ImgHTMLAttributes } from "react";

import styles from "./Avatar.module.css"

// A ? diz que a propriedade é opcional
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
}
// "...props" pega todas as propriedades que aquele elemento tem disponivel sem eu precisar ficar declarando

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    return (
        <img 
        className={hasBorder ? styles.avatarWithBorder : styles.avatar}
        {...props}
        />
    )
}