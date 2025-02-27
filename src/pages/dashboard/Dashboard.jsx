import { ArrowSwapVertical, Box, NotificationBing, ShoppingCart } from 'iconsax-react'
import React from 'react'

function Dashboard() {
  return (
    <>
      <section className='h-full w-full'>
        {/* =====================Dashboard header===================== */}
        <div className="bg-white p-8 m-4 sm:m-5 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 ">
          <div className="flex items-center space-x-3 border-r-0 sm:border-r mr-8 border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-orange-50">
              <ShoppingCart size={26} className="text-orange-500" />
            </div>
            <div className="space-y-1">
              <h6 className='text-gray-500 font-tb text-sm'>Order Completed</h6>
              <h6 className='text-orange-500 font-tb font-semibold text-base'>1.237k</h6>
            </div>
          </div>
          <div className="flex items-center space-x-3 border-r-0 lg:border-r  mr-8 border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-purple-50">
              <ArrowSwapVertical size={26} className="text-purple-600" />
            </div>
            <div className="space-y-1">
              <h6 className='text-gray-500 font-tb text-sm'>Total Number</h6>
              <h6 className='text-purple-600 font-tb font-semibold text-base'>12.37k</h6>
            </div>
          </div>
          <div className="flex items-center space-x-3 border-r-0 md:border-r mr-8 border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-sky-50">
              <Box size={26} className="text-orange-500" />
            </div>
            <div className="space-y-1">
              <h6 className='text-gray-500 font-tb text-sm'>Order Completed</h6>
              <h6 className='text-orange-500 font-tb font-semibold text-base'>1.237k</h6>
            </div>
          </div>
          <div className="flex items-center space-x-3 ">
            <div className="p-3.5 rounded-xl bg-red-50">
              <NotificationBing size={26} className="text-red-500" />
            </div>
            <div className="space-y-1">
              <h6 className='text-gray-500 font-tb text-sm'>Total Notification's</h6>
              <h6 className='text-red-500 font-tb font-semibold text-base'>1.237k</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard