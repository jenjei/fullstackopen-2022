
import { useSelector } from 'react-redux'
 
const Notification = () => {
  const notification = useSelector(state => state.notification)
  const state = useSelector(state => state)

  console.log('state at notification:', state)
  console.log('state notification:', notification.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.notification===undefined) {
    return (
      <div>
      </div>
    )
  } 
  else {
    return (
      <div style={style}>
        {notification.notification}
      </div>
    )
  }
}

export default Notification