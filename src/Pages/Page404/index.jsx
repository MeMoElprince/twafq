import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Page404() {
  const { i18n } = useTranslation("global");

  const isArabic = i18n.language === 'ar';

  return (
    <section className="flex items-center  h-screen my-[10vh] myFont">
      <div className="container flex justify-center flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-Black">
            <span className="sr-only myFont">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl max-w-[90%]">
            {isArabic ? "عذرًا، لم نتمكن من العثور على هذه الصفحة." : "Sorry, we couldn't find this page."}
          </p>
          <Link 
            to="/"
            className="px-8 py-4 text-xl max-w-[90%] font-semibold rounded-full bg-DarkPink hover:bg-[#e84762] text-White"
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
