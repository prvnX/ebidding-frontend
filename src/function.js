const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
}

/**
 * Validates an input field on blur and displays a built-in browser
 * validation message if the input is invalid.
 *
 * Should be used as an onBlur handler for inputs with HTML5 validation
 * attributes like required, min, max, pattern, etc.
*/
const handleBlurValidate = (event) => {
    if (!event.target.checkValidity()) {
        event.target.reportValidity();
    }
}

/**
 * Converts a given value into a JavaScript Date object and formats it
 * as a string compatible with the <input type="datetime-local"> field.
 *
 * The function ensures the value is first converted to a Date,
 * then extracts the local year, month, day, hour, and minute,
 * and returns a string in the "YYYY-MM-DDTHH:mm" format.
 * This avoids time zone issues that occur when using toISOString().
 *
 * @param {Date | string | number} d - A value that can be passed to the Date constructor
 * @returns {string} A string in "YYYY-MM-DDTHH:mm" format using local time
 */
const formatLocalDateForInput = (d) => {
  const date = new Date(d);
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months start at 0, so +1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}



export { formatCurrency, formatDate, handleBlurValidate, formatLocalDateForInput };