import { Layout } from '../components/layout.component';

export const HomeScreen = () => {
  return (
    <Layout>
      <div
        className='container-fluid d-flex align-items-center justify-content-center'
        style={{ backgroundColor: 'wheat', height: '84.5vh' }}
      >
        <div className='row w-50'>
          <div className='col-sm d-flex flex-column align-items-center justify-content-center  w-100'>
            <h3 className='align-self-end m-lg-2 fw-bolder'>
              Find Quality Movies Here
            </h3>
            <button
              className='btn align-self-end m-lg-2'
              style={{ color: 'wheat', backgroundColor: 'orangered' }}
            >
              REGISTER NOW
            </button>
            <h4 className='align-self-end m-lg-2 text-secondary'>
              To find out more
            </h4>
          </div>
          <div className='col-sm w-100'>
            <form
              className='m-4 p-4 rounded'
              style={{ backgroundColor: 'gray' }}
            >
              <h4 className='text-center my-2 fw-bold'>
                Start Rating Movies Now
              </h4>
              <div className='mb-3'>
                <label
                  for='exampleInputEmail1'
                  className='form-label'
                  style={{ color: 'wheat' }}
                >
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                />
              </div>
              <div className='mb-3'>
                <label
                  for='exampleInputPassword1'
                  className='form-label'
                  style={{ color: 'wheat' }}
                >
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                />
              </div>
              <div className='mb-3 form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='exampleCheck1'
                />
                <label
                  className='form-check-label'
                  style={{ color: 'wheat' }}
                  for='exampleCheck1'
                >
                  Remember Me
                </label>
              </div>
              <button
                type='submit'
                style={{ backgroundColor: 'black' }}
                className='btn text-white'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
