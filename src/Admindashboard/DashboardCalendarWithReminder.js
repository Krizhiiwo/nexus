import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardCalendar.css'; // Custom styling

const DashboardCalendarWithReminder = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState('');

  const handleAddReminder = () => {
    if (reminderText.trim()) {
      setReminders([...reminders, { date: selectedDate.toDateString(), text: reminderText }]);
      setReminderText('');
    }
  };

  return (
    <div className="calendar-reminder-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <div className="reminder-section">
        <h3>Set Reminder for {selectedDate.toDateString()}</h3>
        <input
          type="text"
          placeholder="Enter reminder"
          value={reminderText}
          onChange={(e) => setReminderText(e.target.value)}
        />
        <button onClick={handleAddReminder}>Add Reminder</button>

        <ul className="reminder-list">
          {reminders
            .filter(r => r.date === selectedDate.toDateString())
            .map((reminder, index) => (
              <li key={index}>{reminder.text}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCalendarWithReminder;
