import React from "react";
import classNames from "classnames";


interface IconAttrProps {
    name: string;
    size?: number | string;
}


const MyIcon: React.FC<IconAttrProps> = ({name, size = 70}) => {
    const icon_src = `src/assets/icons/circle_banner/${name}.svg`;
    return (
        <img src={icon_src} alt={name} width={size} height={size} className={classNames('object-cover')} />
    )
}




export default MyIcon;

