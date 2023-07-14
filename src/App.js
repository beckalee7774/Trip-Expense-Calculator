import { useState } from "react";

// const intitialFriends = [
//   { name: "Rebecca", paid: 50 },
//   { name: "Andrew", paid: 150 },
//   { name: "John", paid: 0 },
//   { name: "Jeremy", paid: 200 },
//   { name: "Adem", paid: 100 },
// ];

function Button({ children, colorClass, onClick }) {
  return (
    <button onClick={onClick} className={`btn ${colorClass}`}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState([]);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleReset() {
    setFriends([]);
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

  return (
    <div className="container">
      <Header />
      <main>
        <Friends>
          <FriendList
            friends={friends}
            onDeleteFriend={handleDeleteFriend}
            onEditFriend={handleEditFriend}
          />
          <AddFriend onAddFriend={handleAddFriend} friends={friends} />
        </Friends>
        <Calculate>
          <FriendsOwesList friends={friends} />
        </Calculate>
      </main>
      <Footer onReset={handleReset} />
    </div>
  );
}

function Friends({ children, onAddFriend }) {
  return <div className="view-and-add-friends">{children}</div>;
}

function AddFriend({ onAddFriend }) {
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleAddNewFriend() {
    setShowAddFriend((s) => !s);
  }
  return (
    <>
      <Button onClick={handleAddNewFriend} colorClass="cambridge-blue">
        {showAddFriend ? "Close" : "Add New Friend"}
      </Button>
      ;{showAddFriend && <AddFriendBox onAddFriend={onAddFriend} />}
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="primary-heading">Trip Expenses Calculator 🏖</h1>
    </header>
  );
}

function FriendList({ friends, onDeleteFriend, onEditFriend }) {
  return (
    <div className="input-friends">
      <h2 className="secondary-heading">Input your friends here</h2>
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
  function handleEditing() {
    setEditing((e) => !e);
  }
  return (
    <li>
      {friend.name} paid : ${friend.paid}
      <div class="edit-and-delete">
        <button onClick={handleEditing} class="edit-btn">
          ✏️
        </button>
        {editing && (
          <EditFriend
            friend={friend}
            onEditFriend={onEditFriend}
            onSetEditing={setEditing}
          />
        )}
        <button onClick={() => onDeleteFriend(friend)} class="delete-btn">
          ❌
        </button>
      </div>
    </li>
  );
}

function EditFriend({ friend, onEditFriend, onSetEditing }) {
  const [editName, setEditName] = useState(friend.name);
  const [editPaid, setEditPaid] = useState(friend.paid);
  function handleSubmit(e) {
    e.preventDefault();
    if (!editName || editPaid === null || editPaid === undefined) return;
    const newFriend = {
      name: editName,
      paid: editPaid,
      id: friend.id,
    };
    onSetEditing(false);
    onEditFriend(newFriend);
  }
  return (
    <form className="edit-friend" name="edit-friend">
      <div>
        <label for="edit-name">Name </label>
        <input
          id="edit-name"
          type="text"
          placeholder="New Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        ></input>
      </div>
      <div>
        <label for="edit-paid">Paid </label>
        <input
          id="edit-paid"
          type="number"
          placeholder="New Amount Paid"
          value={editPaid}
          onChange={(e) => setEditPaid(Number(e.target.value))}
        ></input>
      </div>
      <button onClick={handleSubmit} className="cambridge-blue edit-submit-btn">
        Submit
      </button>
    </form>
  );
}

function AddFriendBox({ onAddFriend, friends }) {
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
        <label for="name">Name </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label for="paid">Paid </label>
        <input
          id="paid"
          type="number"
          placeholder="Amount Paid"
          value={paid}
          onChange={(e) => setPaid(Number(e.target.value))}
        ></input>
      </div>
      <Button onClick={handleSubmit} colorClass="cambridge-blue">
        Submit
      </Button>
    </form>
  );
}

function Calculate({ children }) {
  const [showOwesList, setShowOwesList] = useState(false);
  function handleCalculateExpenses() {
    setShowOwesList((s) => !s);
  }
  return (
    <div className="calculate">
      <Button onClick={handleCalculateExpenses} colorClass="celadon">
        {showOwesList ? "Close" : "Calculate Expenses"}
      </Button>
      {showOwesList && children}
    </div>
  );
}

function FriendsOwesList({ friends }) {
  const total = friends.reduce((acc, curr) => acc + curr.paid, 0);
  const eachShouldPay = total / friends.length;
  return (
    <ul className="list">
      {friends.map((friend) => (
        <FriendOwes friend={friend} owes={friend.paid - eachShouldPay} />
      ))}
    </ul>
  );
}

function FriendOwes({ friend, owes }) {
  return (
    <li>
      <span>{friend.name}</span>
      <span>
        {" "}
        {owes < 0 ? "Owes: " : "is Owed: "}${Math.abs(owes).toFixed(2)}
      </span>
    </li>
  );
}

function Footer({ onReset }) {
  return (
    <footer className="footer">
      <Button onClick={onReset} colorClass="brown">
        Reset
      </Button>
    </footer>
  );
}
