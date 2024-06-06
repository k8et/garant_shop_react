import React from "react";


const Icon = ({name, className = "", width = 24, height = 24}) => {
    const widthClass = `${width}px`;
    const heightClass = `${height}px`;

    return (
        <svg
            style={{width: widthClass, height: heightClass}}
            className={`icon ${widthClass} ${heightClass} ${className}`}
        >
            <use xlinkHref={`/icons/icons-master.svg#${name}`}/>
        </svg>
    );
};

export default Icon;
