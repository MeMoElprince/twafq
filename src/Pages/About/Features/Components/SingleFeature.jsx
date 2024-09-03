import React from 'react'

export default function SingleFeature({image, title, description}) {
  return (
    <div className="relative">
        <dt>
            <div
                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-White">
                <img src={image} />
            </div>
            <p className="font-heading ml-16 text-lg leading-6 font-bold text-Black">{title}</p>
        </dt>
        <dd className="mt-2 ml-16 text-base text-Black/70">
            {description}
        </dd>
    </div>
  )
}
