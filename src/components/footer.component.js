export const Footer = () => {
  return (
    <div
      className='container-fluid bg-dark d-flex align-items-center justify-content-center'
      style={{ height: '100px' }}
    >
      <p className='text-white text-center'>
        Copyright {new Date().getFullYear()} Baijanath Tharu
      </p>
    </div>
  );
};
