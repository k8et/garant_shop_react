import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useLocation} from "react-router-dom";
import Icon from "../../Icon";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {t} = useTranslation();
    const location = useLocation();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMenuOpen]);

    return (
        <div
            className="h-[100px] z-30 bg-[#202020]/50 w-full flex border-b border-white/10 items-center justify-center">
            <Link to={"/"}>
                <h1 className="text-4xl absolute left-[50px] top-[30px] max-md:left-[25px] text-left max-md:top-[33px] max-md:text-2xl font-bold text-white">
                    GARANT SHOP
                </h1>
            </Link>
            <div className={"flex text-[#A9ABAD] text-2xl gap-10 max-xl:hidden"}>
                <Link to={""}>{t('header.balance')}</Link>
                <Link className={`${location.pathname === "/delivery" && "!text-white"}`}
                      to={"/delivery"}>{t('header.find_delivery')}</Link>
            </div>
            <div onClick={toggleMenu}>
                <Icon
                    className={"absolute right-10 top-[35px] block xl:hidden cursor-pointer"}
                    width={32}
                    height={32}
                    name={!isMenuOpen ? `burger` : `close`}
                />
            </div>
            {isMenuOpen && (
                <div
                    className="absolute top-[100px] bottom-0 w-full  right-0 bg-[#202020] h-full flex flex-col items-start p-11 text-[#A9ABAD] text-2xl gap-6 xl:hidden">
                    <h1 className={"text-3xl text-white"}>{t('header.navigation')}</h1>
                    <Link to={""} onClick={toggleMenu}>{t('header.balance')}</Link>
                    <Link to={"/delivery"} onClick={toggleMenu}>{t('header.find_delivery')}</Link>
                </div>
            )}
        </div>
    );
};

export default Header;
