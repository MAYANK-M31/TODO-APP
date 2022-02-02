import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from "semantic-ui-react";
import { getBoards } from "../../../Redux/Reducer/BoardReducer";
import toast, { Toaster } from 'react-hot-toast';


import "../../../../Css/MainContainer/MainContainer.css";
import { getBoardId } from "../../../Redux/Reducer/CurrentBoardId";
import { createTask } from "../../../Axios/axios";
import { getTasks, setTask } from "../../../Redux/Reducer/NewTasksReducer";

const InputTask = (props) => {
  const Boards = useSelector(getBoards);
  const currentBoardId = useSelector(getBoardId);
  const Tasks = useSelector(getTasks);

  const dispatch = useDispatch();

  // Refs
  const Input = useRef(null);
  const [Value, setValue] = useState("");

  const addTask = useCallback(async (description) => {
    await createTask(currentBoardId,description,false).then((res) => {
      if (res.status != 200) return toast.error('Try Again!');;
      var data = res?.payload?.data;
      dispatch(setTask([...Tasks, data]));
      toast.success('New Task Added')

      setValue("")
    });
  }, [Tasks, setTask, Input,currentBoardId,setValue,Value]);



  const updateValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const onKeyPress = useCallback((e)=>{
    var code = e.keyCode || e.which;
    if(code === 13) { //13 is the enter keycode
       addTask(Value)    
    } 
  },[Value,setValue])

  return (
    <div className="column TaskInputView">
      <div className="Container">
        <div className="Heading">
          Board View {1 + Boards.findIndex((e) => e.id == currentBoardId)}
        </div>
        <div className="SearchDiv">
          <div className="Input">
            <input
              value={Value}
              onChange={updateValue}
              // ref={Input}
              onSubmit={addTask}
              placeholder="Enter new task"
              onKeyPress={onKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTask;
