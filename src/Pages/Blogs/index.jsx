import React, {useState, useEffect} from 'react'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import { BlogCard } from './Components/BlogCard';
import { Helmet } from 'react-helmet-async';
import { getBlogs } from '../../Store/urls';
import { TbHeartSearch } from "react-icons/tb";
import useFetch from '../../Components/CustomHooks/useFetch';
import { Link } from 'react-router-dom';

export default function Blogs(){
    const { isRTL, setIsRTL } = useLayoutDirection();
    const { t, i18n } = useTranslation("global");
    var english = /^[A-Za-z]*$/;
    const { retData: blogs, loading: blogsLoading } = useFetch({
        url: getBlogs(),
        method: 'GET',
      });
    const [blogsS, setBlogsS] = useState(blogs);
    const [loadingBlogs, setLoadingBlogs] = useState(blogsLoading);

    useEffect(() => {
        if (blogs) {
            setBlogsS(blogs);
            setLoadingBlogs(false);
        }
        // console.log(blogsS)
    }, [blogs])
    
    return(
        <div className='w-full flex justify-center items-center flex-col bg-White myFont min-h-screen'>
            <Helmet>
                <title>{t('blogs.title')}</title>
                <meta name='description' content={t('blogs.description')} />
            </Helmet>
            <div className="h-full relative py-36 w-full">
                <div className="absolute inset-0 h-full w-full bg-White [background:radial-gradient(125%_125%_at_50%_10%,#fff_50%,#e84762_100%)] opacity-20"></div>
                <div className="w-[90%] h-full mx-auto">
                    <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-DarkPink after:rounded-full mb-10">{i18n.language === 'ar' ? 'المدونة' : 'Blogs'}</h2>
                    </div>
                        <div className='gap-12 flex flex-grow w-full flex-wrap justify-center items-center px-[5%]'>
                            {
                            !loadingBlogs && blogsS && blogsS?.length > 0 &&
                            (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
                                    {
                                    blogsS?.map((el, index) => (
                                        <Link key={el.id} to={`/blogs/${el.id}`} aria-label={el.title}>
                                            <BlogCard
                                                key = {el.id}
                                                title = {el.title} 
                                                img = {el.image}
                                                description = {el?.sentences[0].sentence}
                                                date = {el.date}
                                            />
                                        </Link>
                                    ))
                                    }
                                </div>
                            )
                            }
                            {
                            !loadingBlogs && blogsS && !blogsS?.length && <div className='w-full center flex-col h-screen gap-4'>
                                <TbHeartSearch className='text-DarkPink size-[160px] sm:size-[240px]' />
                                <p className='text-xl sm:text-3xl text-center font-medium'>{i18n.language === 'ar' ? "لا يوجد مقالات" : "There is no blogs"}</p>
                            </div>
                            }
                            {
                            loadingBlogs && <>
                                {[...Array(9)].map((start, index) => {
                                return <LoadingSpinner key={index} />
                                })}
                            </>
                            }
                        </div>
                </div>
            </div>
        </div>
    );
}


const LoadingSpinner = () => {
    return (
      <div className="bg-white p-6 select-none relative h-96 border border-Black/20 w-[320px] rounded-2xl myFont overflow-hidden mx-auto mt-12 animate-pulse center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }