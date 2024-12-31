import Button from "@mui/material/Button";
function Calculate({ friends, handleReset }) {
  return (
    <div className="calculate">
      <h2 className="secondary-heading">Trip Expense Breakdown</h2>
      <FriendsOwesList friends={friends} />
      <Button variant="outlined" onClick={handleReset}>
        Restart
      </Button>
    </div>
  );
}

function FriendsOwesList({ friends }) {
  const total = friends.reduce((acc, curr) => acc + curr.paid, 0);
  const eachShouldPay = total / friends.length;
  return (
    <ul className="list">
      {friends.map((friend) => (
        <FriendOwes
          friend={friend}
          owes={friend.paid - eachShouldPay}
          key={friend.id}
        />
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

export default Calculate;
