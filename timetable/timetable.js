document.getElementById('save-timetable').addEventListener('click', saveTimetable);
document.getElementById('set-alarms').addEventListener('click', setAlarms);

function saveTimetable() {
    const date = document.getElementById('timetable-date').value;
    const rows = document.querySelectorAll('#timetable tbody tr');
    const timetableData = [];

    rows.forEach(row => {
        const time = row.cells[0].querySelector('input[type="time"]').value;
        const task = row.cells[1].querySelector('input[type="text"]').value;
        const notes = row.cells[2].querySelector('input[type="text"]').value;

        if (time && task) {
            timetableData.push({ date, time, task, notes });
        }
    });

    chrome.storage.sync.set({ timetable: timetableData }, () => {
        alert('Timetable saved successfully!');
    });
}

function setAlarms() {
    chrome.storage.sync.get('timetable', (data) => {
        const timetable = data.timetable || [];
        
        timetable.forEach(item => {
            const alarmTime = new Date(`${item.date}T${item.time}`); 
            const alarmId = `alarm-${item.task}`;
            if (alarmTime.getTime() > Date.now()) {
                chrome.alarms.create(alarmId, {
                    when: alarmTime.getTime()
                });
            } else {
                alert(`The time for ${item.task} is in the past and will not be set.`);
            }
        });

        alert('Alarms set successfully!');
    });
}
