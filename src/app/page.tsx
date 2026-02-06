import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Header from "@/components/Header";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import TransactionChart from "@/components/TransactionChart";
import { getTransactions } from "./actions";

export default async function Home() {
  const transactions = await getTransactions();

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Header />
      <Balance total={total} />
      <IncomeExpense income={income} expense={expense} />
      <TransactionChart transactions={transactions} />
      <TransactionList transactions={transactions} />
      <AddTransaction />
    </div>
  );
}
