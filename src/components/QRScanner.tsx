import React, { useEffect, useRef, useState } from 'react'
import { X, AlertCircle } from 'lucide-react'
import jsQR from 'jsqr'

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string>('')
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
        }
      } catch (err: any) {
        setError(
          err.name === 'NotAllowedError'
            ? 'Por favor, autoriza el acceso a la cámara'
            : 'No se pudo acceder a la cámara del dispositivo'
        )
        setHasPermission(false)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (!isScanning || !hasPermission || !videoRef.current || !canvasRef.current) return

    const interval = setInterval(() => {
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas || video.videoWidth === 0) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setIsScanning(false)
        onScan(code.data)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isScanning, hasPermission, onScan])

  const handleClose = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 z-10"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Video Stream */}
      <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-black mb-6">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/30 backdrop-blur-sm">
            <AlertCircle className="text-red-400 mb-3" size={40} />
            <p className="text-white text-center font-medium">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {hasPermission && (
              <div className="absolute inset-0 border-4 border-emerald-400 rounded-2xl pointer-events-none">
                <div className="absolute inset-2 border-2 border-dashed border-emerald-300/50" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Instructions */}
      <div className="text-center text-white max-w-md">
        <h3 className="text-lg font-bold mb-2">Escanea el código QR</h3>
        <p className="text-gray-300 text-sm">
          Apunta la cámara al código QR del centro de reciclaje
        </p>
      </div>
    </div>
  )
}
