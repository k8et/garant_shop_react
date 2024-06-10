import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import httpService from "../../services/httpSevice";
import Error from "../Error";
import FindDelivery from "../FindDelivery";
import Input from "../Inputs/Input";
import Button from "../Button";
import useForm from "../../hooks/useForm";
import moment from 'moment-timezone';

const initialData = {
    link: "",
};
const Start = ({data, setResponse}) => {
    const {t, i18n} = useTranslation();
    const {
        dlc,
        about_game_en,
        about_game_ru,
        image,
        image_bot,
        name_game,
        name_main,
        nickname_bot,
        profile_client,
        region_en,
        region_ru,
        date,
        uniquecode
    } = data;
    const [responseStart, setResponseStart] = useState(null);
    const [defaultsLoading, setDefaultLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessStart, setIsSuccessStart] = useState(null);
    const [isSuccessEndBuy, setIsSuccessEndBuy] = useState(null);
    const [responseInvite, setResponseInvite] = useState(null);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const uniqueCode = params.get("uniquecode");

    const changeUrl = async () => {
        setDefaultLoading(true)
        const url = `?uniquecode=${uniqueCode}`;
        try {
            const res = await httpService.get(url);
            setResponse(res.data.content);
        } catch (error) {
            window.location.href = "/delivery"
        } finally {
            setDefaultLoading(false);
        }
    };
    const onSubmit = async (form) => {
        try {
            const formData = new FormData();
            formData.append('new_link', form.link);
            formData.append('uniq', uniquecode);

            const response = await httpService.post("change_url", formData);
            setResponseStart(response.data.content);
        } catch (error) {
            setResponseStart(null);
        } finally {
            changeUrl()
        }
    };
    const handleCancel = async () => {
        try {
            const formData = new FormData();
            formData.append('uniq', uniquecode);
            await httpService.post("cancel_buy", formData)
                .then(r => {
                    setIsSuccess(true);
                });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
        }
    };
    const handleInvite = async () => {
        try {
            const formData = new FormData();
            formData.append('uniq', uniquecode);
            await httpService.post("/check_add_friend", formData)
                .then(r => {
                    console.log(responseInvite, "responseInvite")
                    setResponseInvite(r.data.content)
                });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
        }
    };
    const handleStart = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('uniq', uniquecode);
            formData.append('new_status', "wait_friend_request");
            await httpService.post("start", formData)
                .then(r => {
                    setIsSuccessStart(r.data.content);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleStartForNo = async () => {
        try {
            const formData = new FormData();
            formData.append('uniq', uniquecode);
            formData.append('new_status', "not_update");
            await httpService.post("start", formData)
                .then(r => {
                    setIsSuccessStart(r.data.content);
                });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
        }
    };
    const dlcs = dlc ? dlc.split(',') : [];

    const [timeDifference, setTimeDifference] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const modifiedServerTime = moment(date).add(3, 'minutes').valueOf();
            const currentTimeString = new Date().toLocaleTimeString('ru-RU', {timeZone: 'Europe/Moscow'});
            const currentTimeMillis = Date.parse(`01 Jan 1970 ${currentTimeString} GMT`);
            const differenceInMilliseconds = modifiedServerTime - currentTimeMillis;

            const duration = moment.duration(differenceInMilliseconds);
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            setTimeDifference(t('start.minutes_seconds', {minutes, seconds}));

            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                handleStart()
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const {
        form,
        handlerChange,

        handlerSubmit
    } = useForm({
        onSubmit,
        data: initialData
    });


    useEffect(() => {
        if (isSuccessStart === "not_need_client") {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('uniq', uniquecode);
                httpService.post("end_buy", formData)
                    .then(r => {
                        setIsSuccessEndBuy(r.data.content)
                        setIsLoading(false);
                        if (isSuccessEndBuy === "good") {
                            window.location.href = "/finish"
                        }
                    });
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    }, [isSuccessStart]);

    useEffect(() => {
        if (responseInvite === "invite_true") {
            setIsSuccessStart(null)
            changeUrl()
        }
    }, [responseInvite]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (isSuccessStart === "no") {
                handleStartForNo()
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [isSuccessStart]);


    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (isSuccessStart?.status === "wait_client") {
                handleInvite();
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [isSuccessStart]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (isSuccessStart?.status === "wait_client") {
                const formData = new FormData();
                formData.append('uniq', uniquecode);
                httpService.post("end_buy", formData)
                    .then(r => {
                        console.log(r, "r")
                        setIsSuccessEndBuy(r.data.content)
                        setIsLoading(false);
                    });
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [isSuccessEndBuy]);

    useEffect(() => {
        if (isSuccessEndBuy === "good") {
            window.location.href = "/finish"
        }
    }, [isSuccessEndBuy]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (isSuccessEndBuy === "no") {
                const formData = new FormData();
                formData.append('uniq', uniquecode);
                httpService.post("end_buy", formData)
                    .then(r => {
                        console.log(r, "r")
                        setIsSuccessEndBuy(r.data.content)
                        setIsLoading(false);
                        if (isSuccessEndBuy === "good") {
                            window.location.href = "/finish"
                        }
                    });
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [isSuccessEndBuy]);
    if (defaultsLoading) return <FindDelivery simple/>

    if (isSuccess) return <Error title={t('error.deliveryCancelled')} text={t('error.contactManagerCancelled')}/>;

    if (responseStart?.status === "cant_access") return <Error title={"Не удалось поменять ссылку"}
                                                               text={"На данном этапе нельзя менять ссылку"}/>;

    if (isSuccessEndBuy === "error_53") return <Error title={t('error.contactManagerRequired')}
                                                      text={t('error.wrongCountrySelected')}/>;

    if (isSuccessEndBuy === "error_27") return <Error title={t('error.contactManagerRequired')}
                                                      text={t('error.manualDelivery')}/>;

    if (isSuccessEndBuy === "error_92") return <Error title={t('error.contactManagerRequired')}
                                                      text={t('error.manualDelivery')}/>;

    if (isSuccessStart === "error_98") return <Error
        title={i18n.language === "ru" ? "Требуется связаться с менеджером!" : "Need to contact the manager!"}
        text={i18n.language === "ru" ? "Заявка в друзья не принята, свяжитесь с менеджером!" : "Friend request not accepted, contact the manager!"}/>;

    if (isSuccessStart === "error_35") return <Error title={t('error.contactManagerRequired')}
                                                     text={i18n.language === "ru" ? "Доставка будет проходить в ручном режиме, свяжитесь с менеджером"  : "Friend request not accepted, contact the manager!"}/>;

    if (isLoading) return (
        <FindDelivery
            title={i18n.language === "ru" ? "Доставка" : "Delivery"}
            text={i18n.language === "ru" ? "Продолжаю доставку..." : "Continuing delivery..."}
        />
    );

    if (isSuccessStart === "no") {
        return (
            <FindDelivery
                title={i18n.language === "ru" ? "Доставка" : "Delivery"}
                text={i18n.language === "ru" ? "Наш курьер скоро вам отправит заявку в друзья" : "Our courier will soon send you a friend request"}
            />
        );
    }

    if (isSuccessStart?.status === "wait_client") {
        return (
            <FindDelivery
                response={isSuccessStart}
                client
                title={i18n.language === "ru" ? "Заявка отправлена" : "Request sent"}
                text={i18n.language === "ru" ? "Примите заявку в друзья!" : "Accept the friend request!"}
            />
        );
    }

    if (isSuccessEndBuy === "no") {
        return (
            <FindDelivery
                title={i18n.language === "ru" ? "Доставка" : "Delivery"}
                text={i18n.language === "ru" ? "Продолжаю доставку..." : "Continuing delivery..."}
            />
        );
    }

    if (responseInvite === "invite_true") {
        return (
            <FindDelivery
                title={i18n.language === "ru" ? "Доставка" : "Delivery"}
                text={i18n.language === "ru" ? "Продолжаю доставку..." : "Continuing delivery..."}
            />
        );
    }
    return (
        <main className="flex  w-full flex-col bg-[#1C1C1C]  items-center  justify-center">
            <section
                className="flex flex-col justify-center p-6 w-[1400px] bg-[#929292]/5 rounded-3xl border border-solid border-white border-opacity-10  max-2xl:px-5 max-2xl:w-[768px] max-md:w-full ">
                <div className="max-2xl:max-w-full">
                    <div className="flex gap-5 max-2xl:flex-col max-2xl:gap-0">
                        <div className="flex flex-col w-[69%] max-2xl:ml-0 max-2xl:w-full">
                            <img loading="lazy" src={image} alt="Game Screenshot"
                                 className="grow w-full max-2xl:mt-10 max-2xl:max-w-full"/>
                        </div>
                        <div className="flex flex-col ml-5 w-[38%] max-2xl:ml-0 max-2xl:w-full">
                            <article className="flex flex-col grow pr-10 text-xl leading-6 text-white max-2xl:mt-10">
                                <header className="text-3xl font-semibold leading-6">{name_main}</header>
                                {name_game?.length > 0 &&
                                    <div>
                                        <div
                                            className="self-start mt-7 text-xl  text-zinc-400">{t('start.edition')}</div>
                                        <div className="self-start mt-2 ">{name_game}</div>
                                    </div>
                                }
                                <div className="mt-4 text-xl  text-zinc-400">{t('start.region')}</div>
                                <div className="mt-2">{i18n.language === "ru" ? region_ru : region_en}</div>
                                {dlcs?.length > 0 && (
                                    <>
                                        <div className="mt-4 text-xl  text-zinc-400">{t('start.selected_dlc')}</div>
                                        {dlcs.map((dlc, index) => (
                                            <>
                                                <div
                                                    className="shrink-0 mt-2 h-px bg-zinc-400 bg-opacity-30 rounded-[32px]"/>
                                                <div className="mt-5">{dlc}</div>
                                            </>
                                        ))}
                                    </>
                                )}
                                {dlcs?.length === 0 && (
                                    <>
                                        <div className="mt-4 text-xl  text-zinc-400">{t('start.description')}</div>
                                        <div
                                            className="mt-2 leading-7">{i18n.language === "ru" ? about_game_ru : about_game_en}</div>
                                    </>
                                )}
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="flex flex-col w-[1400px] justify-center p-4 mt-[26px] bg-[#929292]/5 rounded-3xl border border-solid border-white border-opacity-10 max-2xl:px-5 max-2xl:mt-10 max-2xl:w-[768px] max-md:w-full">
                <div className="flex gap-5 justify-between w-full max-2xl:flex-wrap max-2xl:max-w-full">
                    <div className="flex gap-5 justify-between whitespace-nowrap leading-[130%] max-2xl:flex-wrap">
                        <img loading="lazy" src={image_bot} alt="Profile of GARANTSHOP_RU2"
                             className="shrink-0 aspect-square w-[76px]"/>
                        <div className="flex flex-col my-auto max-2xl:max-w-full">
                            <div className="text-xl font-medium text-white max-2xl:max-w-full">
                                {nickname_bot}
                            </div>
                            <a href={profile_client} target="_blank" rel="noopener noreferrer"
                               className="mt-4 text-xl text-blue-500 max-xl:max-w-full break-words whitespace-normal break-all">
                                {profile_client}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col my-auto">
                        <div className="text-xl  text-zinc-400">
                            {t('start.delivery_starts_in')}
                        </div>
                        <div className="mt-4 text-xl  text-white">
                            {timeDifference}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="flex gap-5 w-[1400px] justify-between rounded-3xl mt-[26px] max-2xl:w-[768px] max-2xl:flex-wrap max-xl:flex-col max-md:w-full">
                <article className="flex flex-col max-2xl:pl-5 max-2xl:max-w-full">
                    <p className="text-xl  text-zinc-400 max-2xl:max-w-full">
                        {t('start.not_your_profile')}
                    </p>
                    <div className="flex gap-4 mt-4 items-center text-xl leading-8 max-2xl:flex-wrap">
                        <Input placeholder={"Новая ссылка на профиль"} name={"link"} onChange={handlerChange}
                               value={form.link}
                               className={"!w-[600px] max-md:!w-full"}/>
                        <Button onClick={handlerSubmit}>{t('start.update')}</Button>
                    </div>
                </article>
                <article className="flex flex-col px-5">
                    <p className="text-xl  text-zinc-400">
                        {t('start.skip_timer')}
                    </p>
                    <div className="flex gap-4 mt-4 items-center text-xl leading-8 max-2xl:flex-wrap">
                        <Button onClick={handleStart}>{t('start.deliver_now')}</Button>
                    </div>
                </article>
                <article className="flex flex-col px-5">
                    <p className="text-xl  text-zinc-400">
                        {t('start.changed_mind')}
                    </p>
                    <div className="flex gap-4 mt-4 items-center text-xl leading-8 max-2xl:flex-wrap">
                        <Button onClick={handleCancel} red>{t('start.cancel_delivery')}</Button>
                    </div>
                </article>
            </section>
        </main>

    );
};

export default Start;

