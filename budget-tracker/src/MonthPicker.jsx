// MonthPicker — lets the user switch between months
// receives currentMonth and onSetMonth function from App via props
function MonthPicker({ currentMonth, onSetMonth }) {

  // FUNCTION: go to the previous month
  // we split the date string directly to avoid timezone issues with Date objects
  // e.g. "2026-04" splits into year=2026, month=4
  function prevMonth() {
    const [year, month] = currentMonth.split('-').map(Number);
    // if January, go back to December of previous year
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    // padStart ensures month is always 2 digits e.g. "01" not "1"
    onSetMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  }

  // FUNCTION: go to the next month
  function nextMonth() {
    const [year, month] = currentMonth.split('-').map(Number);
    // if December, go forward to January of next year
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    onSetMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  }

  // format "2026-04" to "April 2026" for display
  const formatted = new Date(`${currentMonth}-01`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="month-picker">
      {/* left arrow — go to previous month */}
      <button onClick={prevMonth}>←</button>
      <span>{formatted}</span>
      {/* right arrow — go to next month */}
      <button onClick={nextMonth}>→</button>
    </div>
  );
}

export default MonthPicker;