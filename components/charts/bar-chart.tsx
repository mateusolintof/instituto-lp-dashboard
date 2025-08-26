"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface BarChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  title?: string
  height?: number
  horizontal?: boolean
}

export function BarChart({ data, title, height = 300, horizontal = false }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    chartInstance.current = echarts.init(chartRef.current)

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

    const option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#6b7280'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: horizontal ? 'value' : 'category',
        data: horizontal ? undefined : data.map(item => item.name),
        axisLabel: {
          color: '#6b7280',
          fontSize: 12,
          interval: 0,
          rotate: horizontal ? 0 : 45
        }
      },
      yAxis: {
        type: horizontal ? 'category' : 'value',
        data: horizontal ? data.map(item => item.name) : undefined,
        axisLabel: {
          color: '#6b7280',
          fontSize: 12
        }
      },
      series: [
        {
          name: title || 'Valor',
          type: 'bar',
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: item.color || colors[index % colors.length]
            }
          })),
          barWidth: '60%'
        }
      ]
    }

    chartInstance.current.setOption(option)

    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
    }
  }, [data, title, horizontal])

  return <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />
}