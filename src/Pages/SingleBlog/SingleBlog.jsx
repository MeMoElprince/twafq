import React from 'react'
import {useTranslation} from "react-i18next"
import { BlogCard } from './Components/BlogCard';

export default function SingleBlog() {
    const { t, i18n } = useTranslation("global");

    function NewSentence({title, sentence, link}){
        return (
            <div className="flex flex-col gap-1 py-4">
                {title && <h3 className='text-2xl font-bold text-Black'>{title}</h3>}
                <p className='text-base'>{sentence}</p>
                {link && <a href={link.href} target='_blank' className='text-blue-500 font-medium underline max-w-max'>{link.text}</a>}
            </div>
        )
    }

  return (
    <div className="w-[90%] mx-auto py-[20vh] myFont flex justify-between gap-8 items-center flex-col lg2:flex-row lg2:items-start">
        <div className="w-[90%] lg2:w-[80%] max-w-4xl bg-white shadow-sm border border-Black/20 rounded-[4px] p-10 h-max flex flex-col">
            <div className="py-8">
                <h1 className="text-4xl font-bold mb-3 text-Black">Blog post title</h1>
                <p className="text-gray-500 text-sm"><time datetime="2022-04-05">April 5, 2022</time></p>
            </div>

            <img src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c" alt="Featured image" className="w-full h-auto mb-8" />


            <NewSentence title="" sentence="Integer ullamcorper leo nulla, nec commodo metus vehicula eget. Duis vel vestibulum tellus, eget mattis
                    quam. Nullam euismod libero sed nibh tristique, vel eleifend risus sagittis. In hac habitasse platea
                    dictumst. Sed dapibus magna at arcu euismod, a pulvinar turpis tristique. Suspendisse imperdiet velit
                    nec lectus rutrum varius." />

            <NewSentence title="This is new two" sentence="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius fringilla augue, vel vestibulum
                    nisl mattis vel. Praesent porttitor pharetra purus eu tincidunt."
                link={{href:"https://google.com", text: "click here to go"}}    
            />

            <NewSentence sentence="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius fringilla augue, vel vestibulum
                    nisl mattis vel. Praesent porttitor pharetra purus eu tincidunt." 
                    link={{href:"https://google.com", text: "click here to go"}}
            />

            <button className="text-White bg-Black hover:bg-[#302c2c] tracking-wide rounded-full text-base sm:text-lg px-4 py-5 w-[100%] md:w-[60%] mt-24 self-center font-semibold">{"Explore more blogs"}</button>
        </div>
        <div className="bg-white w-[90%] lg2:w-[30%] h-max flex flex-col p-10 gap-8 shadow-sm border rounded-[4px] border-Black/20">
            <h4 className='text-3xl font-semibold text-Black'>{i18n.language === 'ar' ? "الأكثر قراءة" : "Popular"}</h4>
            <div className="flex flex-col md1:flex-row justify-center lg2:flex-col items-start gap-6 w-full">
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
            </div>
        </div>
    </div>
  )
}
