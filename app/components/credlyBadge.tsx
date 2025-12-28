'use client'

import React, { useEffect } from 'react';

const CredlyBadge = ({ badgeId }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "//cdn.credly.com/assets/utilities/embed.js"
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      // cleanup
      document.body.removeChild(script);
    }
  }, [])

  return (
    // TODO fix particles rendering over the top
    <div className='bg-white'>
      <div 
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id={badgeId}>
      </div>
    </div>
  )
}

export default CredlyBadge
