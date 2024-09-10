import React from 'react'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import SingleFAQ from './Components/SingleFAQ';

const questions = [
    {
        "question" : {
        "ar" : "كيف انشئ حساب جديد؟",
        "en": "How do I create a new account?"
        },
        "answer": {
            "ar" : "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
            "en": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sit magni placeat beatae eveniet illo, quam eaque quibusdam suscipit laborum omnis dolorum! Hic, ea provident vitae officia quidem doloremque dolor."
        }
    },
    {
        "question" : {
        "ar" : "كيف انشئ حساب جديد؟",
        "en": "How do I create a new account?"
        },
        "answer": {
            "ar" : "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
            "en": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sit magni placeat beatae eveniet illo, quam eaque quibusdam suscipit laborum omnis dolorum! Hic, ea provident vitae officia quidem doloremque dolor."
        }
    },
    {
        "question" : {
        "ar" : "كيف انشئ حساب جديد؟",
        "en": "How do I create a new account?"
        },
        "answer": {
            "ar" : "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
            "en": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sit magni placeat beatae eveniet illo, quam eaque quibusdam suscipit laborum omnis dolorum! Hic, ea provident vitae officia quidem doloremque dolor."
        }
    },
    {
        "question" : {
        "ar" : "كيف انشئ حساب جديد؟",
        "en": "How do I create a new account?"
        },
        "answer": {
            "ar" : "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
            "en": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sit magni placeat beatae eveniet illo, quam eaque quibusdam suscipit laborum omnis dolorum! Hic, ea provident vitae officia quidem doloremque dolor."
        }
    },
    {
        "question" : {
        "ar" : "كيف انشئ حساب جديد؟",
        "en": "How do I create a new account?"
        },
        "answer": {
            "ar" : "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
            "en": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sit magni placeat beatae eveniet illo, quam eaque quibusdam suscipit laborum omnis dolorum! Hic, ea provident vitae officia quidem doloremque dolor."
        }
    },
]

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
