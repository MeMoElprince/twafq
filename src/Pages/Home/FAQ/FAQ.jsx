import React from 'react'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import SingleFAQ from './Components/SingleFAQ';

const questions = [
    {
        "question": {
            "ar": "كيف أنشئ حساب جديد؟",
            "en": "How do I create a new account?"
        },
        "answer": {
            "ar": "لإنشاء حساب، يمكنك النقر على زر \"إنشاء حساب\" وملء الحقول المطلوبة مثل الاسم، البريد الإلكتروني، وكلمة المرور والمعلومات الشخصية المطلوبة. بعد إدخال بعض البيانات الشخصية، عليك القيام باختبار الألوان. بعد إكمال النموذج، اضغط على \"إنشاء حساب\"، وسيتم إنشاء حسابك. ستتلقى رسالة تأكيد بالبريد الإلكتروني للتحقق من تسجيلك.",
            "en": "To create an account, simply click on the \"Sign Up\" button and fill in the required fields such as your name, email, password, and other personal information. After providing some personal details, you will be required to take the color test. Once you have completed the form, click \"Sign Up,\" and your account will be created. You will receive a confirmation email to verify your registration."
        }
    },
    {
        "question": {
            "ar": "كيف يمكنني حساب التوافق بدقة؟",
            "en": "How can I ensure accurate compatibility calculation?"
        },
        "answer": {
            "ar": "تستخدم منصتنا خوارزميات متقدمة لتحليل التوافق بناءً على تفضيلات الألوان ونتائج اختيار الألوان بدقة. يجب الحرص على اختيار الألوان في اختبار الألوان بدقة وملء جميع الحقول المطلوبة للحصول على نتائج دقيقة.",
            "en": "Our platform uses advanced algorithms to analyze compatibility based on factors like color preferences and accurate results from the color selection test. For the most accurate results, make sure to carefully choose your colors during the color test and fill in all the required fields."
        }
    },
    {
        "question": {
            "ar": "كيف أحصل على بيانات تواصل شخص ما؟",
            "en": "How can I obtain someone's contact information?"
        },
        "answer": {
            "ar": "يتم الحصول على بيانات التواصل بالضغط على زر \"طلب بيانات التواصل\" للشخص المطلوب وإتمام عملية الدفع. بعد إتمام الدفع سيظهر الرقم في قائمة التواصل.",
            "en": "To obtain someone's contact information, click the \"Request Contact Information\" button for the desired person and complete the payment process. Once the payment is made, the phone number will be displayed in the contact list."
        }
    },
    {
        "question": {
            "ar": "ما فائدة توثيق الحساب؟",
            "en": "What is the benefit of account verification?"
        },
        "answer": {
            "ar": "يضيف توثيق الحساب طبقة إضافية من الثقة والأمان إلى المنصة. الحسابات الموثقة تكون أكثر مصداقية، مما يزيد من فرص بناء علاقات موثوقة. كما يساعد في تقليل خطر الحسابات الوهمية ويضمن أن المستخدمين يتفاعلون مع أشخاص حقيقيين.",
            "en": "Account verification adds an extra layer of trust and security to the platform. Verified accounts are more likely to be genuine, which increases the chances of building trustworthy connections. It also helps reduce the risk of fake profiles and ensures that users interact with real people."
        }
    },
    {
        "question": {
            "ar": "ما فائدة المستشار الأسري؟",
            "en": "What is the benefit of a family counselor?"
        },
        "answer": {
            "ar": "يمكن للمستشار الأسري تقديم نصائح وإرشادات خبراء أثناء عملية التوفيق. يساعدون المستخدمين في اتخاذ قرارات مدروسة ويقدمون الدعم للتغلب على أي تحديات قد تظهر في بناء علاقة صحية. تكون إرشاداتهم ذات قيمة كبيرة لتحقيق التوافق على المدى الطويل ونجاح العلاقة.",
            "en": "A family counselor can provide expert advice and guidance during the matchmaking process. They help users make informed decisions and offer support in overcoming any challenges that may arise in building a healthy relationship. Their insights can be invaluable for long-term compatibility and relationship success."
        }
    },
    {
        "question": {
            "ar": "كيف أحمي نفسي من السبام والأشخاص غير الجادين؟",
            "en": "How can I protect myself from spam and unreliable individuals?"
        },
        "answer": {
            "ar": "للحماية من السبام والأشخاص غير الجادين، يُنصح باستخدام رقم هاتف غير الرقم الشخصي لعرضه على الموقع لضمان الأمان الشخصي. كما يُفضل اختيار الأشخاص الذين يمتلكون حسابات موثقة، حيث إن ذلك يدل على جدية المستخدمين.",
            "en": "To protect yourself from spam and unreliable individuals, it is recommended to use a phone number that is not your personal one when displaying it on the site for personal safety. Additionally, prefer to connect with individuals who have verified accounts, as this indicates their seriousness."
        }
    }
];


export default function FAQ() {
    const { isRTL, setIsRTL } = useLayoutDirection();
    const { t, i18n } = useTranslation("global");
  return (
    <div className="sm:px-8 px-4 myFont py-24 w-full flex flex-col justify-center items-center">
      <div className="mb-12 max-w-4xl">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{i18n.language === 'ar' ? "الأسئلة الشائعة" : "Frequently asked questions"}</h2>
      </div>
      <div className="flex flex-wrap gap-6 w-[95%] items-center justify-center">
        {
            questions.map((question, index) => (
                <SingleFAQ
                    key = {index}
                    theme = {index % 2 == 0 ? 0 : 1}
                    question = {i18n.language === 'ar' ? question.question.ar : question.question.en}
                    answer = {i18n.language === 'ar' ? question.answer.ar : question.answer.en}
                />
            ))
        }
      </div>
    </div>
  )
}
