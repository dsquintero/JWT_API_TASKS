const TaskService = require('../services/task');

exports.ListAll = async function (req, res) {
    try {
        const { user_id } = req.user;
        const task = await TaskService.ListAll(user_id)
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
    }
}
exports.SearchById = async function (req, res) {
    try {
        const { user_id } = req.user;
        const task_id = req.params.id;

        const task = await TaskService.SearchById(user_id, task_id)

        if(!task) return res.status(404).json({
            statusCode: 404,
            message: 'Document not found'
          })
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
    }
}
exports.Create = async function (req, res) {
    try {
        const { title, description } = req.body;
        const { user_id } = req.user;

        if (!(title && description)) {
            return res.status(400).send("All input is required");
        }

        const new_task =
        {
            title: title,
            description: description,
            author: user_id
        }
        const task = await TaskService.Create(new_task)

        return res.status(200).json(task);

    } catch (err) {
        console.log(err);
    }

}
exports.Update = async function (req, res) { 
    try {
        const { title, description,complete } = req.body;
        const { user_id } = req.user;
        const task_id = req.params.id;

        const update_task = {}
        if(title) Object.assign(update_task, { title: title })
        if(description) Object.assign(update_task, { description: description })
        if(complete != null) Object.assign(update_task, { complete: complete })
        Object.assign(update_task, { updatedAt: new Date() })

        
        const task = await TaskService.Update(user_id,task_id,update_task)

        return res.status(200).json(task);
        
    } catch (err) {
        console.log(err);
    }
}
exports.Delete = async function (req, res) { 

    try {
        const { user_id } = req.user;
        const task_id = req.params.id;
        const task = await TaskService.Delete(user_id,task_id)
        return res.status(200).json(task);

    } catch (err) {
        console.log(err);
    }
}