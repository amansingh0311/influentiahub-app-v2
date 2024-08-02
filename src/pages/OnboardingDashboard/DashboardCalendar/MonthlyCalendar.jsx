const MonthlyCalendar = () => {
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1); // Assuming 5 weeks in a month
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row">
        {daysInMonth.map((day, index) => (
          <div key={index} className="flex-1 border p-2">
            <div className="text-center">{day}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1">
        {weeks.map((week, index) => (
          <div key={index} className="flex flex-row flex-1">
            {daysInMonth.slice((week - 1) * 7, week * 7).map((day, dayIndex) => (
              <div key={dayIndex} className="flex-1 border p-2">
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
