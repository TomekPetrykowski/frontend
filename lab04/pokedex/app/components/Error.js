export default function Error({ message }) {
  return (
    <div className="error">
      <p>Wystąpił błąd. {message}</p>
    </div>
  );
}
