import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import FindDelivery from "../components/FindDelivery";
import httpService from "../services/httpSevice";
import Error from "../components/Error";
import Default from "../components/Default";
import Start from "../components/Start";


export default function Home() {
    const {t} = useTranslation();
    const [response, setResponse] = useState('');
    const [responseDefault, setResponseDefault] = useState('');
    const [responseInvite, setResponseInvite] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const uniqueCode = params.get("uniquecode");

    const changeUrl = async () => {
        setIsLoading(true)
        const url = `?uniquecode=${uniqueCode}`;
        try {
            const res = await httpService.get(url);
            setResponse(res.data.content);
        } catch (error) {
            console.log(error,"error")
        } finally {
            setIsLoading(false);
        }
    };
    const handleInvite = async () => {
        try {
            const formData = new FormData();
            formData.append('uniq', uniqueCode);
            await httpService.post("/check_add_friend", formData)
                .then(r => {
                    console.log(response, "response")
                    setResponseInvite(r.data.content)
                });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        if (response?.status !== "done_client" && uniqueCode) {
            console.log("asd");
            changeUrl();
        }else {
            httpService.get("/")
                .then(r => {
                    setResponseDefault(r.data.content)
                    console.log(response, "response")
                });
        }
    }, []);



    useEffect(() => {
        if (response?.status === "good") {
            window.location.href = "/finish"
        }
    }, [response]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (response === "wait") {
                changeUrl();
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [response]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (response?.status === "wait_client") {
                handleInvite();
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [response]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (response?.status === "done_client") {
                changeUrl()
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [response?.status === "done_client"]);

    useEffect(() => {
        let timeoutId;

        const checkResponse = () => {
            if (responseInvite === "invite_false") {
                handleInvite()
                timeoutId = setTimeout(checkResponse, 2000);
            }
        };

        checkResponse();

        return () => clearTimeout(timeoutId);
    }, [responseInvite]);

    useEffect(() => {
        if (responseInvite === "invite_true") {
            setResponse(null)
            changeUrl()
        }
    }, [responseInvite]);

    if (isLoading) {
        return <FindDelivery title={t("find_delivery_title")}/>
    }
    if (response?.status === "not_need_client") {
        return <FindDelivery title={"Доставка"} text={"Продолжаю доставку..."}/>
    }
    if (response === "no") {
        return <FindDelivery title={"Доставка"} text={"Наш курьер скоро вам отправит заявку в друзья"}/>
    }
    if (response === "wait") {
        return <FindDelivery title={t("find_delivery_title")}/>
    }
    if (response?.status === "wait_client") {
        return <FindDelivery response={response} client title={"Доставка"}
                             text={"Примите заявку в друзья!"}/>
    }
    if (responseInvite === "invite_false") {
        return <FindDelivery response={response} client title={"Доставка"}
                             text={"Примите заявку в друзья!"}/>
    }
    if (response?.status === "done_client") {
        return <FindDelivery title={"Доставка"} text={"Продолжаю доставку..."}/>
    }
    if (responseInvite === "invite_true") {
        return <FindDelivery title={"Доставка"} text={"Продолжаю доставку..."}/>
    }
    return (
        <main className="flex max-h-full w-full flex-col bg-[#1C1C1C] items-center p-11 max-2xl:p-3 justify-center">
            {response?.status === "uniq_no" &&
                <div>
                    <Error text={t("error_text_uniq_no")}/>
                </div>
            }
            {response?.status === "Manually" &&
                <div>
                    <Error text={t("error_text_manually")}/>
                </div>
            }
            {response?.status === "error_786" &&
                <div>
                    <Error text={t("error_text_error_786")}/>
                </div>
            }
            {response?.status === "error_92" &&
                <div>
                    <Error title={t('error.contactManagerRequired')}
                           text={t('error.manualDelivery')}/>
                </div>
            }
            {response?.status === "error_27" &&
                <div>
                    <Error title={t('error.contactManagerRequired')}
                           text={t('error.manualDelivery')}/>
                </div>
            }
            {response?.status === "error_53" &&
                <div>
                    <Error title={t('error.contactManagerRequired')}
                           text={t('error.wrongCountrySelected')}/>
                </div>
            }
            {response?.status === "error_35" &&
                <div>
                    <Error title={t('error.contactManagerRequired')}
                           text={"Доставка будет проходить в ручном режиме, свяжитесь с менеджером"}/>
                </div>
            }
            {response?.status === "error_98" &&
                <div>
                    <Error title={t('error.contactManagerRequired')}
                           text={"Вы не приняли заявку, доставка будет проходить в ручном режиме. Свяжитесь с менеджером!"}/>
                </div>
            }
            {response?.status === "default" &&
                <div>
                    <Default/>
                </div>
            }
            {responseDefault?.status === "default" &&
                <div>
                    <Default/>
                </div>
            }
            {response?.status === "start" &&
                <div>
                    <Start setResponse={setResponse} data={response}/>
                </div>
            }
            {response?.status === "cancel_buy" &&
                <div>
                    <Error title={t("error_title_cancel_buy")} text={t("error_text_cancel_buy")}/>
                </div>
            }
        </main>
    );
}
