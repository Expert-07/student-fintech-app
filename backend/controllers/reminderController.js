const db = require('../db'); 

exports.getRemindersFromTimetable = async (req, res) => {
    const { userId } = req.params;
    try {
        const reminders = await db.query("SELECT * FROM timetable WHERE user_id = $1", [userId]);

        const now = new Date();
        const upcomingReminders = reminders.rows.filter((entry) => {
            const entryDate = new Date(entry.date + ' ' + entry.time);
            return entryDate > now;
        });

        const formattedReminders = upcomingReminders.map((entry) => ({
            id: entry.id,
            title: entry.course_name,
            date: entry.date,
            time: entry.start_time,
        }));
        res.json(formattedReminders);
        
    } catch (error) {
        console.error("Error fetching reminders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
