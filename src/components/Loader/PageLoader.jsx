import React from 'react'

const PageLoader = () => {
    return (
        <div class="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-xs bg-black/30">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-primary"></div>
        </div>
    )
}

export default PageLoader