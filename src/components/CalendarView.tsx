import React from "react";
import Calendar, { CalendarProps} from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css"; // Create this file for custom styles

interface CalendarViewProps {
  onDateClick: (date: Date) => void;
  appointments: Array<{ date: string }>;
  selectedDate: Date | null;
}

export default function CalendarView({ 
  onDateClick, 
  appointments, 
  selectedDate 
}: CalendarViewProps) {
  // Check if a date has appointments
  const dateHasAppointment = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.some(appt => appt.date === dateStr);
  };

  // Custom class for tiles
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const classes = [];
      
      // Highlight today
      if (date.toDateString() === new Date().toDateString()) {
        classes.push('today');
      }
      
      // Highlight selected date
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        classes.push('selected-date');
      }
      
      // Add appointment indicator
      if (dateHasAppointment(date)) {
        classes.push('has-appointment');
      }
      
      return classes;
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(value) => onDateClick(value as Date)}
        value={selectedDate}
        onClickDay={onDateClick}
        tileClassName={tileClassName}
        minDate={new Date()}
        className="custom-calendar"
        calendarType="gregory"
      />
    </div>
  );
}