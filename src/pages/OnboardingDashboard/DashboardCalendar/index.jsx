import { useState } from 'react';
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  startOfDay,
} from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const DashboardCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const startWeek = startOfWeek(currentMonth);
  const endWeek = endOfWeek(currentMonth);
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);

  const handlePrevious = () => {
    if (currentView === 'week') {
      setCurrentMonth(subWeeks(currentMonth, 1));
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleNext = () => {
    if (currentView === 'week') {
      setCurrentMonth(addWeeks(currentMonth, 1));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedDate(null);
  };

  const renderDaysHeader = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startWeek, i);
      days.push(
        <th key={i} className="border-r border-b p-2 text-center">
          {format(date, 'EEE d')}
        </th>
      );
    }
    return days;
  };

  const renderWeeklyTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24; i += 2) {
      timeSlots.push(
        <tr key={i}>
          <td className="border-t text-right text-[12px] pr-2 text-gray-400 h-16 align-center">
            {i % 24 === 0 ? 12 : i % 12} {i >= 12 ? 'PM' : 'AM'}
          </td>
          {Array(7).fill().map((_, j) => {
            const date = addDays(startWeek, j);
            const isDisabled = isBefore(date, startOfDay(currentDate));
            return (
              <td
                key={j}
                className={`border-t border-r h-16 relative ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
                onClick={() => !isDisabled && openModal(date)}
              >
                {!isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-gray-400 text-2xl">+</span>
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      );
    }
    return timeSlots;
  };

const renderMonthlyDays = () => {
  // Determine the first day of the month and the first day of the grid
  const firstDayOfMonth = startOfMonth(currentMonth);
  const firstDayOfGrid = startOfWeek(firstDayOfMonth);

  // Determine the last day of the month and the last day of the grid
  const lastDayOfMonth = endOfMonth(currentMonth);
  const lastDayOfGrid = endOfWeek(lastDayOfMonth);

  // Get all the days from the first day of the grid to the last day of the grid
  const days = eachDayOfInterval({ start: firstDayOfGrid, end: lastDayOfGrid });
  const rows = [];
  let cells = [];

  days.forEach((day, i) => {
    const isDisabled = isBefore(day, startOfDay(currentDate));
    const isCurrentMonth = isSameMonth(day, currentMonth);

    cells.push(
      <td
        key={i}
        className={`border p-2 h-20 align-top relative ${
          !isCurrentMonth ? 'bg-gray-100' : 'bg-white'
        } ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
        onClick={() => !isDisabled && openModal(day)}
      >
        <span className={`block text-sm font-bold ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>
          {format(day, 'd')}
        </span>
      </td>
    );

    // When a row is complete, push it into rows and reset cells
    if ((i + 1) % 7 === 0) {
      rows.push(<tr key={i}>{cells}</tr>);
      cells = [];
    }
  });

  return rows;
};


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="btn" onClick={handlePrevious}>
          &lt; Previous
        </button>
        <div>
          {currentView === 'week'
            ? `${format(startWeek, 'MMM d')} - ${format(endWeek, 'MMM d, yyyy')}`
            : format(currentMonth, 'MMMM yyyy')}
        </div>
        <button className="btn" onClick={handleNext}>
          Next &gt;
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className={`btn ${currentView === 'month' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setCurrentView('month')}
        >
          Month
        </button>
        <button
          className={`btn ml-2 ${currentView === 'week' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setCurrentView('week')}
        >
          Week
        </button>
      </div>
      <div className='overflow-auto h-[calc(100vh-12rem)]'>
        <table className="table-fixed w-full border-collapse border-t border-l">
          <thead>
            <tr>
              <th className="w-16"></th>
              {renderDaysHeader()}
            </tr>
          </thead>
          <tbody>
            {currentView === 'week' ? renderWeeklyTimeSlots() : renderMonthlyDays()}
          </tbody>
        </table>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Selected Date
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedDate ? format(selectedDate, 'PPP') : ''}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DashboardCalendar;
