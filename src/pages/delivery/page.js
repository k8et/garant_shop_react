import React from "react";
import {useTranslation} from 'react-i18next';
import Button from "../../components/Button";
import Input from "../../components/Inputs/Input";
import useForm from "../../hooks/useForm";

const initialData = {
    unicode: ""
}
export default function Delivery() {
    const {t} = useTranslation();
    const {handlerChange, handlerSubmit, form} = useForm({
        data: initialData,
        onSubmit
    });

    function onSubmit() {
        window.location.href = `/?uniquecode=${form.unicode}`
    }

    return (
        <main className="flex h-full w-full flex-col bg-[#1C1C1C] max-md:p-3 items-center max-xl:p-11 justify-center">
            <section
                className="flex flex-col justify-center p-11 w-[940px] bg-[#929292]/5 max-xl:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10">
                <h1 className="text-3xl">
                    {t("bought_game")}
                </h1>
                <article className="flex w-full flex-col">
                    <p className="text-2xl text-zinc-400 max-md:text-xl">
                        {t("enter_unique_code")}
                    </p>
                    <div className="mt-4 w-full text-2xl">
                        <Input placeholder={t("unique_code_placeholder")} onChange={handlerChange} name={"unicode"}
                               value={form.unicode}/>
                    </div>
                </article>
                <Button onClick={handlerSubmit}>{t("proceed_to_delivery")}</Button>
            </section>
        </main>
    );
}
