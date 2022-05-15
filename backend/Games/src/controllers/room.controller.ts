var RoomService = require('./../services/room.service');    


exports.getRoomById = async function (req: any, res: any, next: any) {
    var id = req.params.id;
    try {
        var room = await RoomService.getRoomById(id);
        return res.status(200).json({ status: 200, data: room, message: "Successfully Room Retrieved" });
    } 
    catch (e: any) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createRoom = async function (req: any, res: any, next: any) {
    try {
        var room = await RoomService.createRoom(req.body);                
        return res.status(200).json({ status: 200, data: room, message: "Successfully created Room" });
    } 
    catch (e: any) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


