import habitModel from "../models/habit.model.js"

export const home = async (req, res) => {
    try {
            let habits = await habitModel.find();
            const currentDate = new Date().toDateString();
            habits.forEach((habit) => {
              let found = false;
              habit.records.forEach((track) => {
                if (track.date === currentDate) {
                  found = true;
                }
              });
              if (!found) {
                habit.records.push({ date: currentDate, status: "none" });
                habit.save();
              }
            });

            let habit = await habitModel.find({});
            return res.render("index", {
            habits: habit,
            });

    } catch (err) {
        console.log("Error ",err );
        return;
    }
};

// function for creating Habit

export const addHabit = async (req, res) => {
    try {
        // Create new Habit and Store in DB
        const habit = await habitModel.findOne({name: req.body.name});
        if(!habit){
            const name = req.body.name;
            let date = new Date().toDateString(); // "Sat Jun 03 2023".
            console.log('date: ',date);
            let newHabit = await habitModel.create({
            name,

            records: [
              {
                date: date,
                status: "none",
              },
            ],
          });
        }
        return res.redirect('/');
    } catch (error) {
        console.log("Error in adding habit", error);
        return;
    }
};


export const deleteHabit = async (req, res) => {
  try {
      // console.log("params :",req.params.id);
      await habitModel.findByIdAndDelete(req.params.id);

    return res.redirect('/');
  } catch (err) {
    console.log("Error in removing Habit :", err);
    return;
  }
};


// 7 days data details
export const details = async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await habitModel.findById(habitId);
    console.log('habit:', habit);
    return res.render('habitInfo', {
      all_habits: habit
    });
  } catch (error) {
    console.log('Error while fetching details :(', error);
    return res.status(500).send('Error fetching details');
  }
};

// status update
export const updateStatus = async (req, res) => {
  try {
    const { habitId, id } = req.params;
    const { status } = req.body;

    const updatedHabit = await habitModel.findOneAndUpdate(
      { _id: habitId, "records._id": id },
      { $set: { "records.$.status": status } },
      { new: true }
    );
    return res.redirect("back");
  } catch (err) {
    res.status(500).json({
      message: "Error updating habit status",
      error: err.message,
    });
  }
};
  
  