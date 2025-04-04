import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue, query, limitToLast } from "firebase/database";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Change this to show different number of recent transactions
  const numberOfTransactions = 8;

  useEffect(() => {
    const transactionsRef = query(ref(database, "transactions"), limitToLast(numberOfTransactions));

    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data)
          .reverse()
          .map(([key, value]) => ({
            id: key,
            message: value.message || "No message",
            timestamp: value.timestamp || null,
          }));
        setTransactions(formattedData);
      } else {
        setTransactions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [numberOfTransactions]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No date";

    try {
      const trimmed = timestamp.toString().slice(0, 10); // Get first 10 digits
      const date = new Date(parseInt(trimmed) * 1000);
      return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Last {numberOfTransactions} Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li key={tx.id} className="border p-3 rounded shadow">
              <p><strong>Message:</strong> {tx.message}</p>
              <p><strong>time:</strong> {formatTimestamp(tx.timestamp)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
