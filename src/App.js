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
  return (
    <div className="container">
      <Header />
      <main>
        <Friends friends={friends} onAddFriend={handleAddFriend} />
        <Calculate friends={friends} />
      </main>
      <Footer onReset={handleReset} />
    </div>
  );
}

function Friends({ friends, onAddFriend }) {
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleAddNewFriend() {
    setShowAddFriend((s) => !s);
  }
  return (
    <div className="view-and-add-friends">
      <FriendList friends={friends} />
      <Button onClick={handleAddNewFriend} colorClass="cambridge-blue">
        {showAddFriend ? "Close" : "Add New Friend"}
      </Button>
      {showAddFriend && <AddFriend onAddFriend={onAddFriend} />}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="primary-heading">Trip Expenses Calculator 🏖</h1>
    </header>
  );
}

function FriendList({ friends }) {
  return (
    <div className="input-friends">
      <h2 className="secondary-heading">Input your friends here</h2>
      <ul className="list">
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.name} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      {friend.name} paid : ${friend.paid}
    </li>
  );
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [paid, setPaid] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || paid === null || paid === undefined) return;
    const newFriend = {
      name,
      paid,
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

function Calculate({ friends }) {
  const [showOwesList, setShowOwesList] = useState(false);
  function handleCalculateExpenses() {
    setShowOwesList((s) => !s);
  }
  return (
    <div className="calculate">
      <Button onClick={handleCalculateExpenses} colorClass="celadon">
        {showOwesList ? "Close" : "Calculate Expenses"}
      </Button>
      {showOwesList && <FriendsOwesList friends={friends} />}
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
