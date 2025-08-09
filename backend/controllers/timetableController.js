const db = require('../db'); // Assuming you have a db config file

//Add a timetable entry
exports.addTimetable = async (req, res) => {
    const { course_name, day_of_the_week, start_time, end_time, location, lecturer } = req.body;
    const user_id  = req.user.id;
    console.log('Body received:', req.body);
    

    if (!course_name || !day_of_the_week || !start_time || !end_time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await db.query(
            `INSERT INTO timetable (user_id, course_name, day_of_the_week, start_time, end_time, location, lecturer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [user_id, course_name, day_of_the_week, start_time, end_time, location, lecturer]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding timetable entry: ', error);
        return res.status(500).json({ message: 'Server Error' });   
    }
};

//Get all timetable entries for the logged in user
exports.getTimetable = async (req, res) => {
    const user_id  = req.user.id;

    try {
        const result = await db.query(`SELECT * FROM timetable WHERE user_id = $1 ORDER BY day_of_the_week, start_time`, [user_id]);
        const now = new Date();
        const upcoming = result.rows.filter((entry) => {
          const entryDateTime = new Date(`${entry.date}T${entry.time}`);
          return entryDateTime > now;
        })
 console.log("Get Ti");
 console.log(result.rows[0]);
 

        //res.json(upcoming);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching timetable: ", error);
        res.status(500).json({ message: 'Server Error' });
    }

};
exports.addget = async (req, res) => {
const userId = req.user.id;
console.log("Testing ...", userId);

}

 exports.getUpcomingClass = async (req, res) => {
  const user_id = req.user.id;
  console.log("hit user:", user_id);
  

  try {
    const result = await db.query(
      `SELECT * FROM timetable WHERE user_id = $1 ORDER BY day_of_the_week, start_time`,
      [user_id]
    );

    const rows = result.rows;

    const current = new Date();
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,

        };

    const upcomingClasses = rows
      .map((item) => {
        const classDay = typeof item.day_of_the_week === "number"
          ? item.day_of_the_week
          : daysMap[item.day_of_the_week];
        const [hours, minutes, seconds = 0] = item.start_time.split(":").map(Number);

        const classDate = new Date(current);
        let dayDiff = (classDay - current.getDay() + 7) % 7;
        classDate.setDate(current.getDate() + dayDiff);
        classDate.setHours(hours, minutes, seconds, 0);
        classDate.setMilliseconds(0);

        // If it's today and the class time has already passed, skip this occurrence
        if (dayDiff === 0 && classDate <= current) {
          // Instead of skipping to next week, we just don't include this occurrence
          return null;
        }

        return { ...item, _nextOccurrence: classDate };
      })
      .filter(Boolean) // Remove nulls
      .sort((a, b) => a._nextOccurrence - b._nextOccurrence);

    const upcoming = upcomingClasses.length > 0 ? upcomingClasses[0] : null;

    if (upcoming) {
      res.json(upcoming);
    } else {
      res.json({ message: 'No upcoming classes found' });
    }
/*
    const allClasses = result.rows;

    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

    console.log("Testing upcoming classes");
    
    console.log("Now:", currentDay, currentTime);
    //console.log(result.rows);
    
    
    allClasses.forEach(cls => {
      console.log(`Class: ${cls.course_name}, Day: ${cls.day_of_the_week}, Time: ${cls.start_time}`);
    });

    // Filter logic
    const upcomingClasses = allClasses.filter((cls) => {
      const classDay = parseInt(cls.day_of_the_week); // Ensure it's a number
      const classTime = cls.start_time.slice(0, 5); // Assumes format "HH:MM:SS"

      if (classDay > currentDay) return true; // Future days
      if (classDay === currentDay && classTime > currentTime) return true; // Today, but later time
      return false; // Past classes
    });
 console.log("Get Upcoming Class:", upcomingClasses);


    return res.json(upcomingClasses);
    */
  } catch (error) {
    console.error("Error fetching upcoming timetable: ", error);
    return res.status(500).json({ message: 'Server Error' });
  }
 
};

exports.deleteTimetable = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `DELETE FROM timetable WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Entry not found or not yours' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting timetable entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


