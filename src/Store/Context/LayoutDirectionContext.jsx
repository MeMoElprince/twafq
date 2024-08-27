import React, { createContext, useContext, useState, useEffect } from "react";

const LayoutDirectionContext = createContext();

export const useLayoutDirection = () => {
  return useContext(LayoutDirectionContext);
};

export const LayoutDirectionProvider = ({ children }) => {
  const [isRTL, setIsRTL] = useState(() => {
    const storedIsRTL = localStorage.getItem("isRTL");
    return storedIsRTL === "true";
  });

  useEffect(() => {
    localStorage.setItem("isRTL", isRTL.toString());
  }, [isRTL]);

  useEffect(() => {
    // After the language direction changes, update the root HTML element
    const rootHtml = document.getElementById("root-html");
    if (rootHtml) {
      rootHtml.setAttribute("dir", isRTL ? "rtl" : "ltr");
      rootHtml.setAttribute("lang", isRTL ? "ar" : "en");
    }
  
    document.title = isRTL ? "عرايس" : "Arayes";

    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute(
        "content",
        isRTL
          ? "اعثر على شريك حياتك المثالي على عرايس، منصة المواعدة الرائدة. نستخدم اختبار الألوان لنجد أفضل شخص يتناسب معك وفقًا لاختبار الألوان."
          : "Find your perfect match on Arayes, the premier matchmaking platform. We use a color test to find the best match person with you according to the color test."
      );
    }
  }, [isRTL]);  

  return (
    <LayoutDirectionContext.Provider value={{ isRTL, setIsRTL }}>
      {children}
    </LayoutDirectionContext.Provider>
  );
};
