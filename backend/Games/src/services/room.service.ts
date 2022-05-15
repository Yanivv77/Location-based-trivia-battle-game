import axios from "axios";
var { RoomModel } = require('./../models/room.model');

exports.getRoomById = async function (id: any) {
    try {
        var room = await RoomModel.findById(id);
        return room;
    } 
    catch (error) {
        // Log Errors
        throw Error('Error while getting a room by id')
    }
}

exports.createRoom = async function (room: any) {
    const data: any = new RoomModel(room);
    
    var roomResult = await data.save()
        .then((result: any) => {            
                return axios.post(data)
                .then(() => {
                    return result;
                });
            })
        .catch((err: any) => {
            throw Error(err);
        });
        
    return roomResult;
}


