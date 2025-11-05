import { Outlet, useLocation, useParams } from "react-router-dom";
import "../assets/css/transactions.css";

import TransactionList from "../components/TransactionList";
import ExtraPageContainer from "../components/ExtraPageContainer";
import Receipt from "./Receipt";

export default function Transactions() {
  const { id_order } = useParams();
  const location = useLocation();

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

      <TransactionList label={"Pending Transactions"} />
      <TransactionList label={"Accepted/Cancelled Orders"} />
      <TransactionList label={"All Transactions"} />
    </>
  );
}
