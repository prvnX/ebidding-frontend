import React from "react";
import Countdown from "react-countdown";

export default function CountDownDate({ date,time }) {
      let calTime= date + 'T' + time;
      const endTime = new Date(calTime);
        const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-md font-bold text-red-500">Auction Ended</span>;
        } else {
            return (
                <div className="text-red-500 font-semibold">
                    {days}d {hours}h {minutes}m {seconds}s
                    
                </div>
            );
        }
    };

    return (
        <Countdown date={endTime} renderer={renderer} />
    );
}
