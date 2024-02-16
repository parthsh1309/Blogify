import React from 'react'

function ProfileBtn({onClick}) {
  return (
    <button
            type="button"
            className="flex w-auto text-sm bg-gray-800 rounded-full md:me-0 "
            onClick={onClick}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>

  )
}

export default ProfileBtn