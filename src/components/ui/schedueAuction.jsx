import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { formatCurrency } from '../../function';
import axios from 'axios';
import { addFlashMessage } from "../../flashMessageCenter";

dayjs.extend(utc);
dayjs.extend(timezone);

// ✅ Set default timezone to Sri Lanka
dayjs.tz.setDefault('Asia/Colombo');

export default ({ item, fetchItem }) => {
    // initialMinTime should also be a dayjs object for minDateTime prop
    const initialMinTime = useRef(dayjs().endOf('minute')); // Set to current time as a dayjs object

    const [minEndingTime, setMinEndingTime] = useState(initialMinTime.current); // Keep as dayjs object

    // New validation states
    const [startTimeError, setStartTimeError] = useState(false);
    const [endTimeError, setEndTimerError] = useState(false);
    const [gapError, setGapError] = useState(false);

    const [startingTime, setStartingTime] = useState();
    const [endingTime, setEndingTime] = useState();

    useEffect(() => {
        const startDate = startingTime ? dayjs(startingTime) : null;
        const endDate = endingTime ? dayjs(endingTime) : null;

        // Check if start/end dates are in the past
        // Use dayjs().startOf('minute') for more accurate "now" comparison
        const isStartInvalid = startDate && startDate.isBefore(initialMinTime.current);
        const isEndInvalid = endDate && endDate.isBefore(initialMinTime.current);

        // Check if gap is less than 6 hours
        const isGapInvalid = startDate && endDate && endDate.diff(startDate, 'hour') < 6;

        setStartTimeError(isStartInvalid);
        setEndTimerError(isEndInvalid);
        setGapError(isGapInvalid);
    }, [startingTime, endingTime]);

    // This useEffect updates the minimum ending time based on the starting time
    useEffect(() => {
        if (!startingTime) {
            // If start time is not set, min ending time defaults to initialMinTime (current time)
            setMinEndingTime(initialMinTime.current);
            return;
        }

        // Convert the string start to a dayjs object
        const startDate = dayjs(startingTime);

        // Set min ending time to 6 hours after the starting time (as a dayjs object)
        const minEnd = startDate.add(6, 'hour');
        
        // Ensure minEnd is not in the past relative to current moment
        // This makes sure the min date for the end picker is never before the current time
        // even if start date is in the past (which should be caught by startTimeError)
        setMinEndingTime(minEnd.isBefore(dayjs(initialMinTime.current)) ? dayjs(initialMinTime.current) : minEnd);
    }, [startingTime]);

    const schedule = useCallback(() => {
        const itemsToSchedule = [
            {
                id: item.id,
                startingTime: startingTime,
                endingTime: endingTime
            }
        ];
        console.log(itemsToSchedule);
        axios.post("http://localhost:8082/is/v1/schedule", itemsToSchedule)
        .then(res => {
            const {status, data} = res;
            if (status === 200 && data.success) {
                addFlashMessage('success', 'Auctions scheduled successfully');
                fetchItem(); // Refresh the item details after scheduling
            } else {
                addFlashMessage('error', 'Failed to schedule auctions. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error scheduling auctions:', error);
            addFlashMessage('error', 'Failed to schedule auctions. Please try again.');
        });
    }, [startingTime, endingTime]);


    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-1">Starting Bid</div>
                    {/* <div className="text-3xl font-bold text-green-600">{formatCurrency(item.currentBid)}</div> */}
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(item.startingBid)}</div>
                    <div className="text-center text-sm text-gray-600">Increment: {formatCurrency(item.increment)}</div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 relative flex flex-col gap-1 mt-5">
                <h3 className="font-semibold mb-3 text-gray-800">Schedule the Auction</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        // Ensure value is a dayjs object or null
                        value={startingTime ? dayjs(startingTime) : null}
                        onChange={(newValue) => {
                            // newValue is a dayjs object or null
                            // Convert it back to ISO string for parent state if that's what setStart expects
                            setStartingTime(newValue);
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
                        value={endingTime ? dayjs(endingTime) : null}
                        onChange={(newValue) => {
                            // newValue is a dayjs object or null
                            // Convert it back to ISO string for parent state if that's what setEnd expects
                            setEndingTime(newValue);
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
                <button
                    className="w-full py-2 mt-2 bg-[#1e3a5f] text-white rounded-md font-medium hover:bg-[#294b78] transition flex items-center justify-center"
                    onClick={schedule}
                    >
                    <FontAwesomeIcon icon={faGavel} className="mr-2" />
                    Schedule
                </button>
            </div>
        </>
    )
}