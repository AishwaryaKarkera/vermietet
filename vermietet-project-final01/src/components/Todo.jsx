import React, { useMemo } from 'react';
import { LazyImage } from '.';
import './Todo.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

export const Todo = ({ todo, onChange, config, isCompleted }) => {
  const [showModal, setShownModal] = React.useState(false); // set to show modal
  const [completed, setCompleted] = React.useState(false); //To check if todo is completed
  const [isHovering, setIsHovering] = React.useState(false); //hovering state

  const handleModal = () => {
    //set hovering of modal
    setIsHovering(false);
    setShownModal(!showModal);
  };

  const closeModal = () => {
    //close modal on clicking close button
    setShownModal(false);
    setIsHovering(false);
  };

  React.useEffect(() => {
    //mark as completed on checkbox if todo is completed
    setCompleted(isCompleted);
  }, [isCompleted]);

  var formattedNames = []; // To concatinate the complete name with title
  const style = {
    // Modal styles
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    maxWidth: '100%',
    maxheight: '100%',
  };
  const getNames = (names) => {
    //get name object and organize according to output e.g( Mr firstName Lastname)
    if (names === Object(names)) {
      // Object here
      if (names.name !== undefined && names.name != null) {
        for (const [key, value] of Object.entries(names.name)) {
          formattedNames += ' ' + value;
        }
        return formattedNames;
      } else {
        return 'No name';
      }
    }
  };

  const userName = useMemo(() => getNames(todo), []); //remeber to organize the names after every call

  const getLocation = ({ location: { street, ...rest } }) => {
    //organize the address
    const myStreetName = street.name;
    const myStreetNumber = street.number;
    const myPostcode = rest.postcode;
    return (
      <span>
        Address: {myStreetName + ' ' + myStreetNumber}
        <br></br>
        Postcode: {myPostcode}
      </span>
    );
  };

  const userLocation = useMemo(() => getLocation(todo), []); //remeber to organize the address after every call

  const getPicture = () => {
    //lazy load the picture
    if (!todo.testing) {
      return <LazyImage src={todo.picture.large} alt={todo.picture.large} />;
    }
  };
  const handleMouseOver = () => {
    //set hovering when mouse enter on card
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    //Unset hovering when mouse enter on card
    setIsHovering(false);
  };
  return (
    <div
      className="todo"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="todo_image" onClick={handleModal}>
        {getPicture()}
      </div>
      <div className="todo_title">{userName}</div>
      {isHovering && (
        <React.Fragment>
          <div className="todo_location">{userLocation}</div>
          <span>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Checkbox
                  checked={completed ? true : false}
                  onChange={onChange}
                />
              }
              label="Completed"
            />
          </span>
        </React.Fragment>
      )}
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="todo-modal">
            <div className="todo_image-modal">{getPicture()}</div>
            <div className="todo_title">{userName}</div>
            <div className="todo_location">{userLocation}</div>
            <span>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox checked={completed} onChange={onChange} />}
                label="Completed"
              />
            </span>
            <div className="modal-button">
              <Button variant="outlined" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
