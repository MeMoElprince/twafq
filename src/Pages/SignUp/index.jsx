import Form from './Form/Form'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const { t, i18n } = useTranslation("global");
    return (
        <>
            <Helmet>
                <title>{i18n.language === 'ar' ? "إنشاء حساب" : "Sign Up"}</title>
                <meta name='description' content={i18n.language === 'ar' ? "إنشاء حساب" : "Sign Up"} />
            </Helmet>
            <Form />
        </>
    )
}