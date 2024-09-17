import React, {useState, useEffect} from 'react'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import { BlogCard } from './Components/BlogCard';
import { Helmet } from 'react-helmet-async';

export default function Blogs(){
    const { isRTL, setIsRTL } = useLayoutDirection();
    const { t, i18n } = useTranslation("global");
    const [formData, setFormData] = useState(
		{
            name: '',
			email: '',
            subject: '',
            message: ''
		}
	)

	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value
			}
		})
        console.log(formData);
	}
    
    return(
        <div className='w-full flex justify-center items-center flex-col bg-White myFont min-h-screen'>
            <Helmet>
                <title>{t('blogs.title')}</title>
                <meta name='description' content={t('blogs.description')} />
            </Helmet>
            <div className="h-full relative py-36 w-full">
                <div className="absolute inset-0 h-full w-full bg-White [background:radial-gradient(125%_125%_at_50%_10%,#fff_50%,#e84762_100%)]"></div>
                <div className="w-[90%] h-full mx-auto">
                    <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-DarkPink after:rounded-full">{i18n.language === 'ar' ? 'المدونة' : 'Blogs'}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
                        <BlogCard 
                            title = "A Guide to Igniting Your Imagination" 
                            img = "https://readymadeui.com/Imagination.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "Trends and Predictions" 
                            img = "https://readymadeui.com/prediction.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "5 OCT 2023 | BY SIMON KONECKI"
                        />
                        <BlogCard 
                            title = "Hacks to Supercharge Your Day" 
                            img = "https://readymadeui.com/hacks-watch.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "A Guide to Igniting Your Imagination" 
                            img = "https://readymadeui.com/Imagination.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "Trends and Predictions" 
                            img = "https://readymadeui.com/prediction.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "5 OCT 2023 | BY SIMON KONECKI"
                        />
                        <BlogCard 
                            title = "Hacks to Supercharge Your Day" 
                            img = "https://readymadeui.com/hacks-watch.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "A Guide to Igniting Your Imagination" 
                            img = "https://readymadeui.com/Imagination.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "Trends and Predictions" 
                            img = "https://readymadeui.com/prediction.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "5 OCT 2023 | BY SIMON KONECKI"
                        />
                        <BlogCard 
                            title = "Hacks to Supercharge Your Day" 
                            img = "https://readymadeui.com/hacks-watch.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "Hacks to Supercharge Your Day" 
                            img = "https://readymadeui.com/hacks-watch.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                        <BlogCard 
                            title = "Hacks to Supercharge Your Day" 
                            img = "https://readymadeui.com/hacks-watch.webp"
                            description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula."
                            date = "10 FEB 2023 | BY JOHN DOE"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
