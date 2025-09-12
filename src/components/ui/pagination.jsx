import { faChevronLeft, faChevronRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Pagination({ currentPage, hasNext, goToPage }) {
  const prevPages = [];
  for (let i = 3; i >= 1; i--) {
    if (currentPage - i > 0) prevPages.push(currentPage - i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      {/* Previous Arrow */}
      <button
        className={`p-2 rounded-lg border bg-white shadow ${currentPage === 1 ? "opacity-30" : "hover:bg-gray-100"}`}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Left dots */}
      {currentPage > 4 && 
      <>
        {/* First page button */}
        <button
          className={`w-10 h-10 flex items-center justify-center border rounded-lg bg-white hover:bg-gray-100`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
        <div className="px-2">...</div>
      </>
      }

      {/* Previous 3 pages */}
      {prevPages.map((page) => (
        <button
          key={page}
          className="w-10 h-10 flex items-center justify-center border rounded-lg bg-white hover:bg-gray-100"
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {/* Current Page */}
      <div className="w-10 h-10 flex items-center justify-center border rounded-lg bg-[#1e3a5f] text-white font-semibold shadow">
        {currentPage}
      </div>

      {/* Next page */}
      {hasNext && (
        <button
          className="w-10 h-10 flex items-center justify-center border rounded-lg bg-white hover:bg-gray-100"
          onClick={() => goToPage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {/* Right dots */}
      {hasNext && <div className="px-2">...</div>}

      {/* Next Arrow */}
      <button
        className={`p-2 rounded-lg border bg-white shadow ${hasNext ? "hover:bg-gray-100" : "opacity-30"}`}
        disabled={!hasNext}
        onClick={() => goToPage(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
