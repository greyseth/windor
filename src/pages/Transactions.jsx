import { Outlet, useLocation, useParams } from "react-router-dom";
import "../assets/css/transactions.css";

import TransactionList from "../components/TransactionList";
import ExtraPageContainer from "../components/ExtraPageContainer";
import { useEffect, useState } from "react";
import request from "../util/API";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Transactions() {
  const { id_order } = useParams();
  const location = useLocation();

  const [transactions, setTransactions] = useState({ loading: true, data: [] });

  async function fetchTransactions() {
    const response = await request("GET", "/order");
    if (!response || response.error)
      return setTransactions({ ...transactions, error: true });
    setTransactions({ loading: false, data: response });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      {id_order ? (
        <ExtraPageContainer>
          <Outlet />
        </ExtraPageContainer>
      ) : null}

      <p className="font-bold text-lg m-4 text-(--primary-color)">
        My Transactions
      </p>

      {transactions.loading ? (
        transactions.error ? (
          <LoadingError onRetry={fetchTransactions} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <TransactionList
            label={"Pending Transactions"}
            transactions={transactions.data.filter(
              (t) => t.order_status === "PENDING"
            )}
          />
          <TransactionList
            label={"Accepted/Cancelled Orders"}
            transactions={transactions.data.filter(
              (t) => t.order_status !== "PENDING" && t.order_status !== "DONE"
            )}
          />
          <TransactionList
            label={"All Transactions"}
            transactions={transactions.data}
          />
        </>
      )}
    </>
  );
}
