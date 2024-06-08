import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from "../Button";

const Error = ({ text, title, status }) => {
    const { t } = useTranslation();

    return (
        <section
            className="flex flex-col justify-center p-11 max-md:p-3 w-[810px] bg-[#929292]/5 max-xl:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10">
            <h1 className={"text-3xl text-center text-white"}>
                {title ? title : t('error.default_title')}
            </h1>
            <p className="text-2xl text-zinc-400 text-center">
                {text}
            </p>
            <Button href={status === "uniq_no" ? "https://t.me/garantshopinfo" : "https://oplata.info/"} className={"!h-[50px]"}>
                {t('error.contact_button')}
            </Button>
        </section>
    );
};

export default Error;
