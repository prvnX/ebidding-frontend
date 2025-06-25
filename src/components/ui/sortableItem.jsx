import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

import { formatCurrency } from "../../function";

export default ({ item }) => {
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
        transition
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
                <source srcSet={item.images[0]} media="(min-width: 640px)" />
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
            <div className="flex flex-col md:flex-row gap-1">
                <div className="flex-1">
                    <label className=" hidden! md:block">Starting time</label>
                    <input
                        type="datetime-local"
                        name="startingTime"
                        />
                </div>
                <div className="flex-1">
                    <label className=" hidden! md:block">Ending time</label>
                    <input
                        type="datetime-local"
                        name="endingTime"
                        />
                </div>
            </div>
        </div>
    );
};