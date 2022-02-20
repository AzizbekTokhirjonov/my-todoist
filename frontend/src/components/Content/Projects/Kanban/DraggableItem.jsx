import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
const DraggableItem = ({ item, index, id }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              userSelect: "none",
              ...provided.draggableProps.style,
            }}
          >
            <Paper
              style={{
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging ? "#eeeeee" : "#fff",
                color: "#000",
              }}
              elevation={12}
              className="d-flex justify-content-between"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={item.content}
                  id={id}
                />
                <label className="form-check-label" htmlFor={id}>
                  {item.content}
                </label>
              </div>
              <div className="hoverable-icons mr-2">
                <BsThreeDots />
              </div>
            </Paper>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default DraggableItem;
