import React from "react";
import {useTranslation} from "react-i18next";

export default function Finish() {
    const {t, i18n} = useTranslation();

    return (
        <main className="flex h-full w-full flex-col bg-[#1C1C1C]  items-center max-xl:p-3  justify-center ">
            <section
                className="flex relative flex-col justify-center p-11 w-[940px] items-center bg-[#929292]/5 max-xl:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10 ">
                <div className={"w-full flex items-center flex-col gap-3"}>
                    <h1 className={"text-3xl text-center"}>
                        {t('home.delivery_completed')}
                    </h1>
                    <p className="text-[20px] text-center text-zinc-400  whitespace-pre-wrap">
                        {t('home.enjoy_game_leave_review')}
                    </p>
                </div>
                <article className="flex w-full gap-5 flex-col">
                    <div className={"grid w-full grid-cols-2 max-xl:grid-cols-1 gap-5"}>
                        <a
                            target={"_blank"}
                            href="https://steamcommunity.com/my/inventory/#pending_gifts"
                            className={"justify-center w-full items-center flex  px-3.5 h-[50px] text-[18px] font-medium text-center text-violet-50 rounded-xl shadow-sm !bg-[#4F4F4F] max-md:text-xl"}
                            rel="noreferrer">
                            {t('home.add_to_library')}
                        </a>
                        <a
                            target={"_blank"}
                            href="https://store.steampowered.com/account/licenses/"
                            className={"justify-center w-full items-center flex  px-3.5 h-[50px] text-[18px] font-medium text-center text-violet-50 rounded-xl shadow-sm !bg-[#4F4F4F] max-md:text-xl"}
                            rel="noreferrer">
                            {t('home.check_edition')}
                        </a>
                    </div>
                    <a
                        className={`justify-center !bg-[#4F4F4F] items-center flex px-2 h-[50px] text-[18px] whitespace-nowrap max-md:text-[18px] font-medium text-center text-violet-50 rounded-xl shadow-sm`}
                        target={"_blank"}
                        href={"https://oplata.info/"}
                    >
                        {i18n.language === "ru" ? "Как оставить отзыв?" : "How leave feedback?"}
                    </a>
                    <a
                        className={`justify-center bg-blue-gradient items-center flex px-2 h-[50px] text-[18px] whitespace-nowrap max-md:text-[18px] font-medium text-center text-violet-50 rounded-xl shadow-sm`}
                        target={"_blank"}
                        href={"https://oplata.info/"}
                    >
                        {t('home.go_to_delivery')}
                    </a>

                </article>
                {/*<a*/}
                {/*    className={` absolute left-0 ml-11 bottom-3 border-b`}*/}
                {/*    target={"_blank"}*/}
                {/*    href={"https://oplata.info/"}*/}
                {/*>*/}
                {/*    {i18n.language === "ru" ? "Как оставить отзыв?" : "How leave feedback?"}*/}
                {/*</a>*/}
            </section>
        </main>
    );
}
