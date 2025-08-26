"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataUploader } from "@/components/data-uploader"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { useDataStore } from "@/lib/store"

export default function OverviewPage() {
  const { mediaData, appointmentsData } = useDataStore()

  // Sample data for charts when no real data is available
  const sampleTimelineData = [
    { date: '01/08', value: 1200 },
    { date: '08/08', value: 1800 },
    { date: '15/08', value: 2100 },
    { date: '22/08', value: 1900 },
    { date: '29/08', value: 2400 }
  ]

  const sampleChannelData = [
    { name: 'Google Ads', value: 45231, color: '#4285f4' },
    { name: 'Facebook Ads', value: 32100, color: '#1877f2' },
    { name: 'Instagram', value: 28900, color: '#e4405f' },
    { name: 'Orgânico', value: 15600, color: '#10b981' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Visão Geral</h2>
        <p className="text-muted-foreground">
          Resumo dos principais KPIs e métricas do período
        </p>
      </div>

      <DataUploader />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Investimento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <p className="text-xs text-muted-foreground">
              +20,1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Gerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.354</div>
            <p className="text-xs text-muted-foreground">
              +180% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +19% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Comparecimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73,5%</div>
            <p className="text-xs text-muted-foreground">
              -2,1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Temporal</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={sampleTimelineData} 
              title="Investimento ao longo do tempo"
              color="#3b82f6"
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={sampleChannelData} 
              title="Investimento por Canal"
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}