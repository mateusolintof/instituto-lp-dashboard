import * as XLSX from 'xlsx'
import Papa from 'papaparse'

export async function parseFile(file: File): Promise<any[]> {
  const fileType = file.type
  const fileName = file.name.toLowerCase()

  try {
    if (fileType.includes('sheet') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return await parseExcel(file)
    } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      return await parseCSV(file)
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // PDF parsing not supported in browser environment
      throw new Error('Arquivos PDF devem ser processados no servidor. Por favor, converta para Excel ou CSV.')
    }
    
    throw new Error('Formato de arquivo não suportado. Use Excel (.xlsx) ou CSV (.csv)')
  } catch (error) {
    console.error('Erro ao fazer parse do arquivo:', error)
    throw error
  }
}

async function parseExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        resolve(jsonData)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Erro ao ler arquivo Excel'))
    reader.readAsArrayBuffer(file)
  })
}

async function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error('Erro ao fazer parse do CSV'))
        } else {
          resolve(results.data)
        }
      },
      error: (error) => reject(error)
    })
  })
}