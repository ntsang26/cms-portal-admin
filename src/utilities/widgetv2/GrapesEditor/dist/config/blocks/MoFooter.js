import { CMedia } from "../../constants";

const MoFooter = {
  id: "mo-footer",
  label: "MO Footer",
  media: CMedia.footer,
  select: false,
  category: "UI Template",
  content: `
	<style>
	footer {
    font-family: "Avenir", Sans-serif;
  }

	footer a {
    text-decoration: none;
    color: black;
  }

  footer p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    color: #000;
  }

  .quicklinks a:hover {
    color: #4CB74E !important;
  }

  .btn:hover {
    transition: all .3s ease;
    background-color: #4CB74E;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  .social-icon i {
    font-size: 16px;
  }

  .social-icon:hover {
    color: #fff;
    background-color: #000;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    transition: all .2s ease-in;
  }
	</style>
	<footer class="bg-white">
    <div class="p-5">
      <div class="row">
        <div class="col-lg-3">
          <a href="/">
            <img width="122" height="60" src="https://mo.com.mm/wp-content/uploads/2022/10/mo_logo.svg"
              alt="logo-footer" />
          </a>
          <p class="my-4">
            Copyright © 2023 Modus Operandi.<br />
            All rights reserved.
          </p>
          <div class="row">
            <div class="col-6 col-lg-5">
              <a href="https://apps.apple.com/us/app/momoney-wallet/id1588383850" target="_blank">
                <img width="134" height="45" src="https://mo.com.mm/wp-content/uploads/2022/03/mo_btn_apple-store.svg"
                  alt="appstore">
              </a>
            </div>
            <div class="col-6 col-lg-5">
              <a href="https://play.google.com/store/apps/details?id=com.momoney.subscriber.prod" target="_blank">
                <img width="152" height="45" src="https://mo.com.mm/wp-content/uploads/2022/03/mo_btn_google-play.svg"
                  alt="appstore">
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 quicklinks">
          <p class="fw-semibold my-3 mt-lg-0">Quick Links</p>
          <ul class="row list-unstyled">
            <li class="col-6 mb-3">
              <a href="#">MoMoney App</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">FAQs</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">About MO</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">Privacy Policy</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">Partners</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">Terms & Conditions</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">Contact Us</a>
            </li>
            <li class="col-6 mb-3">
              <a href="#">Business Account Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-3">
          <p class="fw-semibold mb-3">Singapore</p>
          <p class="mb-3">68 Circular Road, #02-01 <br>
            Singapore 049422</p>
          <p class="fw-semibold mb-3">Myanmar</p>
          <p>Tower B, Level 3, 66-76,<br>
            Corner of Merchant Road and Pansodan Street, Kyauktada Township, Yangon 11182, Myanmar</p>
        </div>
        <div class="col-lg-3">
          <p class="fw-semibold my-3 mt-lg-0">Sign up for MoMoney updates</p>
          <input class="form-control mb-3" style="min-height: 48px;" size="1" type="email" id="form-field-email"
            placeholder="Email Address" required="required" aria-required="true">
          <button type="submit" class="btn btn-dark w-100 fw-semibold border-0"
            style="min-height: 50px; font-size: 20px;">Sign Up</button>
        </div>
      </div>
      <div class="mt-4 row justify-content-between align-items-center">
        <div class="col-lg-9">
          <p>This site is protected by reCAPTCHA and the Google
            <span class="fw-semibold">Privacy Policy</span> and <span class="fw-semibold">Terms of Service</span> apply.
          </p>
        </div>
        <div class="col-lg-3 row align-items-center">
          <p class="fw-semibold col-lg-4 mt-2 mt-lg-0">
            Follow us on
          </p>
          <div class="col-lg-8 row">
            <a href="#" class="col-lg-4 social-icon"><i class="bi bi-facebook"></i></a>
            <a href="#" class="col-lg-4 social-icon"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="col-lg-4 social-icon"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
	`,
};

export default MoFooter;
