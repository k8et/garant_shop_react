import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from "../Button";
import Loader from "../Loader";

const FindDelivery = ({title, text, client, response, simple}) => {
    const {t} = useTranslation();
    if (simple) {
        return <div
            className={"absolute z-[99] bg-[#1C1C1C] left-0  top-0 h-full w-full flex items-center justify-center"}>
            <section
                className="flex flex-col justify-center max-md:p-3  p-11 w-[514px] max-h-[271px] bg-[#929292]/5 max-xl:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10 ">
                <Loader/>
            </section>
        </div>
    }
    return (
        <div className={"absolute z-[99] bg-[#1C1C1C] left-0 p-4 top-0 h-full w-full flex items-center justify-center"}>
            {client ?
                <section
                    className="flex flex-col justify-center items-center max-md:p-3 p-11 w-[554px] max-h-[350px] bg-[#929292]/5 max-md:w-full gap-8 rounded-3xl border border-solid border-white border-opacity-10 ">
                    <div className={"flex items-center flex-col gap-3"}>
                        <h1 className={"text-3xl text-center text-white"}>
                            {title ? title : t('findDelivery.searchingForDelivery')}
                        </h1>
                        {text &&
                            <p className={"text-xl text-zinc-400 text-center"}>
                                {!text ? t('findDelivery.text') : text}
                            </p>
                        }
                    </div>
                    <div
                        className="flex gap-5 justify-between p-2 text-xl font-medium leading-8 whitespace-nowrap rounded-2xl border border-solid border-white border-opacity-10 w-[498px] max-sm:!max-w-full">
                        <div className="flex gap-5 justify-between text-white">
                            <img loading="lazy" src={response?.second_image} alt={"imgAlt"}
                                 className="shrink-0 aspect-square w-[53px]"/>
                            <div className="my-auto">{response?.second_nickname}</div>
                        </div>
                        <Button className={"!my-auto"}>
                            <a target={"_blank"} href={`https://steamcommunity.com/profiles/${response?.number}/`}>
                                Открыть
                            </a>
                        </Button>
                    </div>
                        <Loader/>
                </section>
                :
                <section
                    className="flex flex-col justify-center max-md:p-3  p-11 w-[514px] max-h-[271px] bg-[#929292]/5 max-md:w-full gap-11 rounded-3xl border border-solid border-white border-opacity-10 ">
                    <div className={"flex items-center flex-col gap-3"}>
                        <h1 className={"text-3xl text-center text-white"}>
                            {title ? title : t('findDelivery.searchingForDelivery')}
                        </h1>
                        {text &&
                            <p className={"text-xl text-zinc-400 text-center"}>
                                {!text ? t('findDelivery.text') : text}
                            </p>
                        }
                    </div>
                    <Loader/>
                </section>
            }
        </div>
    );
};

export default FindDelivery;
