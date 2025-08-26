"use client"

import { useState } from "react"
import { FileUpload } from "@/components/ui/upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDataStore } from "@/lib/store"
import { parseFile } from "@/lib/file-parser"

export function DataUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { setMediaData, setAppointmentsData, setLoading } = useDataStore()

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files)
  }

  const processFiles = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    setLoading(true)

    try {
      for (const file of uploadedFiles) {
        const data = await parseFile(file)
        
        if (file.name.toLowerCase().includes('reportei') || 
            file.name.toLowerCase().includes('media') ||
            file.name.toLowerCase().includes('midia')) {
          setMediaData(data)
        } else if (file.name.toLowerCase().includes('appointment') || 
                   file.name.toLowerCase().includes('agendamento')) {
          setAppointmentsData(data)
        } else {
          // Auto-detect based on columns
          const columns = Object.keys(data[0] || {})
          const hasMediaColumns = columns.some(col => 
            ['impressions', 'clicks', 'spend', 'ctr'].some(mediaCol => 
              col.toLowerCase().includes(mediaCol)
            )
          )
          
          if (hasMediaColumns) {
            setMediaData(data)
          } else {
            setAppointmentsData(data)
          }
        }
      }
    } catch (error) {
      console.error('Erro ao processar arquivos:', error)
    } finally {
      setIsProcessing(false)
      setLoading(false)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Importar Dados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUpload onFileUpload={handleFileUpload} />
        
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Arquivos selecionados:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
            ))}
            
            <Button 
              onClick={processFiles} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processando..." : "Processar Arquivos"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}