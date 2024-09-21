import React, {useState, useEffect} from 'react'
import {useTranslation} from "react-i18next"
import { BlogCard } from './Components/BlogCard';
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext';
import { useParams } from 'react-router-dom';
import { getSingleBlog } from '../../Store/urls';
import { getMostViewBlogs } from '../../Store/urls';
import { increaseViewCount } from '../../Store/urls';
import useFetch from '../../Components/CustomHooks/useFetch';
import imgHolder from '../Blogs/Components/assets/imgHolder.webp'
import { Link } from 'react-router-dom';
import Fetch from '../../Components/CustomHooks/Fetch'

export default function SingleBlog() {
    const { t, i18n } = useTranslation("global");
    const { isRTL, setIsRTL } = useLayoutDirection();
    var english = /^[A-Za-z\s]*$/;
    const { id } = useParams();
    const { retData: blog, loading: blogLoading } = useFetch({
        url: `${getSingleBlog()}blogId=${id}`,
        method: 'GET',
      });
    const [blogG, setBlogG] = useState(blog);
    const [loadingBlog, setLoadingBlog] = useState(blogLoading);
    const { retData: mostViewBlogs, loading: mostViewBlogsLoading } = useFetch({
        url: getMostViewBlogs(),
        method: 'GET',
      });
    const [mostViewBlogsS, setMostViewBlogsS] = useState(mostViewBlogs);
    const [loadingMostView, setLoadingMostView] = useState(mostViewBlogsLoading);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            Fetch({
                url: `${increaseViewCount()}blogId=${id}`,
                method: 'post',
              });
        }, 60000);

        return () => clearTimeout(timeoutId);
    }, [id])


    useEffect(() => {
        if (blog) {
            setBlogG(blog);
            setLoadingBlog(false);
        }
    }, [blog])

    useEffect(() => {
        if (mostViewBlogs) {
            setMostViewBlogsS(mostViewBlogs);
            setLoadingMostView(false);
        }
    }, [mostViewBlogs])

    function LoadingSpinner(){
        return (
          <div className="bg-white p-6 select-none relative h-[100px] border border-Black/20 w-full rounded-sm myFont overflow-hidden mx-auto animate-pulse center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        )
      }


    function NewSentence({title, sentence, link}){
        return (
            <div className="flex flex-col gap-3 py-4">
                {title !== "" && title !== null && <h3 className='text-xl sm2:text-3xl font-bold text-Black'
                    style={{
                        direction: (isRTL && english.test(title.split(" ")[0])) 
                        ? "ltr" 
                        : (!isRTL && !english.test(title.split(" ")[0])) 
                        ? "rtl" 
                        : ""
                    }}
                >{title}</h3>}
                <p className='text-sm sm2:text-lg'
                style={{
                    direction: (isRTL && english.test(sentence.split(" ")[0])) 
                    ? "ltr" 
                    : (!isRTL && !english.test(sentence.split(" ")[0])) 
                    ? "rtl" 
                    : ""
                }}
                >{sentence}</p>
                {link !== "" && link !== null && <a href={link.href} target='_blank' alt={`link to ${link.title || "something"}`} className='text-blue-500 font-medium underline w-full' 
                    style={{
                        direction: (isRTL && english.test(link.text.split(" ")[0])) 
                        ? "ltr" 
                        : (!isRTL && !english.test(link.text.split(" ")[0])) 
                        ? "rtl" 
                        : ""
                    }}
                >{link.text}</a>}
            </div>
        )
    }

    const randomIdx = [0, 1, 2];

  return (
    <div className="w-[90%] mx-auto py-[20vh] myFont flex justify-between gap-8 items-center flex-col lg2:flex-row lg2:items-start">
        <div className="w-[95%] lg2:w-[80%] max-w-4xl bg-white shadow-sm border border-Black/20 rounded-[4px] p-5 sm2:p-10 h-max flex flex-col">
            <div className="py-8">
                <h1 className="text-2xl sm2:text-4xl font-bold text-center mb-3 text-Black">{blogG?.title}</h1>
                <p className="text-gray-500 text-sm">
                    <time dateTime="2022-04-05">
                        {new Date(blogG?.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </time>
                </p>
            </div>

            <img src={blogG?.image} loading='lazy' alt="Blog Image" className="w-full h-auto mb-8" />


            {
                blogG?.sentences.map((el, index) => (
                    <NewSentence
                        key={index}
                        title={el.title}
                        sentence={el.sentence}
                        link={el.link}
                    />
                ))
            }

            <button className="text-Black bg-DarkPink/60 shadow-sm border border-Black/10 hover:bg-DarkPink hover:text-White transition-all duration-200 tracking-wide rounded-full text-base sm:text-lg px-4 py-5 w-[100%] md:w-[60%] mt-24 self-center font-semibold">{i18n.language === 'ar' ? "تصفح المزيد" : "Explore more blogs"}</button>
        </div>
        <div className="bg-white w-[95%] lg2:w-[30%] h-max flex flex-col p-5 sm2:p-10 gap-8 shadow-sm border rounded-[4px] border-Black/20">
            <h4 className='text-3xl font-semibold text-Black'>{i18n.language === 'ar' ? "الأكثر شهرة" : "Popular"}</h4>
            <div className="flex flex-col md1:flex-row justify-center lg2:flex-col items-start gap-6 w-full">
                {
                    loadingMostView && 
                    <>
                    {[...Array(3)].map((start, index) => {
                        return <LoadingSpinner key={index} />
                    })}
                    </>
                }
                {
                    !loadingMostView && mostViewBlogsS && 
                    <>
                        {
                            randomIdx.map((el, index) => (
                                el < mostViewBlogsS.length && (
                                    <Link key = {index} to={`/blogs/${mostViewBlogsS[el].id}`} aria-label={mostViewBlogsS[el].title}>
                                        <BlogCard 
                                            title = {mostViewBlogsS[el].title} 
                                            img = {mostViewBlogsS[el].image} 
                                            description = {mostViewBlogsS[el]?.sentences[0].sentence}
                                        />
                                    </Link>
                                )
                            ))
                        }
                    </>
                }
            </div>
        </div>
    </div>
  )
}
