import React from 'react'
import { Button } from './ui/button'

const VolumeButtons = ({ volume, isActive, onClick }: { volume: number, isActive: boolean, onClick: () => void }) => {
  return (
    <Button 
      className={`w-10 h-6 rounded-[7px] text-gray-700 transition-all duration-300 hover:border-gray-500 text-xs 
                  ${isActive ? 'border-gray-900 border-2' : 'border border-gray-300'}`}
      onClick={onClick}
    >
      {volume}
    </Button>
  )
}

export default VolumeButtons