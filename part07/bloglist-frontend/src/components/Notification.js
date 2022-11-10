import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if( props.notificationText !== null){
    return (
      <div id= "notification" className={props.notificationType} style={style}>
        {props.notificationText}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notificationText: state.notificationText,
    notificationType: state.notificationType
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification