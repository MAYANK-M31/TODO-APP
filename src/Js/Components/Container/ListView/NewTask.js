import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import { ReactComponent as Edit } from "../../../../Assets/Edit.svg";
import { ReactComponent as Trash } from "../../../../Assets/Trash.svg";
import { ReactComponent as Tick } from "../../../../Assets/Tick.svg";
import { ReactComponent as Tick2 } from "../../../../Assets/Tick2.svg";
import toast, { Toaster } from 'react-hot-toast';

import "../../../../Css/MainContainer/MainContainer.css";
import {
  fetchBoards,
  fetchTasks,
  removeTask,
  updateTask,
} from "../../../Axios/axios";
import { getBoardId } from "../../../Redux/Reducer/CurrentBoardId";
import { getTasks, setTask } from "../../../Redux/Reducer/NewTasksReducer";

const Card = React.memo(({ Data, Select, onEdit, Delete }) => {
  const [check, setcheck] = useState(false);
  const [Value, setValue] = useState(Data?.description);
  const [edit, setedit] = useState(false);

  const EditSubmit = () => {
    var temp = JSON.parse(JSON.stringify(Data));
    temp["description"] = Value;
    setedit(false);
    onEdit(temp);
  };

  const onKeyPress = useCallback((e)=>{
    var code = e.keyCode || e.which;
    if(code === 13) { //13 is the enter keycode
      EditSubmit()    } 
  },[Value,setValue,setedit])

  return (
    <div
      style={{ border: edit ? "2px #4680fc solid" : null }}
      className="TaskCard"
    >
      <div className="SuccessView">
        {check == true ? (
          <div className="Button">
            <Tick />
          </div>
        ) : (
          <div
            onClick={() => {
              setcheck(true);
              Select(Data);
            }}
            className="Button-off"
          ></div>
        )}
      </div>
      <div className="CompletedTextView">
        {edit == true ? (
          <input
          onKeyPress={onKeyPress}
            autoFocus={true}
            type="text"
            value={Value}
            onSubmit={() => alert(Value)}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"EDIT"}
          />
        ) : (
          <p>{Data.description}</p>
        )}
      </div>
      <div className="UtilityView">
        <div
          onClick={() => {
            edit ? EditSubmit() : setedit(true);
          }}
          className="Button"
        >
          {edit ? <Tick2 color={"#56cd73"} /> : <Edit />}
        </div>
        <div
          onClick={() => {
            Delete(Data);
          }}
          className="Button"
        >
          <Trash />
        </div>
      </div>
    </div>
  );
});

const NewTask = (props) => {
  const Tasks = useSelector(getTasks);
  const dispatch = useDispatch();
  const currentBoardId = useSelector(getBoardId);


  const onSelect = useCallback(
    async (data) => {
      await updateTask(data.id, data.description, !data.completed).then(
        (res) => {
          if (res.status != 200) return toast.error('Try Again!');;

          let temp = Tasks.map((e) => {
            if (e.id == data.id) {
              return { ...e, completed: true };
            }
            return e;
          });
          toast.success('Marked Done')

          dispatch(setTask(temp));
        }
      );
    },
    [setTask, Tasks, currentBoardId]
  );

  const onEdit = useCallback(
    async (data) => {
      var temp = JSON.parse(JSON.stringify(data));

      temp.completed = false;
      temp.description = data.description;

      let data2 = Tasks.map((e) => {
        if (e.id == temp.id) {
          return temp;
        }
        return e;
      });

      dispatch(setTask(data2));
      await updateTask(temp.id, temp.description, temp.completed).then(
        (res) => {
          if (res.status != 200) return toast.error('Try Again!');
          toast.success('Edited Successfully')

        }
      );
    },
    [setTask, Tasks, currentBoardId]
  );

  const onDelete = useCallback(
    async (data) => {
      await removeTask(data.id).then((res) => {
        if (res.status != 200) return toast.error('Try Again!');
        let temp = Tasks.filter((e) => e.id != data.id);
        toast.success('Deleted Successfully')
        dispatch(setTask(temp));
      });
    },
    [setTask, Tasks, currentBoardId]
  );

  return (
    <div className="column TaskView">
      <div className="Container">
        <div className="Heading">New Task</div>
        <div className="ListDiv">
          {Tasks.map(
            (item) =>
              item.completed == false && (
                <Card
                  key={item.id}
                  Data={item}
                  Select={onSelect}
                  onEdit={onEdit}
                  Delete={onDelete}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewTask;
