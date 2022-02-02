import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
} from "semantic-ui-react";

import { ReactComponent as Add } from "../../../Assets/Add.svg";
import "../../../Css/Headers/BoardHeader.css";
import {
  createBoard,
  fetchBoards,
  fetchTasks,
  removeBoard,
} from "../../Axios/axios";
import { getBoards, setData } from "../../Redux/Reducer/BoardReducer";
import { getBoardId, setBoardId } from "../../Redux/Reducer/CurrentBoardId";
import { ReactComponent as Trash } from "../../../Assets/Trash.svg";
import { setTask } from "../../Redux/Reducer/NewTasksReducer";
import toast, { Toaster } from "react-hot-toast";

const CardActive = React.memo(({ Data, Index, Select }) => {
  return (
    <Grid.Column className={"BoardCard-Active"}>
      <p>Board View {Index + 1}</p>
    </Grid.Column>
  );
});

const CardInactive = React.memo(({ Data, Index, Select, Remove }) => {
  const Click = () => {
    return Select(Data.id);
  };
  const RemoveBtn = () => {
    return Remove(Data.id);
  };
  return (
    <Grid.Column onClick={Click} className={"BoardCard-Inactive"}>
      <div>
        <p>Board View {Index + 1}</p>
      </div>
      <div onClick={RemoveBtn} className="Button">
        <Trash />
      </div>
    </Grid.Column>
  );
});

const BoardHeader = () => {
  const Boards = useSelector(getBoards);
  const currentBoardId = useSelector(getBoardId);
  const dispatch = useDispatch();

  const Fetch = useCallback(async () => {
    await fetchBoards().then(async (res) => {
      if (res.status != 200) return toast.error('Failed to Connect to Server');;
      var data = res?.payload?.data;

      if (data.length == 0) return addBoard();
      dispatch(setData(data));
      if (data.length > 0) {
        dispatch(setBoardId(data[0].id));
        console.log(data[0].id);
        await FetchTasks(data[0].id);
      }
    });
  }, [currentBoardId, dispatch]);

  const FetchTasks = useCallback(
    async (id) => {
      return await fetchTasks(id).then((res) => {
        if (res.status != 200) return toast.error('Failed to Connect to Server');;
        var data = res?.payload?.data;
        console.log(data, currentBoardId);

        dispatch(setTask(data));
      });
    },
    [currentBoardId, setTask, setBoardId]
  );

  const addBoard = useCallback(async () => {
    await createBoard().then((res) => {
      if (res.status != 200) return toast.error('Try Again!');;
      var data = res?.payload?.data;
      dispatch(setData([...Boards, data]));
      dispatch(setBoardId(data.id));
      toast.success('New Board Added')

      FetchTasks(data.id)

    });
  }, [Boards, setData]);

  const DeleteBoard = useCallback(
    async (id) => {
      await removeBoard(id).then((res) => {
        console.log(res);
        if (res.status != 200) return toast.error('Try Again!');;
        var index = Boards.findIndex((e) => e.id == id);

        var data = Boards.filter((e) => e.id != id);

        dispatch(setData(data));
        if (data.length > 0) {
          dispatch(setBoardId(data[0].id));
          toast.success('Deleted Successfully')

          FetchTasks(data[0].id)
        }
      });
    },
    [setData, Boards]
  );

  useEffect(() => {
    Fetch();
  }, []);

  const onSelect = useCallback(
    async (id) => {
      dispatch(setBoardId(id));

      await fetchTasks(id).then((res) => {
        if (res.status != 200) return toast.error('Try Again!');;
        var data = res?.payload?.data;
        dispatch(setTask(data));
      });
    },
    [setBoardId, setTask]
  );

  return (
    <div className={"BoardHeader"}>
      <div id={"BoardGrid"}>
        {Boards.map((data, index) => (
          <>
            {data.id == currentBoardId ? (
              <CardActive key={data.id} Data={data} Index={index} />
            ) : (
              <CardInactive
                key={data.id}
                Select={onSelect}
                Remove={DeleteBoard}
                Data={data}
                Index={index}
              />
            )}
          </>
        ))}
        <Grid.Column onClick={addBoard} className={"BoardCard-Inactive"}>
          <Add /> <p> Add New</p>
        </Grid.Column>
      </div>
    </div>
  );
};

const fixedMenuStyle = {
  backgroundColor: "white",
  height: "87px",
};

export default BoardHeader;
