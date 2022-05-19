var Task = require('../models/task');

exports.ListAll = async function (user_id) {
    const task = await Task.find({ author: user_id }).populate('author');
    return task;
}

exports.SearchById = async function (user_id, task_id) {
    const task = await Task.findOne({ _id: task_id, author: user_id }).populate('author');
    return task;
}

exports.Create = async function (new_task) {
    const task = await Task.create(new_task);
    return task;
}

exports.Update = async function (user_id, task_id, new_task) {
    const task = await Task.findOneAndUpdate({ _id: task_id, author: user_id }, new_task, { new: true }).populate('author');
    return task;
}

exports.Delete = async function (user_id, task_id) {
    const task = await Task.findOneAndDelete({ _id: task_id, author: user_id }).populate('author');
    return task;
}