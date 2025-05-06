
export default async function DashboardLayout({ children, }: { children: React.ReactNode  }) {

  return (
    <section className="[--header-height:calc(--spacing(14))]">
        <div className="flex flex-1 flex-col gap-4 p-1 items-center">
            {children}
        </div> 
    </section>
  )
}