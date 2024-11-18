import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type:{
    type: String,
    enum: ['follow', 'like'],
    required: true
  },
  read:{
     type: Boolean,
     default: false
  }
},{timestams: true});

const Notification =mongoose.model('Notification',NotificationSchema);
export default Notification;