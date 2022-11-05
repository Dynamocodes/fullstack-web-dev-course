const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  return (
    <div id="notification" className={notification.type}>
      {notification.message}
    </div>
  );
};

export default Notification;
