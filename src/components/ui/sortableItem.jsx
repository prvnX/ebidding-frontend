import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

// Assuming these functions still work as expected with string/Date inputs if needed elsewhere
import { formatCurrency } from "../../function";
import { useState, useEffect, useRef, memo } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// ✅ Set default timezone to Sri Lanka
dayjs.tz.setDefault('Asia/Colombo');

export default memo(({ item, setStart, setEnd }) => {
    // initialMinTime should also be a dayjs object for minDateTime prop
    const initialMinTime = useRef(dayjs().endOf('minute')); // Set to current time as a dayjs object

    const [minEndingTime, setMinEndingTime] = useState(initialMinTime.current); // Keep as dayjs object

    // New validation states
    const [startTimeError, setStartTimeError] = useState(false);
    const [endTimeError, setEndTimerError] = useState(false);
    const [gapError, setGapError] = useState(false);

    // This useEffect will run when `time.start` or `time.end` changes.
    // It assumes `time.start` and `time.end` are managed as ISO strings by the parent,
    // so we convert them to dayjs objects for validation.
    useEffect(() => {
        const startDate = item.startingTime ? dayjs(item.startingTime) : null;
        const endDate = item.endingTime ? dayjs(item.endingTime) : null;

        // Check if start/end dates are in the past
        // Use dayjs().startOf('minute') for more accurate "now" comparison
        const isStartInvalid = startDate && startDate.isBefore(initialMinTime.current);
        const isEndInvalid = endDate && endDate.isBefore(initialMinTime.current);

        // Check if gap is less than 6 hours
        const isGapInvalid = startDate && endDate && endDate.diff(startDate, 'hour') < 6;

        setStartTimeError(isStartInvalid);
        setEndTimerError(isEndInvalid);
        setGapError(isGapInvalid);
    }, [item.startingTime, item.endingTime]);

    // This useEffect updates the minimum ending time based on the starting time
    useEffect(() => {
        if (!item.startingTime) {
            // If start time is not set, min ending time defaults to initialMinTime (current time)
            setMinEndingTime(initialMinTime.current);
            return;
        }

        // Convert the string item.start to a dayjs object
        const startDate = dayjs(item.startingTime);

        // Set min ending time to 6 hours after the starting time (as a dayjs object)
        const minEnd = startDate.add(6, 'hour');
        
        // Ensure minEnd is not in the past relative to current moment
        // This makes sure the min date for the end picker is never before the current time
        // even if start date is in the past (which should be caught by startTimeError)
        setMinEndingTime(minEnd.isBefore(dayjs(initialMinTime.current)) ? dayjs(initialMinTime.current) : minEnd);
    }, [item.startingTime]);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : "auto",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white shadow rounded-lg p-3 my-1 items-center gap-3 select-none grid grid-cols-[subgrid] col-span-5 hover:shadow-lg transition-shadow border-l-3 border-l-green-600"
        >
            <div>
                <span
                    {...attributes}
                    {...listeners}
                    className={isDragging ? "cursor-grabbing" : "cursor-grab"}
                >
                    <FontAwesomeIcon icon={faGripVertical} style={{ color: "#b5b5b5" }} />
                </span>
            </div>
            <picture>
                <source srcSet={item.images ? item.images[0] : null} media="(min-width: 640px)" />
                <img className="w-20 object-cover hidden sm:block" />
            </picture>
            <div>
                <p className="font-bold text-lg text-gray-700 whitespace-nowrap">{item.title}</p>
                <p>{item.caseNumber}</p>
            </div>
            <div className="hidden lg:block">
                <p className="text-xl font-bold text-green-600">{formatCurrency(item.startingBid)}</p>
                <p>{formatCurrency(item.increment)}</p>
            </div>
            <div className="relative flex flex-col lg:flex-row gap-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        // Ensure value is a dayjs object or null
                        value={item.startingTime ? dayjs(item.startingTime) : null}
                        onChange={(newValue) => {
                            // newValue is a dayjs object or null
                            // Convert it back to ISO string for parent state if that's what setStart expects
                            setStart(item.id, newValue);
                        }}
                        // minDateTime expects a dayjs object
                        minDateTime={initialMinTime.current}
                        slotProps={{
                            textField: {
                                size: "small",
                                error: startTimeError || (gapError && !endTimeError), // Apply error styles
                                helperText: startTimeError ? "Cannot be in the past." : (gapError && !endTimeError ? "Start and end must have 6hr gap." : null)
                            }
                        }}
                        format="DD/MM/YYYY HH:mm" // Use the desired format
                        ampm={false}
                    />
                    <DateTimePicker
                        label="End"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        // Ensure value is a dayjs object or null
                        value={item.endingTime ? dayjs(item.endingTime) : null}
                        onChange={(newValue) => {
                            // newValue is a dayjs object or null
                            // Convert it back to ISO string for parent state if that's what setEnd expects
                            setEnd(item.id, newValue);
                        }}
                        // minDateTime expects a dayjs object
                        minDateTime={minEndingTime} // Use the calculated minEndingTime (which is a dayjs object)
                        slotProps={{
                            textField: {
                                size: "small",
                                error: endTimeError || gapError, // Apply error styles
                                helperText: endTimeError ? "Cannot be in the past." : (gapError ? "Start and end must have 6hr gap." : null)
                            }
                        }}
                        format="DD/MM/YYYY HH:mm" // Use the desired format
                        ampm={false}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
});