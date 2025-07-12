import React from 'react'

const hi = () => {
  return (
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hi ${userName},</h2>
      <p>We've just added a new show to our library:</p>
      <h3 style='color: F84565;'>"${movieTitle}"</h3>
      <p>Visit our website</p>
      <br />
      <p>Thanks, <br />QuickShow Team</p>
    </div>
  )
}

export default hi