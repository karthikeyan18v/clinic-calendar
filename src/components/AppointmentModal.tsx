import React, { useState } from "react";
import { patients, doctors } from "../data/staticData";

interface Props {
  date: string;
  onClose: () => void;
  onSave: (appt: any) => void;
}

export default function AppointmentModal({ date, onClose, onSave }: Props) {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (patient && doctor && time) {
      onSave({ id: Date.now().toString(), date, patient, doctor, time });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Appointment ({date})
        </h3>

        {/* Patient Selection */}
        <div className="mb-4">
          <label htmlFor="patient" className="block text-sm text-gray-600 mb-2">
            Patient
          </label>
          <select
            id="patient"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Doctor Selection */}
        <div className="mb-4">
          <label htmlFor="doctor" className="block text-sm text-gray-600 mb-2">
            Doctor
          </label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <label htmlFor="time" className="block text-sm text-gray-600 mb-2">
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-gray-600 p-3 rounded-lg border-2 border-gray-300 hover:bg-gray-200 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}