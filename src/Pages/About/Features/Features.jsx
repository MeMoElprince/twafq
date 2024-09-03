import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Img from "../../../../src/assets/Image1.png"
import SingleFeature from "./Components/SingleFeature";

export default function Features() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  return (
    <section className="">
        <div className="pb-40 bg-White">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2
                        className="font-heading mb-4 bg-LightPink px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-Black uppercase title-font">
                        Why choose us?
                    </h2>
                    <p className="font-heading mt-2 text-3xl leading-8 font-semibold mx-auto tracking-tight text-Black sm:text-4xl">
                        We know tech, we know finance. We are fintech experts.
                    </p>
                    <p className="mt-4 max-w-2xl text-lg text-Black/70 mx-auto">
                        We know how to handle taxation for all the
                        countried we operate in. We care for our customers and help them manage cashflows.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

                        <SingleFeature 
                            image= "https://www.svgrepo.com/show/503163/api-settings.svg" 
                            title= "Powerful API" 
                            description= "Lorem ipsum, dolor sit amet consectetur adipisicing eli. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione." 
                        />
                        <SingleFeature 
                            image= "https://www.svgrepo.com/show/503138/webpack.svg" 
                            title= "Easy to integrate" 
                            description= "Lorem ipsum, dolor sit amet consectetur adipisicing eli. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione." 
                        />
                        <SingleFeature 
                            image= "https://www.svgrepo.com/show/511771/dashboard-671.svg" 
                            title= "Low Transaction Cost" 
                            description= "Lorem ipsum, dolor sit amet consectetur adipisicing eli. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione." 
                        />
                        <SingleFeature 
                            image= "https://www.svgrepo.com/show/511771/dashboard-671.svg" 
                            title= "Powerful Dashboard" 
                            description= "Lorem ipsum, dolor sit amet consectetur adipisicing eli. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione." 
                        />
                    </dl>
                </div>

            </div>
        </div>
    </section>
  );
}