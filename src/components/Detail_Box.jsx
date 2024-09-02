import React from 'react';
import moment from 'moment';

const Detail_Box = ({premium, expenses }) => {
  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr>
          <th className="p-2 border  text-white text-center bg-[#6ed9e2] xs:text-[13px] sm:text-[15px]">Title</th>
          <th className="p-2 border text-white text-center bg-[#6ed9e2] xs:text-[13px] sm:text-[15px]">Description</th>
          <th className="p-2 border text-white text-center bg-[#6ed9e2] xs:text-[13px] sm:text-[15px]">Amount</th>
          <th className="p-2 border text-white text-center bg-[#6ed9e2] xs:text-[13px] sm:text-[15px]">Date</th>
          <th className="p-2 border text-white text-center bg-[#6ed9e2] xs:text-[13px] sm:text-[15px]">Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td className="p-2 border text-center bg-white  xs:text-[10px] sm:text-[13px]">{expense.title}</td>
            <td className="p-2 border text-center bg-white xs:text-[10px] sm:text-[13px]">{expense.description}</td>
            <td className="p-2 border text-center bg-white xs:text-[10px] sm:text-[13px]">{expense.amount}</td>
            <td className="p-2 border text-center bg-white xs:text-[10px] sm:text-[13px]">
              {moment(expense.date).format('MMMM Do, YYYY')}
            </td>
            <td className="p-2 border text-center bg-white xs:text-[10px] sm:text-[13px]">{expense.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Detail_Box;
