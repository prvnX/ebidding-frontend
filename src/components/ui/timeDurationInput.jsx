import React, { useState, useEffect, useCallback } from 'react';

/**
 * A custom React component for inputting time duration in HH:MM format.
 * It provides two number input fields for hours and minutes separated by a colon.
 *
 * @param {object} props - The component's properties.
 * @param {number} [props.initialHours=0] - The initial value for hours.
 * @param {number} [props.initialMinutes=0] - The initial value for minutes.
 * @param {function(number)} props.onChange - Callback function when the total duration (in minutes) changes.
 * @param {string} [props.className=''] - Optional CSS class for the container div.
 * @param {object} [props.style={}] - Optional inline styles for the container div.
 * @param {string} [props.hoursPlaceholder='HH'] - Placeholder text for the hours input.
 * @param {string} [props.minutesPlaceholder='MM'] - Placeholder text for the minutes input.
 */
const TimeDurationInput = ({
  initialHours = 0,
  initialMinutes = 0,
  onChange,
  hoursPlaceholder = 'HH',
  minutesPlaceholder = 'MM',
}) => {
  const [hours, setHours] = useState(String(initialHours));
  const [minutes, setMinutes] = useState(String(initialMinutes));
  const [error, setError] = useState('');

  // Callback to calculate and dispatch the total duration
  const dispatchChange = useCallback(() => {
    const parsedHours = parseInt(hours || '0', 10);
    const parsedMinutes = parseInt(minutes || '0', 10);

    const totalMinutes = (parsedHours * 60) + parsedMinutes;
    onChange(totalMinutes);
  }, [hours, minutes, onChange]);

  // Use useEffect to call onChange whenever hours or minutes state changes
  useEffect(() => {
    // Only dispatch if there are no errors
    if (!error) {
      dispatchChange();
    }
  }, [hours, minutes, error, dispatchChange]);

  const handleHoursChange = (e) => {
    const value = e.target.value;
    // Allow empty string for clearing, or digits
    if (value === '' || /^\d+$/.test(value)) {
      setHours(value);
      setError(''); // Clear previous error
    } else {
      setError('Hours must be a non-negative number.');
    }
  };

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    // Allow empty string for clearing, or digits 0-59
    if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0 && parseInt(value, 10) < 60)) {
      setMinutes(value);
      setError(''); // Clear previous error
    } else if (value !== '' && (!/^\d+$/.test(value) || parseInt(value, 10) >= 60)) {
      setError('Minutes must be between 0 and 59.');
    } else {
      setError(''); // Clear error if input is empty or valid
    }
  };

  return (
    <div className="flex items-center justify-start">
      <input
        type="number"
        className="w-[4em]!"
        value={hours}
        onChange={handleHoursChange}
        min="0"
        placeholder={hoursPlaceholder}
        aria-label="Hours"
      />
      <span className='mx-1 font-bold'>:</span>
      <input
        type="number"
        className="w-[4em]!"
        value={minutes}
        onChange={handleMinutesChange}
        min="0"
        max="59"
        placeholder={minutesPlaceholder}
        aria-label="Minutes"
      />
      {error && <p style={{ color: 'red', fontSize: '0.8em', marginLeft: '10px' }}>{error}</p>}
    </div>
  );
};

export default TimeDurationInput;