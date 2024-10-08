import React, { useState, useRef } from "react";
import plusIcon from './assets/plus.png';
import xIcon from './assets/x.png';
import downArrow from './assets/down-arrow.png';
import editIcon from './assets/edit.png';
import removeIcon from './assets/remove.png';
import addIcon from './assets/add.png';

function Task() {
    const [labels, setLabels] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editingLabelId, setEditingLabelId] = useState(null);
    const [editingLabelText, setEditingLabelText] = useState("");
    const [taskInputs, setTaskInputs] = useState({});
    const [showTaskInput, setShowTaskInput] = useState(null); // Track which label's task input should be visible
    const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
    const [editingTaskText, setEditingTaskText] = useState(""); // Track the text of the task being edited
    const checkboxRef = useRef(null);

    const handleCbChange = () => {
        setIsAdding(!isAdding);
    };

    const handleLabelChange = (e) => {
        setNewLabel(e.target.value);
    };

    const handleAddLabel = () => {
        if (newLabel.trim()) {
            const newLabelObj = {
                id: labels.length + 1,
                label: newLabel,
                tasks: []
            };
            setLabels([...labels, newLabelObj]);
            setNewLabel("");
            setIsAdding(false);
            if (checkboxRef.current) {
                checkboxRef.current.checked = false;
            }
        }
    };

    const handleEditButtonClick = (label) => {
        setEditingLabelId(label.id);
        setEditingLabelText(label.label);
    };

    const handleEditingLabelChange = (e) => {
        setEditingLabelText(e.target.value);
    };

    const handleSaveEditedLabel = (labelId) => {
        setLabels(labels.map(label =>
            label.id === labelId ? { ...label, label: editingLabelText } : label
        ));
        setEditingLabelId(null);
    };

    const handleCancelEditing = () => {
        setEditingLabelId(null);
    };

    const handleRemoveLabel = (labelId) => {
        setLabels(labels.filter(label => label.id !== labelId));
    };

    const handleTaskInputChange = (e, labelId) => {
        setTaskInputs({ ...taskInputs, [labelId]: e.target.value });
    };

    const handleAddTask = (labelId) => {
        const newTask = taskInputs[labelId];
        if (newTask && newTask.trim()) {
            setLabels(labels.map(label =>
                label.id === labelId
                    ? { ...label, tasks: [...label.tasks, newTask] }
                    : label
            ));
            setTaskInputs({ ...taskInputs, [labelId]: "" }); // Clear input after adding task
            setShowTaskInput(null); // Hide task input after adding task
        }
    };

    // Toggle task input visibility
    const handleShowTaskInput = (labelId) => {
        if (showTaskInput === labelId) {
            setShowTaskInput(null); // Hide task input if already visible
        } else {
            setShowTaskInput(labelId); // Show task input for the clicked label
        }
    };

    // Handle editing a task
    const handleEditTaskButtonClick = (taskIndex, taskText) => {
        setEditingTaskId(taskIndex);
        setEditingTaskText(taskText);
    };

    const handleEditingTaskChange = (e) => {
        setEditingTaskText(e.target.value);
    };

    const handleSaveEditedTask = (labelId, taskIndex) => {
        setLabels(labels.map(label =>
            label.id === labelId
                ? {
                    ...label,
                    tasks: label.tasks.map((task, index) =>
                        index === taskIndex ? editingTaskText : task
                    )
                }
                : label
        ));
        setEditingTaskId(null);
    };

    const handleRemoveTask = (labelId, taskIndex) => {
        setLabels(labels.map(label =>
            label.id === labelId
                ? { ...label, tasks: label.tasks.filter((_, index) => index !== taskIndex) }
                : label
        ));
    };

    return (
        <div className="max-w-md min-h-screen bg-white mx-auto">
            <div className="flex justify-between px-5">
                <h1 className="font-ttfirs font-bold text-4xl py-5">tasked</h1>
                <label className="swap">
                    <input type="checkbox" ref={checkboxRef} onChange={handleCbChange} />
                    <img src={xIcon} className="swap-on transition ease-out duration-100 fill-current" alt="" />
                    <img src={plusIcon} className="swap-off transition ease in fill-current" alt="" />
                </label>
            </div>
            {isAdding && (
                <div className="flex items-center justify-center bg-[#eeeeee] h-[56px] px-5 my-4">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox checkbox-error border-none bg-black focus:border-none" />
                    </label>
                    <input type="text" value={newLabel} onChange={handleLabelChange} className="outline-none bg-transparent p-2 w-full" placeholder="Enter new label" />
                    <button onClick={handleAddLabel} className="btn btn-outline text-[16px] font-bold px-2 h-8 min-h-8">Save</button>
                </div>
            )}
            <div>
                {labels.map(label => (
                    <div key={label.id} className="flex flex-col py-3 px-5 hover:bg-slate-200">
                        <details tabIndex={0} className="collapse rounded-none">
                            <summary className="collapse-title p-0">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <label className="label me-2 cursor-pointer">
                                            <input type="checkbox" className="checkbox checkbox-error border-none bg-black focus:border-none" />
                                        </label>
                                        {editingLabelId === label.id ? (
                                            <input 
                                                type="text" 
                                                value={editingLabelText} 
                                                onChange={handleEditingLabelChange} 
                                                className="outline-none bg-transparent p-2 w-full text-lg font-medium" 
                                            />
                                        ) : (
                                            <p className="text-lg font-medium">{label.label}</p>
                                        )}
                                    </div>
                                    <ul className="flex items-center gap-3">
                                        {editingLabelId === label.id ? (
                                            <>
                                                <li><button onClick={() => handleSaveEditedLabel(label.id)} className="btn btn-sm btn-outline">Save</button></li>
                                                <li><button onClick={handleCancelEditing} className="btn btn-sm btn-outline">Cancel</button></li>
                                            </>
                                        ) : (
                                            <>
                                                <li><button onClick={() => handleEditButtonClick(label)} id="editButton" className="flex items-center"><img src={editIcon} className="w-5" alt="" /></button></li>
                                                <li><button onClick={() => handleRemoveLabel(label.id)} id="removeButton" className="flex items-center"><img src={removeIcon} className="w-5" alt="" /></button></li>
                                                <li><button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleShowTaskInput(label.id); }} id="addButton" className="flex items-center"><img src={addIcon} className="w-6" alt="" /></button></li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </summary>
                            <div className="collapse-content">
                                <div className="my-2">
                                    {label.tasks.map((task, index) => (
                                        <div key={index} className="flex justify-between items-center py-1">
                                            {editingTaskId === index ? (
                                                <input
                                                    type="text"
                                                    value={editingTaskText}
                                                    onChange={handleEditingTaskChange}
                                                    className="outline-none bg-transparent p-2 w-full"
                                                />
                                            ) : (
                                                <p className="flex-1">{task}</p>
                                            )}
                                            <div className="flex gap-2">
                                                {editingTaskId === index ? (
                                                    <>
                                                        <button onClick={() => handleSaveEditedTask(label.id, index)} className="btn btn-sm btn-outline">Save</button>
                                                        <button onClick={() => setEditingTaskId(null)} className="btn btn-sm btn-outline">Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleEditTaskButtonClick(index, task)} className="flex items-center"><img src={editIcon} className="w-5" alt="" /></button>
                                                        <button onClick={() => handleRemoveTask(label.id, index)} className="flex items-center"><img src={removeIcon} className="w-5" alt="" /></button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {showTaskInput === label.id && (
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={taskInputs[label.id] || ""}
                                            onChange={(e) => handleTaskInputChange(e, label.id)}
                                            className="outline-none bg-transparent p-2 w-full"
                                            placeholder="Enter new task"
                                        />
                                        <button onClick={() => handleAddTask(label.id)} className="btn btn-outline text-[16px] font-bold px-2 h-8 min-h-8">Add Task</button>
                                    </div>
                                )}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
