import ListItem from "./ListItem";

export default function ExtraDetails({ itemDetials }) {
    return (
        <>
            <div className='Fredoka pb-20 h-full w-[95%] flex flex-col lg:flex-row gap-14 px-4 overflow-hidden'>
                <div className="flex flex-col w-full h-full gap-8">
                    <h3 className="text-3xl font-medium">Description</h3>
                    <p className="text-Black text-lg">{itemDetials.description}</p>
                </div>
                <div className="flex flex-col w-full h-full gap-8">
                    <h3 className="text-3xl font-medium">Details</h3>
                    <div className="w-full h-full gap-4 flex">
                        <ul className='list-disc'>
                            {
                                itemDetials.configurations.map((item, index) => {
                                    return <ListItem key={index} label={item.name} text={item.value} />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}