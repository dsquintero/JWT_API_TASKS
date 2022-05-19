var Task = require('../models/task');

exports.ListAll = async function (user_id) {
    const task = await Task.find({ author: user_id })
        .select('title description author complete createdAt')
        .populate(
            {
                path: 'author',
                select: 'first_name last_name'
            })
        .sort({ createdAt: 'desc'});
    return task;
}

exports.SearchById = async function (user_id, task_id) {
    const task = await Task.findOne({ _id: task_id, author: user_id })
        .select('title description author complete createdAt')
        .populate(
            {
                path: 'author',
                select: 'first_name last_name'
            });
    return task;
}

exports.Create = async function (new_task) {
    let task = await Task.create(new_task);
    task = await task
        .populate(
            {
                path: 'author',
                select: 'first_name last_name'
            });
    return task;
}

exports.Update = async function (user_id, task_id, new_task) {
    const task = await Task.findOneAndUpdate({ _id: task_id, author: user_id }, new_task, { new: true })
        .select('title description author complete createdAt')
        .populate(
            {
                path: 'author',
                select: 'first_name last_name'
            });
    return task;
}

exports.Delete = async function (user_id, task_id) {
    const task = await Task.findOneAndDelete({ _id: task_id, author: user_id })
        .select('_id');
    return task;
}