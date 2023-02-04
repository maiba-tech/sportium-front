import React from "react";
import Image from "next/dist/client/image";
import { Draggable } from "react-beautiful-dnd";

const CardSession=({ data, index })=> {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div className="bg-secondary m-2"
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
        >
          <div>
            <div>
              <span className="flex space-x-1 items-center">
                <span>{data.session.title}</span>
              </span>
            </div>
          </div>
        </div>

      )}
    </Draggable>
  );
}

export default CardSession;
