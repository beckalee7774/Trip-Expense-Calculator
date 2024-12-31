import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export function Friends({ children, onAddFriend }) {
  return <div className="view-and-add-friends">{children}</div>;
}

export function FriendList({ friends, onDeleteFriend, onEditFriend }) {
  return (
    <div className="input-friends">
      <ul className="list">
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onDeleteFriend={onDeleteFriend}
            onEditFriend={onEditFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onDeleteFriend, onEditFriend }) {
  const [editing, setEditing] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [editName, setEditName] = useState(friend.name);
  const [editPaid, setEditPaid] = useState(friend.paid);

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  function handleEditing() {
    setEditing((e) => !e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!editName || editPaid === null || editPaid === undefined) return;
    const newFriend = {
      name: editName,
      paid: editPaid,
      id: friend.id,
    };
    setEditing(false);
    onEditFriend(newFriend);
  }

  function cancel() {
    setEditing(false);
    setEditName(friend.name);
    setEditPaid(friend.paid);
  }

  return (
    <li>
      {editing ? (
        <>
          <div>
            <TextField
              label="Name"
              variant="outlined"
              value={editName}
              onChange={(event) => {
                setEditName(event.target.value);
              }}
            />
            <TextField
              label="Paid"
              variant="outlined"
              type="number"
              value={editPaid}
              onChange={(e) => setEditPaid(Number(e.target.value))}
            />
          </div>
          <div className="edit-friend-buttons">
            <Button variant="outlined" onClick={cancel}>
              cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              confirm
            </Button>
          </div>
        </>
      ) : (
        <>
          <span>
            {friend.name} paid : ${friend.paid}
          </span>
          <div className="edit-and-delete">
            <button onClick={handleEditing} className="edit-btn">
              <EditIcon />
            </button>
            <button onClick={handleOpenConfirmDelete} className="delete-btn">
              <DeleteIcon />
            </button>
            <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete}>
              <DialogTitle>
                Are you sure you want to delete this friend?
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    onDeleteFriend(friend);
                    handleCloseConfirmDelete();
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </li>
  );
}

export function AddFriendBox({ onAddFriend, friends }) {
  const [name, setName] = useState("");
  const [paid, setPaid] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || paid === null || paid === undefined) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      paid,
      id: id,
    };
    onAddFriend(newFriend);
    setName("");
    setPaid(0);
  }

  return (
    <form className="add-friend" name="add-friend">
      <div>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Paid"
          variant="outlined"
          type="number"
          value={paid}
          onChange={(e) => setPaid(Number(e.target.value))}
        />
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </form>
  );
}
