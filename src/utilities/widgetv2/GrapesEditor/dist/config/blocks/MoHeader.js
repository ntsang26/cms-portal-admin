import CMedia from '../../constants/CMedia.js';

const MoHeader = {
  id: "mo-header",
  label: "MO Header",
  category: "UI Template",
  media: CMedia.header,
  select: false,
  editable: true,
  draggable: true,
  stylable: true,
  selectable: true,
  content: `
  <style>
  .navbar.navbar-expand-lg.sticky-top{
    background-color:rgb(236, 241, 236);
  }
  #i3vj{
    font-weight:500;
    width:100px;
    margin-top:0px;
    margin-right:20px;
    margin-bottom:0px;
    margin-left:0px;
    text-align:center;
    font-size:15px;
  }
  #ikuua{
    font-weight:500;
    text-align:center;
    width:100px;
    margin-top:0px;
    margin-right:20px;
    margin-bottom:0px;
    margin-left:0px;
    font-size:15px;
  }
  #i5t1h{
    font-weight:500;
    width:100px;
    margin-top:0px;
    margin-right:20px;
    margin-bottom:0px;
    margin-left:0px;
    text-align:center;
    font-size:15px;
  }
  #iug08{
    font-weight:500;
    text-align:center;
    width:100px;
    margin-top:0px;
    margin-right:20px;
    margin-bottom:0px;
    margin-left:0px;
    font-size:15px;
  }
  #ididp{
    font-weight:500;
    width:100px;
    text-align:center;
    font-size:15px;
  }
  .nav-link.active{
    color:rgb(76, 184, 73) !important;
  }
  #iw7m8q{
    width:20px;
  }
  #i2ynzm{
    width:20px;
  }
  </style>
  <nav id="iqke-2" class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <img src="https://funflow-sp.sgp1.digitaloceanspaces.com/upload/loyalty-cms-header-logo_686e71fe-9754-47e9-938f-5bf091873244.png" id="ijt159-2-2"/>
      <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-2" aria-controls="navbarSupportedContent-2" aria-expanded="false" aria-label="Toggle navigation" id="i3fi" class="navbar-toggler"><span id="ipkw" class="navbar-toggler-icon"></span></button>
      <div id="navbarSupportedContent-2" class="collapse navbar-collapse">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a aria-current="page" href="/" id="i3vj" class="nav-link active">Home</a>
        </li>
        <li class="nav-item">
        <a href="/en/about-us" id="ikuua" class="nav-link">About us</a>
        </li>
        <li class="nav-item">
        <a href="/en/voucher" id="i5t1h" class="nav-link">Voucher</a>
        </li>
        <li class="nav-item">
        <a href="/en/support" id="iug08" class="nav-link">Support</a>
        </li>
        <li class="nav-item">
        <div class="dropdown">
          <a href="#" id="ididp" data-bs-toggle="dropdown" class="nav-link">Language</a>
          <ul id="ibq35" class="dropdown-menu">
          <li id="ii9ph">
            <a href="/" id="ibgcl" class="dropdown-item"><img src="https://funflow-sp.sgp1.digitaloceanspaces.com/upload/Ellipse 22_b5f06a83-ef68-4fb7-b47c-545a38cd86bf.png" id="iw7m8q" class="me-2"/>English</a>
          </li>
          <li>
            <hr class="dropdown-divider"/>
          </li>
          <li id="iu86o">
            <a href="/" id="i0sci" class="dropdown-item"><img src="https://funflow-sp.sgp1.digitaloceanspaces.com/upload/Ellipse 23_cc1c2882-c795-4843-bbaa-41ca6c075b97.png" id="i2ynzm" class="me-2"/>Burmese</a>
          </li>
          </ul>
        </div>
        </li>
      </ul>
      </div>
    </div>
  </nav>
  `,
};

export default MoHeader;