'use client'
import React from 'react'
import dynamic from 'next/dynamic'


const ViewHarwat = dynamic(() => import('./ViewHarwat'), { ssr: false })

const TableMonitor = () => {
  return (
    <div>
      <ViewHarwat/>
    </div>
  )
}

export default TableMonitor
