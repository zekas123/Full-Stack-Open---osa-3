
const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  else if (message.startsWith('Failed to')) {
    return (
      <div className="addPersonMessageFailed">
        {message}
      </div>
    )
  }
  else if (message.startsWith('Added')) {
    return (
      <div className="addPersonMessage">
        {message}
      </div>
    )
  }
}

export default Message