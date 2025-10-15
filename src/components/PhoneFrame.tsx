import React from 'react'

interface PhoneFrameProps {
  children: React.ReactNode
  glowColor?: string
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ 
  children, 
  glowColor = "from-green-400 via-emerald-500 to-teal-500" 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="relative">
        {/* Outer Glow */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${glowColor} rounded-[3rem] opacity-20 blur-xl`}></div>
        
        {/* Phone Frame */}
        <div className="relative max-w-sm mx-auto bg-gradient-to-b from-gray-800 to-black p-2 rounded-[2.5rem] shadow-2xl">
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-[2rem] h-[640px] relative overflow-hidden backdrop-blur-sm">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-20 shadow-lg"></div>
            
            {/* Status Bar */}
            <div className="absolute top-1 left-4 right-4 flex justify-between items-center text-xs font-medium text-gray-600 z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-gray-600 rounded-sm">
                  <div className="w-3 h-1 bg-green-500 rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="h-full pt-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}