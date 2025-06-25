import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import CustomHeader from "../../components/custom-header";
import BredCrumb from "../../components/ui/breadcrumb";
import { SortableContext } from "@dnd-kit/sortable";

import custombanner from "../../assets/custom-banner.png";
import TimeDurationInput from "../../components/ui/timeDurationInput";
import SortableItem from "../../components/ui/sortableItem";

import mustang from "../../assets/mustang.jpg";
import sword from "../../assets/sword.png";
import bicycle from "../../assets/bicycle.JPG";
import Footer from "../../components/footer";

export default () => {

    const [startingTimeGap, setStartingTimeGap] = useState(0);
    const [endingTimeGap, setEndingTimeGap] = useState(0);

    const [items, setItems] = useState([
        {
            id: 1,
            title: "Classic Car",
            description: "A well-maintained 1967 Ford Mustang in original condition.",
            images: [mustang, "mustang.png"],
            status: 'notSheduled',
            increment: 10000,
            startingBid: 200000,
            timeLeft: "3 days 4 hours",
            totalBids: 15,
            location: "Colombo, Sri Lanka",
            caseNumber: "SL-12345",
        },
        {
            id: 3,
            title: "Antique Bicycle",
            description: "Classic Raleigh bicycle from the 1940s, in working order.",
            images: [bicycle, "bicycle.png"],
            status: 'notSheduled',
            increment: 5000,
            startingBid: 90000,
            timeLeft: "2 days 2 hours",
            totalBids: 7,
            location: "Galle, Sri Lanka",
            caseNumber: "SL-12346"
        },
        {
            id: 5,
            title: "Ancient Sword",
            description: "An ancient ceremonial sword with intricate designs.",
            images: [sword, "sword.png"],
            status: 'notSheduled',
            increment: 500,
            startingBid: 2000,
            timeLeft: "3 days 8 hours",
            totalBids: 19,
            location: "Anuradhapura, Sri Lanka",
            caseNumber: "SL-12347"
        }
      ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
        }
    };

    return (
        <>
            <CustomHeader />

            {/* dashboard header */}
            <header className="bg-[#1e3a5f] shadow-sm py-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-4">
                            <img 
                            src={custombanner} 
                            alt="Sri Lanka Customs" 
                            className="hidden md:block h-16 w-auto rounded-lg" 
                            />              
                            <div className="md:border-l md:border-[#2d4a6b] pl-4">
                                <h1 className="text-lg  md:text-2xl font-bold text-white">Schedule Auctions</h1>
                                <p className="text-xs md:text-sm text-white/80">Set auction start time and end time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <BredCrumb page="Schedule Auctions" breadCrumbs={[
                { title: "Home", link: "/AuctionMan" },
            ]} />
            <form className="flex flex-col items-center justify-center gap-5 px-4 form-style">
                <div className="w-full">
                    <div className="max-w-6xl bg-white shadow rounded-lg p-3 my-1 mx-auto items-center justify-around gap-3 flex flex-wrap">
                        <div className="flex flex-wrap gap-10">
                            <div className="flex-1 flex gap-3 justify-center">
                                <div>
                                    <label className="whitespace-nowrap">Starting Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        />
                                </div>
                                <div>
                                    <label className="whitespace-nowrap">Increment Start Time By</label>
                                    <TimeDurationInput onChange={setStartingTimeGap}/>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex gap-3 justify-center">
                                <div>
                                    <label>Ending Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        />
                                </div>
                                <div>
                                    <label className="whitespace-nowrap">Increment End Time By</label>
                                    <TimeDurationInput onChange={setEndingTimeGap}/>
                                </div>
                            </div>
                        </div>
                        
                        <button className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4 mt-auto flex items-center border border-gray-200 shadow-sm cursor-pointer">Auto-Populate Dates/Times</button>
                    </div>
                </div>
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="w-full max-w-6xl grid border-y sm:border border-gray-200 rounded-lg pb-2 sm:p-2">
                            <div className="text-gray-600 rounded-lg p-3 my-1 items-end gap-3 select-none grid grid-cols-[subgrid] col-span-5">
                                <div />
                                <div />
                                <div>
                                    <p className="font-bold text-md">Title</p>
                                    <p className="text-sm">Case Number</p>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-lg font-bold text-green-600">Starting Bid</p>
                                    <p className="text-sm">Increment</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-1">
                                    <p className="text-sm flex-1">Starting Time</p>
                                    <p className="text-sm flex-1">Ending Time</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[subgrid] col-span-5">
                                {items.map((item) => (
                                    <SortableItem key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="flex items-center justify-end col-span-5 mt-3">
                                <button
                                    type="button"
                                    className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4 mt-auto flex items-center border border-gray-200 shadow-sm cursor-pointer"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </SortableContext>
                </DndContext>
            </form>
            <Footer />
        </>
    );
}