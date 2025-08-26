"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { LineChart } from "@/components/charts/line-chart"
import { useDataStore } from "@/lib/store"

export default function CanaisPage() {
  const { mediaData } = useDataStore()

  // Sample data for demonstration
  const channelPerformance = [
    { name: 'Google Ads', value: 45231, color: '#4285f4' },
    { name: 'Facebook Ads', value: 32100, color: '#1877f2' },
    { name: 'Instagram', value: 28900, color: '#e4405f' },
    { name: 'YouTube', value: 18500, color: '#ff0000' },
    { name: 'LinkedIn', value: 12300, color: '#0077b5' },
    { name: 'TikTok', value: 8900, color: '#000000' }
  ]

  const channelROAS = [
    { name: 'Google Ads', value: 4.2 },
    { name: 'Facebook Ads', value: 3.8 },
    { name: 'Instagram', value: 3.5 },
    { name: 'YouTube', value: 2.9 },
    { name: 'LinkedIn', value: 2.1 },
    { name: 'TikTok', value: 1.8 }
  ]

  const timelineData = [
    { date: '01/08', value: 12500 },
    { date: '08/08', value: 18200 },
    { date: '15/08', value: 21300 },
    { date: '22/08', value: 19800 },
    { date: '29/08', value: 24100 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Análise de Canais</h2>
        <p className="text-muted-foreground">
          Performance detalhada por canal de marketing
        </p>
      </div>

      {/* KPIs por Canal */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Melhor Canal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Google Ads</div>
            <p className="text-xs text-muted-foreground">
              R$ 45.231 investidos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Maior ROAS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">
              Google Ads performance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Canais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Canais ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Investimento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 145.930</div>
            <p className="text-xs text-muted-foreground">
              Todos os canais
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investimento por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={channelPerformance} 
              title="Investimento (R$)"
              height={350}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Investimento</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={channelPerformance} 
              title="% do Total"
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ROAS por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={channelROAS} 
              title="Return on Ad Spend"
              height={300}
              horizontal={true}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Evolução Temporal</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={timelineData} 
              title="Investimento Total ao Longo do Tempo"
              color="#10b981"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Performance Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Canal</th>
                  <th className="text-right p-2">Investimento</th>
                  <th className="text-right p-2">Impressões</th>
                  <th className="text-right p-2">Cliques</th>
                  <th className="text-right p-2">CTR</th>
                  <th className="text-right p-2">CPC</th>
                  <th className="text-right p-2">ROAS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Google Ads</td>
                  <td className="text-right p-2">R$ 45.231</td>
                  <td className="text-right p-2">1.234.567</td>
                  <td className="text-right p-2">12.345</td>
                  <td className="text-right p-2">1.0%</td>
                  <td className="text-right p-2">R$ 3.67</td>
                  <td className="text-right p-2 text-green-600">4.2x</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Facebook Ads</td>
                  <td className="text-right p-2">R$ 32.100</td>
                  <td className="text-right p-2">987.654</td>
                  <td className="text-right p-2">9.876</td>
                  <td className="text-right p-2">1.0%</td>
                  <td className="text-right p-2">R$ 3.25</td>
                  <td className="text-right p-2 text-green-600">3.8x</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Instagram</td>
                  <td className="text-right p-2">R$ 28.900</td>
                  <td className="text-right p-2">756.432</td>
                  <td className="text-right p-2">8.234</td>
                  <td className="text-right p-2">1.1%</td>
                  <td className="text-right p-2">R$ 3.51</td>
                  <td className="text-right p-2 text-green-600">3.5x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}