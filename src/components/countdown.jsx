import dayjs from "dayjs";
import Countdown from "react-countdown";

export default function CountDownDate({ dateTime, starting, date, time }) {
    let calTime;
    if(!dateTime)
      calTime= date + 'T' + time;
    else
        calTime = dayjs.utc(dateTime).local();

      const endTime = new Date(calTime);
        const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            if (starting) return <span className="text-md font-bold text-green-600">Auction Started</span>;
            else return <span className="text-md font-bold text-red-500">Auction Ended</span>;
        } else {
            return (
                <div className={`${starting ? "text-green-600" : "text-red-500"} font-semibold`} >
                    {days}d {hours}h {minutes}m {seconds}s
                </div>
            );
        }
    };

    return (
        <Countdown date={endTime} renderer={renderer} />
    );
}
