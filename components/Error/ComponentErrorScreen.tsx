import React from 'react'

interface Props {
  message?: string;
}

const ComponentErrorScreen = (props: Props) => {
  const { message } = props

  const handleClickRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="main-bg">
      <div className="error-screen">
        <h2 className="error-screen__header">An Error Occured</h2>
        <div className="error-screen__main">
          <div className="error-screen__wrap">
            <h3>
              Please <a onClick={handleClickRefresh}>refresh your screen</a>
            </h3>

            {message && <p className="error-screen__message">Error: {message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentErrorScreen
