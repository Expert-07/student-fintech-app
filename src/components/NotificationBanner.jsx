// Simple notification banner
const NotificationBanner = ({ message, onClose }) =>
  message ? (
    <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow z-50">
      {message}
      <button
        type="button"
        aria-label="Close notification"
        onClick={onClose}
        className="ml-2 text-white"
      >✖</button>
    </div>
  ) : null;

export default NotificationBanner;