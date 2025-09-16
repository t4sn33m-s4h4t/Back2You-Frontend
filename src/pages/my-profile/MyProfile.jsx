import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import {
  FaUserShield,
  FaEnvelope,
  FaUserCircle,
  FaStar,
  FaTimes
} from 'react-icons/fa'

const MyProfile = () => {
  const { user, trustScore, setTrustScore } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch user details
  const { data: currentUser = {} } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`)
      return res.data
    },
    enabled: !!user?.email
  })

  return (
    <div className=' bg-gray-100 flex items-center justify-center py-12 px-4'>
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-lg w-full'>
        {/* Profile Header */}
        <div className='flex items-center justify-center mb-6'>
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt='Profile'
              className='w-24 h-24 rounded-full border-4 border-blue-500 shadow-md'
            />
          ) : (
            <FaUserCircle className='text-gray-400 w-24 h-24' />
          )}
        </div>

        {/* User Details */}
        <h2 className='text-2xl font-semibold text-center text-gray-800'>
          {currentUser?.name || 'User Name'}
        </h2>
        <p className='text-center text-gray-500 mt-1'>
          {currentUser?.email || 'user@example.com'}
        </p>

        {/* Role Badge */}
        <div className='flex justify-center mt-4'>
          <span className='bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold rounded-full flex items-center gap-2'>
            <FaUserShield /> {currentUser?.role || 'User'}
          </span>
        </div>

        {/* Trust Score Section */}
        <div className='mt-6 bg-gray-200 p-4 rounded-lg flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <FaStar className='text-yellow-500 text-xl' />
            <h3 className='text-lg font-medium text-gray-800'>Trust Score</h3>
          </div>
          <p className='text-xl font-bold text-blue-600'>{trustScore}</p>
        </div>

        {/* Helping Actions (Future Feature) */}
        <div className='mt-6'>
          <button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition'
            onClick={() => setIsModalOpen(true)}
          >
            Increase Trust Score ⭐
          </button>
        </div>

        {/* Modal for Trust Score Information */}
        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 p-6 bg-gray-800'>
            <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
              <div className='flex justify-between items-center border-b pb-2'>
                <h3 className='text-xl font-bold text-gray-800'>
                  How to Increase Trust Score?
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <FaTimes className='text-gray-600 hover:text-red-500 text-lg' />
                </button>
              </div>

              <div className='mt-4'>
                <p className='text-gray-700'>
                  Your trust score reflects how helpful and responsible you are
                  in returning lost items.
                </p>
                <ul className='mt-3 list-disc list-inside text-gray-600 space-y-2'>
                  <li>📌Return lost items to rightful owners.</li>
                  <li>🌟Update your post type from found to recovered.</li>
                  <li>👍Get positive feedback from others.</li>
                  <li>🚀Participate in community activities.</li>
                </ul>
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition'
                  onClick={() => setIsModalOpen(false)}
                >
                  Got It! 👍
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
