import React, { useState, useEffect } from "react";
import AppointmentModal from "../components/AppointmentModal";
import CalendarView from "../components/CalendarView";

interface Appointment {
  id: string;
  date: string; // YYYY-MM-DD format
  patient: string;
  doctor: string;
  time: string;
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointmentsForDate, setAppointmentsForDate] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load appointments from localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (error) {
        console.error("Failed to parse saved appointments", error);
      }
    }
  }, []);

  // Save appointments to localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    const dateAppointments = appointments.filter(appt => appt.date === dateStr);
    setAppointmentsForDate(dateAppointments);
  };

  // Save new appointment
  const handleSaveAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => {
      const existingIndex = prev.findIndex(appt => appt.id === newAppointment.id);
      
      if (existingIndex >= 0) {
        // Update existing appointment
        const updated = [...prev];
        updated[existingIndex] = newAppointment;
        return updated;
      } else {
        // Add new appointment
        return [...prev, newAppointment];
      }
    });
    handleCloseModal();
  };

  // Delete an appointment
  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appt => appt.id !== id));
    setAppointmentsForDate(prev => prev.filter(appt => appt.id !== id));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Refresh appointments for selected date after modal closes
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setAppointmentsForDate(appointments.filter(appt => appt.date === dateStr));
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Medical Appointments Calendar</h1>
        <p className="text-gray-600 mt-2">Click on a date to view or create appointments</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View - 2/3 width on larger screens */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <CalendarView 
            onDateClick={handleDateClick} 
            appointments={appointments}
            selectedDate={selectedDate}
          />
        </div>

        {/* Appointment Details - 1/3 width on larger screens */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedDate 
                ? `Appointments on ${selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}`
                : "Select a Date"}
            </h2>
            
            {selectedDate && (
              <button
                onClick={handleOpenModal}
                className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Appointment
              </button>
            )}
          </div>

          {appointmentsForDate.length > 0 ? (
            <div className="space-y-4">
              {appointmentsForDate.map(appointment => (
                <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-blue-800">{appointment.patient}</h3>
                      <p className="text-gray-600">With Dr. {appointment.doctor}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete appointment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4">No appointments scheduled for this date</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4">Select a date to view appointments</p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Modal */}
      {isModalOpen && (
        <AppointmentModal
          date={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
          onClose={handleCloseModal}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  );
}