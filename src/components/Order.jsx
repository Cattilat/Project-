import React from 'react'

const Order = () => {
  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-gray-800">My Orders</h2>

    {/* No Data Placeholder */}
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-lg shadow-lg">
      <div className="text-center">
        <p className="text-lg text-gray-500">You haven't placed any orders yet.</p>
        <p className="mt-2 text-sm text-gray-400">Browse through the store and make your first purchase!</p>
      </div>
    </div>
  </div>
  )
}

export default Order