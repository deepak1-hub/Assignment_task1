import React, { useEffect, useState } from 'react'
//to get the data from localStorage
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    // add todo list
    const addItem = (e) => {
        e.preventDefault();
        if (!inputData) {
            window.alert('Please Add Items')
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }
    // delete todo list
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updateditems);
    }
    // edit todo list
    const editItems = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    // add data to localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <div>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <figcaption>Todo App</figcaption>
                    </figure>
                    <div className="addItems">
                        <form id="to-do-form" onSubmit={addItem}>
                            <input type="text" placeholder="Add Items ..."
                                value={inputData}
                                onChange={(e) =>
                                    setInputData(e.target.value)}
                            />
                            {
                                toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                    <i className="fa fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                            }
                        </form>
                    </div>
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItems(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Todo
