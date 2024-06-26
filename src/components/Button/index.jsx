import React from "react";

const Button = ({children, className, href, red, ...rest}) => {
    const baseClass = `justify-center items-center flex px-2 h-[40px] text-[18px] whitespace-nowrap max-md:text-[18px] font-medium text-center text-violet-50 rounded-xl shadow-sm ${className}`;
    const gradientClass = red ? 'bg-red-gradient' : 'bg-blue-gradient';

    return href ? (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
            target={"_blank"}
            href={href}
            className={`${baseClass} ${gradientClass} ${className}`}
            {...rest}
        >
            {children}
        </a>
    ) : (
        <button
            className={`${baseClass} ${gradientClass} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
