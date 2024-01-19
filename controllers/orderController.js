const BookingRoom = require("../models/bookingModels.js")
const room = require("../models/roomModels.js")

const bookingRoom = async (req, res) => {
    try {
        const isRoomValid = await room.findOne({
            where: {
                roomId: req.body.roomId
            }
        })

        if (!isRoomValid) {
            return res.status(400).json({ message: 'Room is Not Exist.' });
        }

        const isRoomOccupied = await BookingRoom.findOne({
            where: {
                roomId: req.body.roomId,
            },
        });

        if (isRoomOccupied) {
            return res.status(400).json({ message: 'Room is already occupied for the specified date range.' });
        }
        console.log(req.userBook)
        const booking = await BookingRoom.create({
            checkIn: req.body.checkIn,
            duration: req.body.duration,
            userId: req.userBook.username,
            roomId: req.body.roomId,
        });

        return res.status(201).json({ message: 'Booking successful!', booking });
    } catch (error) {
        console.error('Error booking room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllBookingRooms = async (req, res) => {
  try {
    const bookings = await BookingRoom.findAll();
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error getting all booking rooms:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { 
    "bookingRoom": bookingRoom,
    "getBookingRoom" : getAllBookingRooms
 }
