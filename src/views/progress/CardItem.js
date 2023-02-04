import React from "react";
import Image from "next/dist/client/image";
import { Draggable } from "react-beautiful-dnd";

const CardItem=({ data, index })=> {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div className="bg-secondary m-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
              data.priority === 0
                ? "from-blue-600 to-blue-400"
                : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
            }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
                ? "Medium Priority"
                : "High Priority"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div>
            <div>
              <span className="flex space-x-1 items-center">
                <span>{data.chat}</span>
              </span>
            </div>
          </div>
        </div>

      )}
    </Draggable>
  );
}

export default CardItem;
