// Table component
export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="mt-8 border-collapse table-auto text-sm">
      {children}
    </table>
  );
};

// TableHead component
export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

// TableBody component
export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

// TableHeadCell component
export const TableHeadCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="py-3 px-6 font-semibold text-left border-b">{children}</th>
  );
};

// TableCell component
export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="py-3 px-6 border-b">{children}</td>;
};

// TableRow component
export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};
