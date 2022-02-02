import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import { ReactComponent as Tick } from "../../../../Assets/Tick.svg";
import { ReactComponent as Trash } from "../../../../Assets/Trash.svg";

import "../../../../Css/MainContainer/MainContainer.css";
import {
  fetchBoards,
  fetchTasks,
  removeTask,
  updateTask,
} from "../../../Axios/axios";
import { getBoardId } from "../../../Redux/Reducer/CurrentBoardId";
import { getTasks, setTask } from "../../../Redux/Reducer/NewTasksReducer";
import toast, { Toaster } from 'react-hot-toast';


const Card = React.memo(({ Data, Delete }) => {
  const [check, setcheck] = useState(false);

  return (
    <div className="TaskCard">
      <div className="SuccessView">
        <div style={{backgroundColor:"#00000016"}} className="Button">
          <Tick />
        </div>
      </div>
      <div className="CompletedTextView">
        <p>{Data.description}</p>
      </div>
      <div className="UtilityView">
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

const CompletedTask = () => {
  const Tasks = useSelector(getTasks);
  const dispatch = useDispatch();
  const currentBoardId = useSelector(getBoardId);


  const onDelete = useCallback(
    async (data) => {
      await updateTask(data.id, data.description, false).then((res) => {
        if (res.status != 200) return toast.error('Try Again!');;
        let temp = Tasks.map((e) => {
          if (e.id == data.id) {
            return { ...e, completed: false };
          }
          return e;
        });
        toast.success('Undo')
        dispatch(setTask(temp));
      });
    },
    [setTask, Tasks]
  );

  return (
    <div className="column TaskView">
      <div className="Container">
        <div className="Heading">Completed Task</div>
        <div className="ListDiv">
          {Tasks.map((item) => (
            item.completed == true &&(
              <Card key={item.id} Data={item} Delete={onDelete} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
