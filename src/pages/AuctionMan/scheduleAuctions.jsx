import { useEffect, useState, useRef, useCallback } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useNavigate } from "react-router-dom";

import { dayjs } from '../../function';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import CustomHeader from "../../components/custom-header";
import BredCrumb from "../../components/ui/breadCrumb";
import { SortableContext } from "@dnd-kit/sortable";

import custombanner from "../../assets/custom-banner.png";
import TimeDurationInput from "../../components/ui/timeDurationInput";
import SortableItem from "../../components/ui/sortableItem";
import { addFlashMessage } from "../../flashMessageCenter";

import Footer from "../../components/footer";
import Loading from "../../components/loading";
import axios from "axios";

// ✅ Set default timezone to Sri Lanka
dayjs.tz.setDefault('Asia/Colombo');

export default () => {

    const initialMinTime = useRef(dayjs().endOf('minute')); // Initialize with current date/time using dayjs

    const [startingDateTime, setStartingDateTime] = useState("");
    const [endingDateTime, setEndingDateTime] = useState("");
    const [startingTimeGap, setStartingTimeGap] = useState(0);
    const [endingTimeGap, setEndingTimeGap] = useState(0);
    const [allFieldsField, setAllFieldsFilled] = useState(false);
    const [endingTimeMin, setEndingTimeMin] = useState(initialMinTime.current); // Initialize endingTimeMin with initialMinTime
    const [startTimeError, setStartTimeError] = useState(false);
    const [endTimeError, setEndTimerError] = useState(false);
    const [gapError, setGapError] = useState(false);

    const [items, setItmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const startDate = startingDateTime ? dayjs(startingDateTime) : null;
        const endDate = endingDateTime ? dayjs(endingDateTime) : null;

        // Check if start/end dates are in the past
        // Use dayjs().startOf('minute') for more accurate "now" comparison
        const isStartInvalid = startDate && startDate.isBefore(initialMinTime.current);
        const isEndInvalid = endDate && endDate.isBefore(initialMinTime.current);

        // Check if gap is less than 6 hours
        const isGapInvalid = startDate && endDate && endDate.diff(startDate, 'hour') < 6;

        setStartTimeError(isStartInvalid);
        setEndTimerError(isEndInvalid);
        setGapError(isGapInvalid);
    }, [startingDateTime, endingDateTime]);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItmes((itmes) => {
                const oldIndex = itmes.findIndex((item) => item.id === active.id);
                const newIndex = itmes.findIndex((item) => item.id === over.id);
                return arrayMove(itmes, oldIndex, newIndex);
            });
        }
    }, []); // No dependencies, so empty array

    const handleStart = useCallback((id, startingTime) => {
        setItmes((items) =>
            items.map((item) =>
                item.id === id ? { ...item, startingTime } : item
            )
        );
    }, []); // No dependencies

    const handleEnd = useCallback((id, endingTime) => {
        setItmes((items) =>
            items.map((item) =>
                item.id === id ? { ...item, endingTime } : item
            )
        );
    }, []); // No dependencies

    const autoPopulate = useCallback(() => {
        const startDayjs = dayjs(startingDateTime);
        const endDayjs = dayjs(endingDateTime);
        if (!startDayjs.isValid() || !endDayjs.isValid()) {
            console.warn("Invalid starting or ending date/time for auto-population. Please select valid initial dates.");
            return;
        }
        let i = 0;
        const newItems = items.map((item) => {
            const calculatedStart = startDayjs.add(startingTimeGap * i, 'minute');
            const calculatedEnd = endDayjs.add(endingTimeGap * i, 'minute');
            i++;
            return {
                ...item,
                startingTime: calculatedStart,
                endingTime: calculatedEnd
            };
        });
        setItmes(newItems);
    }, [startingDateTime, endingDateTime, startingTimeGap, endingTimeGap, items]); // dependencies


    useEffect(() => {
        let flag = true;
        for (const item of items) {
            if (!item.startingTime || !item.endingTime) {
                flag = false;
                break;
            }
        }
        setAllFieldsFilled(flag);
    }, [items]);

    useEffect(() => {
        const saved = localStorage.getItem("selectedItems");
        const selectedIds = saved ? JSON.parse(saved) : [];

        axios.post("http://localhost:8082/is/v1/itemsToSchedule", selectedIds)
        .then((response) => {
            setItmes(response.data.map(item => ({
                ...item,
                startingTime: "",
                endingTime: ""
            })))
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const schedule = useCallback(() => {
        const itemsToSchedule = items.map(item => (
            {
                id: item.id,
                startingTime: item.startingTime,
                endingTime: item.endingTime
            }
        ));
        console.log(itemsToSchedule);
        axios.post("http://localhost:8082/is/v1/schedule", itemsToSchedule)
        .then(res => {
            const {status, data} = res;
            if (status === 200 && data.success) {
                addFlashMessage('success', 'Auctions scheduled successfully');
                navigate('/auctionMan');
            } else {
                addFlashMessage('error', 'Failed to schedule auctions. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error scheduling auctions:', error);
            addFlashMessage('error', 'Failed to schedule auctions. Please try again.');
        });
    }, [items]);

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
                                <h1 className="text-lg md:text-2xl font-bold text-white">Schedule Auctions</h1>
                                <p className="text-xs md:text-sm text-white/80">Set auction start time and end time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <BredCrumb page="Schedule Auctions" breadCrumbs={[
                { title: "Home", link: "/AuctionMan" },
            ]} />
            <form className="flex flex-col items-center justify-center gap-5 px-4">
                <div className="w-full">
                    <div className="max-w-6xl bg-white shadow rounded-lg p-3 my-1 mx-auto items-center justify-around gap-3 flex flex-wrap">
                        <div className="flex flex-wrap gap-10">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="flex-1 flex gap-3 justify-center">
                                    <div>
                                        <label className="whitespace-nowrap block text-sm font-medium mb-2">Starting date and time</label>
                                        <DateTimePicker
                                            value={startingDateTime ? dayjs(startingDateTime) : null}
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                            onChange={(newValue) => {
                                                // Update the startingDateTime state
                                                setStartingDateTime(newValue);
                                                // Set the minimum for the ending picker to the newly selected starting time
                                                setEndingTimeMin(newValue ? dayjs(newValue).add(6, 'hour') : initialMinTime.current);
                                            }}
                                            minDateTime={initialMinTime.current}
                                            // Removed maxDateTime prop as startingTimeMax is not defined
                                            format="DD/MM/YYYY HH:mm"
                                            slotProps={{ textField: { 
                                                size: "small", 
                                                error: startTimeError,
                                                helperText: startTimeError ? "Cannot be in the past." : null
                                                }}}
                                            ampm={false}
                                        />
                                    </div>
                                    <div>
                                        <label className="whitespace-nowrap block text-sm font-medium mb-2">Increment Start Time By</label>
                                        <TimeDurationInput onChange={setStartingTimeGap} />
                                    </div>
                                </div>

                                <div className="flex-1 flex gap-3 justify-center">
                                    <div>
                                        <label className="whitespace-nowrap block text-sm font-medium mb-2">Ending date and time</label>
                                        <DateTimePicker
                                            value={endingDateTime ? dayjs(endingDateTime) : null}
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                            onChange={(newValue) => {
                                                setEndingDateTime(newValue);
                                            }}
                                            minDateTime={endingTimeMin}
                                            format="DD/MM/YYYY HH:mm"
                                            ampm={false}
                                            slotProps={{ textField: {
                                                size: "small",
                                                error: endTimeError || gapError,
                                                helperText: endTimeError ? "Cannot be in the past." : gapError ? "There should be at least 6 hours gap" : null
                                                }}}
                                        />
                                    </div>
                                    <div>
                                        <label className="whitespace-nowrap block text-sm font-medium mb-2">Increment End Time By</label>
                                        <TimeDurationInput onChange={setEndingTimeGap} initialMinutes={15} />
                                    </div>
                                </div>
                            </LocalizationProvider>
                        </div>
                        
                        <button
                            className={`bg-[#1e3a5f] text-white hover:bg-[#2d4a6b]
                                        rounded-lg py-2 px-4 mt-auto flex items-center border
                                        border-gray-200 shadow-sm
                                        ${startingDateTime && endingDateTime && !(startTimeError || endTimeError || gapError) ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                                        type="button"
                                        onClick={autoPopulate}>
                            Auto-Populate Dates/Times
                        </button>
                    </div>
                </div>
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="w-full max-w-6xl grid border-y sm:border border-gray-200 rounded-lg pb-2 sm:p-2">
                            
                            {loading ? (<Loading />) : (
                                <>
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
                                            <p className="text-sm flex-1"><strong>Starting and Ending Times.</strong> (An auction should last for at least 6 hours)</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[subgrid] col-span-5">
                                        {items.map((item) => (
                                            <SortableItem key={item.id} item={item} setStart={handleStart} setEnd={handleEnd} />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-end col-span-5 mt-3">
                                        <button
                                            type="button"
                                            className={`bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4
                                                        mt-auto flex items-center border border-gray-200 shadow-sm
                                                        ${allFieldsField ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                                            onClick={schedule}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </form>
            <p className="max-w-6xl text-gray-600 text-sm md:text-base mx-auto px-2 mt-1"><strong>Note:</strong> All times on this page are shown in Sri Lanka Time (GMT+5:30).</p>
            <Footer />
        </>
    );
}