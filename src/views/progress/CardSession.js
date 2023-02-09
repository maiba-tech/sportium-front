import React from "react";
import Image from "next/dist/client/image";
import { Draggable } from "react-beautiful-dnd";
import { Divider, Typography } from "@mui/material";

const CardSession=({ data, index })=> {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div className="card m-2"
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
        >
          <div className='card-header'>
            <span className="flex space-x-1 items-center">
                <span>{data.session.title}</span>
              </span>
          </div>
          <div className="card-body">
            <div>
              <ul>
                {
                  data.session.listSteps.map((step,sIndex)=>{
                    return (
                      <li key={sIndex}>
                        <Typography sx={{color: step.color}}>
                          <strong>
                            {step.type}
                          </strong>
                        </Typography> in <strong>{step.duration}</strong> for <strong>{step.repetition === 0? 1: step.repetition}</strong> times
                        <Divider />
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>

      )}
    </Draggable>
  );
}

export default CardSession;
