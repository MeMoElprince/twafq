import Form from './Form/Form'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Login() {
    const { i18n } = useTranslation("global");
    return (
        <>
            <Helmet>
                <title>{i18n.language === 'ar' ? "تسجيل الدخول" : "Login"}</title>
                <meta name='description' content={i18n.language === 'ar' ? "تسجيل الدخول" : "Login"} />
            </Helmet>
            <Form />
        </>
    )
}