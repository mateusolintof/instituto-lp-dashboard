"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface LineChartProps {
  data: Array<{
    date: string
    value: number
    label?: string
  }>
  title?: string
  color?: string
  height?: number
}

export function LineChart({ data, title, color = '#3b82f6', height = 300 }: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current)

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
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(item => item.date),
        axisLabel: {
          color: '#6b7280',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6b7280',
          fontSize: 12
        }
      },
      series: [
        {
          name: title || 'Valor',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 2,
            color: color
          },
          areaStyle: {
            opacity: 0.1,
            color: color
          },
          itemStyle: {
            color: color
          },
          data: data.map(item => item.value)
        }
      ]
    }

    chartInstance.current.setOption(option)

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
    }
  }, [data, title, color])

  return <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />
}