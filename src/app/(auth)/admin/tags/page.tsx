import { DataTable } from "@/components/common/Table/DataTable";
import Typography from "@/components/common/Typography";
import type { ColumnDef } from "@tanstack/react-table";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52fe",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52fg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52fk",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function TagListPage() {
  const data = await getData();
  return (
    <div>
      <Typography text="Quản lý tags" />

      <div className="mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
