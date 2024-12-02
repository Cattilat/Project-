import React from 'react'

const WishList = () => {
  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-gray-800">My Wish List</h2>

    {/* No Data Placeholder */}
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-lg shadow-lg">
      <div className="text-center">
        <p className="text-lg text-gray-500">Your Wish List is currently empty.</p>
        <p className="mt-2 text-sm text-gray-400">Add items to your wish list to keep track of your favorites!</p>
      </div>
    </div>
  </div>
  )
}

export default WishList