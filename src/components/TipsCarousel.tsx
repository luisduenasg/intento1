import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { recyclingTips, RecyclingTip } from '../data/recycling-tips'

export const TipsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recyclingTips.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + recyclingTips.length) % recyclingTips.length)
    setAutoPlay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recyclingTips.length)
    setAutoPlay(false)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const currentTip = recyclingTips[currentIndex]

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Carousel Items */}
        <div className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {recyclingTips.map((tip) => (
            <div key={tip.id} className="w-full flex-shrink-0">
              <div className={`bg-gradient-to-br ${tip.color} rounded-3xl p-6 md:p-8 min-h-[340px] shadow-xl border border-white/50`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-4xl">{tip.icon}</span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{tip.title}</h3>
                        <p className="text-sm md:text-base text-gray-600 font-medium">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips List */}
                <div className="space-y-3">
                  {tip.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <span className="text-lg flex-shrink-0 mt-1">{detail.charAt(0)}</span>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {detail.substring(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Impact Badge */}
                <div className="mt-6 inline-block bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                  💡 Consejo #{currentIndex + 1} de {recyclingTips.length}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <ChevronLeft className="text-gray-700" size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <ChevronRight className="text-gray-700" size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {recyclingTips.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-emerald-500'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
