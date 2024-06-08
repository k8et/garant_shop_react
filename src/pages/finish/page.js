import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";

export default function Finish() {
    const { t } = useTranslation();

    return (
        <main className="flex h-full w-full flex-col bg-[#1C1C1C]  items-center max-xl:p-3  justify-center ">
            <section
                className="flex flex-col justify-center p-11 w-[940px] items-center bg-[#929292]/5 max-xl:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10 ">
                <div className={"w-full flex items-center flex-col gap-3"}>
                    <h1 className={"text-3xl text-center"}>
                        {t('home.delivery_completed')}
                    </h1>
                    <p className="text-2xl text-center text-zinc-400 ">
                        {t('home.enjoy_game_leave_review')}
                    </p>
                </div>
                <article className="flex w-full gap-5 flex-col">
                    <div className={"grid w-full grid-cols-2 max-xl:grid-cols-1 gap-5"}>
                        <a
                            target={"_blank"}
                            href="https://steamcommunity.com/my/inventory/#pending_gifts"
                            className={"justify-center w-full items-center flex  px-3.5 h-[50px] text-2xl font-medium text-center text-violet-50 rounded-xl shadow-sm !bg-[#4F4F4F] max-md:text-xl"} rel="noreferrer">
                            {t('home.add_to_library')}
                        </a>
                        <a
                            target={"_blank"}
                            href="https://store.steampowered.com/account/licenses/"
                            className={"justify-center w-full items-center flex  px-3.5 h-[50px] text-2xl font-medium text-center text-violet-50 rounded-xl shadow-sm !bg-[#4F4F4F] max-md:text-xl"} rel="noreferrer">
                            {t('home.check_edition')}
                        </a>
                    </div>
                    <Button href="https://oplata.info/" className={"w-full"}>
                        {t('home.go_to_delivery')}
                    </Button>
                </article>
            </section>
        </main>
    );
}
