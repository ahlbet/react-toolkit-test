import React from 'react'

interface ResponseProps {
  talent: any
  error: any
  children: React.ReactChild
}

const TalentResponse = (
  props: ResponseProps) => {

  const {
    talent,
    error,
    children
  } = props

  if (talent) {
    if (talent.data) {
      return (
          <div className="talent-response">
            {children}
          </div>)
    } else {
      return (
          <div className="talent-response">
            {error}
          </div>)
    }
  }

  return null
}

export default TalentResponse
