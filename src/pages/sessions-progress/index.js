import Head from "next/head";
import Image from "next/dist/client/image";
import BoardData from "../../data/data.json";
import SessionsData from "../../data/sessions.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from 'react'
import CardItem from "../../views/progress/CardItem";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import { getSession } from "next-auth/react";
import CardSession from "../../views/progress/CardSession";

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

return {
    props: {
      session: session
    }
  }

  // get the athlete profile by ID
}


const SessionsProgress=(props)=>{
  const [allSessions,setAllSessions]=useState([{name:"TO DO",items:[]},{name:"IN PROGRESS",items:[]},{name:"DONE",items:[]}]);
  const [ready, setReady] = useState(true);
  const [boardData, setBoardData] = useState(BoardData);
  const [isLoading,setLoading]=useState(true);
  const [itemsToUpdate,setItemsToUpdate]=useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/${props.session.user.id}/currentSessions`).
    then(data=>{
      console.log(data.data)
      data.data.forEach(d=>{
        let state=d.stateSessionAthlete.name;
        if(state=='TODO')
          allSessions.at(0).items.push(d);
        else if(state=='INPROGRESS') allSessions.at(1).items.push(d);
        else allSessions.at(2).items.push(d);
      });
      setLoading(false);
    }).catch(err=>{
      console.log(err)
    });
    console.log(allSessions)
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = allSessions;
    let dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    console.log(dragItem);
    itemsToUpdate.push(dragItem);
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setAllSessions(newBoardData);
    allSessions[0].items.forEach((i)=>{
      i.stateSessionAthlete.id=1;
      i.stateSessionAthlete.name="TODO";
    });
    allSessions[1].items.forEach((i)=>{
      i.stateSessionAthlete.id=2;
      i.stateSessionAthlete.name="IN PROGRESS";
    });
    allSessions[2].items.forEach((i)=>{
      i.stateSessionAthlete.id=3;
      i.stateSessionAthlete.name="DONE";
    });
    console.log(allSessions);
  };

  console.log(allSessions);

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;

        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  const updateStates=()=>{
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/currentSessionState/updateStates`,itemsToUpdate)
      .then(response=> {
        console.log(response)
      })
      .catch(err=>{
        console.log(err)
      });
    setItemsToUpdate([]);
  }

  if(isLoading) return <p>Is Loading...</p>

  return(
    <main className="pl-40 pt-16">
      <div className={"p-10"}>
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Studio Board</h4>
            {/*<div className={"w-5 h-5"}>
            <ChevronDownIcon
              className="text-gray-500 rounded-full
              p-1 bg-white ml-5 shadow-xl"
            />
            </div>*/}
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className='row my-2'>
                  {allSessions.map((board, bIndex) => {
                    return (
                      <div key={board.name} className='col-md-4'>
                        <Droppable droppableId={bIndex.toString()}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <div style={{background:'#9849DD'}}
                                className={`card
                            ${snapshot.isDraggingOver} `}
                              >
                                <div className='card-header'>
                                  <span className="text-2xl text-white">
                                    <b>{board.name}</b>
                                  </span>
                                </div>
                                <div style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                  {board.items.length > 0 &&
                                    board.items.map((item, iIndex) => {
                                      return (
                                        <CardSession
                                          key={item.id}
                                          data={item}
                                          index={iIndex}
                                          className="my-3"
                                        />
                                      );
                                    })}
                                  {provided.placeholder}
                                </div>
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
                  </div>
              </DragDropContext>
            )}
            <button className='btn btn-primary' onClick={e=>{
              e.preventDefault();
              updateStates();
            }}>save</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SessionsProgress;
