import CMedia from "../../constants/CMedia.js";

const Form = {
  id: "form",
  label: "Form",
  media: CMedia.form,
  category: "Form",
  content: `<form data-gjs-type="form" enctype="application/x-www-form-urlencoded" method="get" action="">
  <div class="mb-3">
    <label data-gjs-type="label" class="form-label" for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label data-gjs-type="label" class="form-label" for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label data-gjs-type="label" class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" data-gjs-type="button" class="btn btn-primary">Submit</button>
</form>`,
};

export default Form;
