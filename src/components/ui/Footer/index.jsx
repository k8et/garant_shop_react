import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ru from "../../../assets/ru-flag.png"
import en from "../../../assets/uk-flag.png"
import Button from "../../Button";
import Icon from "../../Icon";

const Footer = () => {
    const {t, i18n} = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        toggleDropdown()
    };

    return (
        <div className="w-full h-[100px] z-[120] flex items-center justify-center">
            <div className="flex items-center relative justify-center gap-2 ">
                <a target={"_blank"} href="https://t.me/garantshopinfo" className={"flex gap-2"}>
                    <Icon className="" name="telegram" height={52} width={52}/>
                    <Button className="!bg-none border border-[#745EEC] !h-[53px]">{t('footer.ask_question')}</Button>
                </a>
                <button
                    onClick={toggleDropdown}
                    className="w-[173px] text-2xl h-[53px] max-md:hidden flex items-center justify-center gap-2"
                >
                    <img alt={""} className={"mt-[6px]"} width={30} height={30} src={i18n.language === "ru" ? ru : en}/>
                    {i18n.language === "ru" ? "Русский" : "English"}
                    <Icon className={"mt-[7px]"} name="arrow" height={12} width={12}/>
                </button>
                {isDropdownOpen && (
                    <div
                        className="absolute bottom-[60px]  text-2xl right-0 w-[173px] bg-[#202020]  flex flex-col gap-2 border border-white/10 rounded-xl p-2 shadow-lg">
                        <div
                            className="px-4 py-2 border border-transparent flex items-center justify-between  gap-2 hover:border-white/10 rounded-xl  cursor-pointer hover:bg-[#161718]"
                            onClick={() => changeLanguage('ru')}
                        >
                            <img alt={""} className={"mt-[6px]"} width={30} height={30} src={ru}/>
                            Русский
                        </div>
                        <div
                            className="px-4 py-2 border flex items-center justify-between border-transparent hover:border-white/10 rounded-xl  cursor-pointer hover:bg-[#161718]"
                            onClick={() => changeLanguage('en')}
                        >
                            <img alt={""} className={"mt-[6px]"} width={30} height={30} src={en}/>
                            English
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Footer;
