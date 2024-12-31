import { useState } from "react";
import Calculate from "./components/Calculate";
import Button from "@mui/material/Button";
import { Friends, AddFriendBox, FriendList } from "./components/Friends";

export default function App() {
  const [friends, setFriends] = useState([]);

  const [currPage, setCurrPage] = useState("enter-friends");

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleReset() {
    setFriends([]);
    setCurrPage("enter-friends");
  }

  function handleDeleteFriend(friend) {
    setFriends((friends) => friends.filter((f) => f.id !== friend.id));
  }

  function handleEditFriend(friend) {
    setFriends((friends) =>
      friends.map(function (f) {
        if (f.id === friend.id) {
          return friend;
        } else {
          return f;
        }
      })
    );
  }

  function handleCalculate() {
    setCurrPage("calculate");
  }

  return (
    <div>
      <Header />
      {currPage === "enter-friends" ? (
        <div className="enter-friends">
          <Friends>
            <h2 className="secondary-heading">
              Please enter the friends who went on the trip
            </h2>
            <AddFriendBox onAddFriend={handleAddFriend} friends={friends} />
            <FriendList
              friends={friends}
              onDeleteFriend={handleDeleteFriend}
              onEditFriend={handleEditFriend}
            />
          </Friends>
          <div className="next-buttons-container">
            <div className="next-buttons">
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={friends.length < 1}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleCalculate}
                disabled={friends.length < 2}
              >
                Calculate Expenses
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Calculate friends={friends} handleReset={handleReset}></Calculate>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <span className="title">Trip Expenses Calculator</span>
    </header>
  );
}
