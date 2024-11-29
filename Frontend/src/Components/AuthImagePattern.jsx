import React from 'react'

const AuthImagePattern = ({title , subtitle}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-primary/10 rounded-md">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_,i) => (
                <div key={i}
                    className={`aspect-square rounded-2xl bg-primary/10 ${
                        i % 2 === 0 ? "animation-pulse" : ""
                    }`}
                />
            ))}
        </div>
        <h2 className="text-2xl font-black mb-4">{title}</h2>
        <p className="to-base-content/60">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern
