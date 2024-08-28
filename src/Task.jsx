import React, { useState, useRef } from "react";
import plusIcon from './assets/plus.png';
import xIcon from './assets/x.png'
import downArrow from './assets/down-arrow.png';
import editIcon from './assets/edit.png'

function Task() {
    const [labels, setLabels] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const checkboxRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCbChange = ()=>{
        setIsAdding(!isAdding);
    }

    const handleLabelChange = (e)=>{
        setNewLabel(e.target.value);
    }

    const handleAddLabel = ()=> {
        if (newLabel.trim()){
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
    }

    return (
        <div className="max-w-md min-h-screen bg-white mx-auto">
            <div className="flex justify-between px-5">
                <h1 className="font-ttfirs font-bold text-4xl py-5">tasked</h1>
                <label className="swap">
                    <input type="checkbox" ref={checkboxRef} onChange={handleCbChange}/>
                    <img src={xIcon} className="swap-on transition ease-out duration-100 fill-current" alt="" />
                    <img src={plusIcon} className="swap-off transition ease in fill-current" alt="" />
                </label>
            </div>
            {isAdding && (
                <div className="flex items-center justify-center bg-[#eeeeee] h-[56px] px-5 my-4">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox checkbox-error  border-none bg-black focus:border-none"/>
                    </label>
                    <input type="text" value={newLabel} onChange={handleLabelChange} className="outline-none bg-transparent p-2 w-full" placeholder="Enter new label"/>
                    <button onClick={handleAddLabel} className="btn btn-outline text-[16px] font-bold px-2 h-8 min-h-8">Save</button>
                </div>
            )}
            <div>
                {labels.map(label =>(
                    <div className="flex items-center py-3 px-5 hover:bg-slate-200">
                        <div key={label.id} tabIndex={0} className="collapse rounded-none">
                            <div className="flex items-center">
                                <label className="label me-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-error  border-none bg-black focus:border-none"/>
                                </label>
                                <p className="text-lg font-medium">{label.label}</p>
                            </div>
                            <div className="collapse-content">

                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" onClick={handleToggle} onBlur={() => setIsOpen(false)} className="relative">
                                <img src={downArrow} className={`w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} alt="Toggle dropdown"/>
                                {isOpen && (
                                    <ul className="menu dropdown-content">
                                        <li><button className="flex items-center">Edit <img src={editIcon} className="w-4" alt="" /></button></li>
                                        <li><button>Delete</button></li>
                                        <li><button>Add Tasks</button></li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
