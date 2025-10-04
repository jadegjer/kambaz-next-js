import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <AccountNavigation />
      <div style={{ marginLeft: "200px" }} className="flex-fill p-4">
        {children}
      </div>
    </div>
  );
}