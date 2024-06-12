import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from "../Button";
import {Link} from "react-router-dom";

const Default = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col justify-center items-center p-11 w-full max-md:p-3 gap-11">
            <h1 className="text-3xl">{t('default.search_delivery')}</h1>
            <div className="gap-[20px] grid grid-cols-1 max-xl:grid-cols-2 max-md:grid-cols-1">
                {/*<div className="flex flex-col justify-center items-center p-8 w-[244px] bg-[#929292]/5 gap-8 rounded-3xl border border-solid border-white border-opacity-10">*/}
                {/*    <h1 className="text-2xl">{t('default.top_up')}</h1>*/}
                {/*    <Button>{t('default.go_to')}</Button>*/}
                {/*</div>*/}
                <div className="flex flex-col justify-center items-center p-8 w-[244px] bg-[#929292]/5 gap-8 rounded-3xl border border-solid border-white border-opacity-10">
                    <h1 className="text-2xl">{t('default.games_dlc')}</h1>
                    <Link to={"/delivery"}>
                        <Button>{t('default.go_to')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Default;
