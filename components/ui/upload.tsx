"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileUpload: (files: File[]) => void
  accept?: Record<string, string[]>
  maxFiles?: number
  className?: string
}

export function FileUpload({
  onFileUpload,
  accept = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-excel": [".xls"],
    "text/csv": [".csv"]
  },
  maxFiles = 2,
  className
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles)
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple: maxFiles > 1
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors",
        isDragActive && "border-blue-400 bg-blue-50",
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Solte os arquivos aqui..."
          : "Arraste arquivos aqui ou clique para selecionar"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Suporta: Excel (.xlsx, .xls), CSV (.csv)
      </p>
    </div>
  )
}