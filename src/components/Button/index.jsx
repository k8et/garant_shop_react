import {Link} from "react-router-dom";

const Button = ({ children, className, href, red, ...rest }) => {
    const baseClass = `justify-center items-center flex px-3.5 h-[50px] text-2xl max-md:text-xl font-medium text-center text-violet-50 rounded-xl shadow-sm ${className}`;
    const gradientClass = red ? 'bg-red-gradient' : 'bg-blue-gradient';

    return href ? (
        <Link
            to={href}
            className={`${baseClass} ${gradientClass}`}
            {...rest}
        >
            {children}
        </Link>
    ) : (
        <button
            className={`${baseClass} ${gradientClass}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
