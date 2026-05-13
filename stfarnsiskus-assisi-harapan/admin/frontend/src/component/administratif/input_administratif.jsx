export default function Input_Administratif({ onClose }) {
  const handleClose = () => {
    onClose;
  };
  return (
    <section>
      <span>input administratif</span>
      <button onClick={handleClose}>
        <span>X</span>
      </button>
    </section>
  );
}
