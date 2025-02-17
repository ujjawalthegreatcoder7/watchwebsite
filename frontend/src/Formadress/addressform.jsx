import "./addressform.css" 
import { useNavigate } from 'react-router-dom';

function FormAddress() {
// useNavigate
  const filldeliverydetails = () => {
    navigate('/Riviera Klock/filldeliverydetails');
  }


return(
    <>
<form class="row g-3  " style={{padding : "4rem"}} action="POST" >
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input
  type="email"
  name="text"
  className="form-control colorborder"
  id="inputEmail4"
/>  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control colorborder" id="inputPassword4"></input>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control colorborder" id="inputAddress" placeholder="1234 Main St"></input>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control colorborder" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control colorborder" id="inputCity"></input>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label  colorborder">State</label>
    <select id="inputState" class="form-select colorborder">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label colorborder">Zip</label>
    <input type="text" class="form-control colorborder" id="inputZip"></input>
  </div>
  <div class="col-12  colorborder">
    <div class="form-check">
      <input class="form-check-input colorborder" type="checkbox" id="gridCheck"></input>
      <label class="form-check-label colorborder" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit"  class="btn btn-dark colorborder" onClick={filldeliverydetails} > Now Move For Payment </button>
  </div>
</form>
    </>
)
}
export default  FormAddress ;







