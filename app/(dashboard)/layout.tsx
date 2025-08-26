import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navigation = [
  { name: "Visão Geral", href: "/", value: "overview" },
  { name: "Canais", href: "/canais", value: "canais" },
  { name: "Campanhas", href: "/campanhas", value: "campanhas" },
  { name: "Funil", href: "/funil", value: "funil" },
  { name: "Appointments", href: "/appointments", value: "appointments" },
  { name: "Clusters", href: "/clusters", value: "clusters" },
  { name: "Insights", href: "/insights", value: "insights" },
  { name: "Exportar", href: "/exportar", value: "exportar" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Instituto LP</h1>
              <span className="ml-2 text-sm text-gray-500">Dashboard Analytics</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navigation.map((item) => (
              <Link
                key={item.value}
                href={item.href}
                className="whitespace-nowrap py-2 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}