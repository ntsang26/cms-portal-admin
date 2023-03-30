import CMedia from "../../constants/CMedia.js";

const MauticSupportForm = {
  id: "mautic-support-form",
  label: "Mautic Support Form",
  media: CMedia.form,
  category: "Form",
  content: `
  <style>
    .mauticform_wrapper {
      max-width: 600px;
      position: relative;
    }
    
    #mauticform_loyaltycms {
      background-color: rgb(254, 235, 188);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
      padding-top: 30px;
      padding-right: 20px;
      padding-bottom: 30px;
      padding-left: 20px;
      border-top-width: 2px;
      border-right-width: 2px;
      border-bottom-width: 2px;
      border-left-width: 2px;
      border-top-style: solid;
      border-right-style: solid;
      border-bottom-style: solid;
      border-left-style: solid;
      border-top-color: rgb(216, 115, 85);
      border-right-color: rgb(216, 115, 85);
      border-bottom-color: rgb(216, 115, 85);
      border-left-color: rgb(216, 115, 85);
      border-image-source: initial;
      border-image-slice: initial;
      border-image-width: initial;
      border-image-outset: initial;
      border-image-repeat: initial;
      position: relative;
    }
    
    .mauticform-innerform {
    }
    
    .mauticform-post-success {
    }
    
    .mauticform-name {
      font-weight: bold;
      font-size: 1.5em;
      margin-bottom: 3px;
    }
    
    .mauticform-description {
      margin-top: 2px;
      margin-bottom: 10px;
    }
    
    .mauticform-error {
      margin-bottom: 10px;
      color: red;
    }
    
    .mauticform-message {
      margin-bottom: 10px;
      color: green;
    }
    
    .mauticform-row {
      display: block;
      margin-bottom: 20px;
    }
    
    .mauticform-label {
      font-size: 1.1em;
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .mauticform-row.mauticform-required .mauticform-label:after {
      color: #e32;
      content: " *";
      display: inline;
    }
    
    .mauticform-helpmessage {
      display: block;
      font-size: 0.9em;
      margin-bottom: 3px;
    }
    
    .mauticform-errormsg {
      display: block;
      color: red;
      margin-top: 2px;
    }
    
    .mauticform-selectbox,
    .mauticform-input,
    .mauticform-textarea {
      width: 100%;
      padding: 0.5em 0.5em;
      border: 1px solid #ccc;
      background: #fff;
      box-shadow: 0px 0px 0px #fff inset;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    .mauticform-checkboxgrp-row {
    }
    
    .mauticform-checkboxgrp-label {
      font-weight: normal;
    }
    
    .mauticform-checkboxgrp-checkbox {
    }
    
    .mauticform-radiogrp-row {
    }
    
    .mauticform-radiogrp-label {
      font-weight: normal;
    }
    
    .mauticform-radiogrp-radio {
    }
    
    .mauticform-button-wrapper .mauticform-button.btn-default,
    .mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default {
      color: #5d6c7c;
      background-color: #ffffff;
      border-color: #dddddd;
    }
    
    .mauticform-button-wrapper .mauticform-button,
    .mauticform-pagebreak-wrapper .mauticform-pagebreak {
      display: inline-block;
      margin-bottom: 0;
      font-weight: 600;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 6px 12px;
      font-size: 13px;
      line-height: 1.3856;
      border-radius: 3px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    .mauticform-button-wrapper .mauticform-button.btn-default[disabled],
    .mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default[disabled] {
      background-color: #ffffff;
      border-color: #dddddd;
      opacity: 0.75;
      cursor: not-allowed;
    }
    
    .mauticform-pagebreak-wrapper .mauticform-button-wrapper {
      display: inline;
    }
    .mauticform-field-hidden {
      display: none;
    }
    #i1m7wl {
      width: 174px;
      height: 235px;
      position: absolute;
      bottom: 0px;
      right: -20%;
    }
    #i5oh4h {
      width: 280px;
      height: 294px;
      position: absolute;
      left: -29%;
    }  
  </style>
  <div id="mauticform_wrapper_loyaltycms" class="mauticform_wrapper col col-xxl-6">
    <img src="https://funflow-sp.sgp1.digitaloceanspaces.com/upload/Group 110_4e24ebb3-758b-473c-a5ad-0ad0cde858cf.png"
      id="i5oh4h" />
    <form data-gjs-type="form" autocomplete="false" role="form" method="post"
      action="https://test-marketing.jitsinnovationlabs.com/form/submit?formId=2" id="mauticform_loyaltycms"
      data-mautic-form="loyaltycms" enctype="multipart/form-data">
      <div class="mauticform-error" id="mauticform_loyaltycms_error"></div>
      <div class="mauticform-message" id="mauticform_loyaltycms_message"></div>
      <div class="mauticform-innerform">

        <div class="mauticform-page-wrapper mauticform-page-1" data-mautic-form-page="1">

          <div id="mauticform_loyaltycms_f_name" data-validate="f_name" data-validation-type="text"
            class="mauticform-row mauticform-text mauticform-field-1 mauticform-required">
            <label data-gjs-type="label" id="mauticform_label_loyaltycms_f_name" for="mauticform_input_loyaltycms_f_name"
              class="mauticform-label">Name</label>
            <input id="mauticform_input_loyaltycms_f_name" name="mauticform[f_name]" value="" class="mauticform-input"
              type="text">
            <span class="mauticform-errormsg" style="display: none;">Please fill out this field.</span>
          </div>

          <div id="mauticform_loyaltycms_email" data-validate="email" data-validation-type="email"
            class="mauticform-row mauticform-email mauticform-field-2 mauticform-required">
            <label data-gjs-type="label" id="mauticform_label_loyaltycms_email" for="mauticform_input_loyaltycms_email"
              class="mauticform-label">Email</label>
            <input id="mauticform_input_loyaltycms_email" name="mauticform[email]" value="" class="mauticform-input"
              type="email">
            <span class="mauticform-errormsg" style="display: none;">Please fill out this field.</span>
          </div>

          <div id="mauticform_loyaltycms_phone_number" data-validate="phone_number" data-validation-type="tel"
            class="mauticform-row mauticform-tel mauticform-field-3 mauticform-required">
            <label data-gjs-type="label" id="mauticform_label_loyaltycms_phone_number" for="mauticform_input_loyaltycms_phone_number"
              class="mauticform-label">Phone number</label>
            <input id="mauticform_input_loyaltycms_phone_number" name="mauticform[phone_number]" value=""
              class="mauticform-input" type="tel">
            <span class="mauticform-errormsg" style="display: none;">Please fill out this field.</span>
          </div>

          <div id="mauticform_loyaltycms_f_message" data-validate="f_message" data-validation-type="text"
            class="mauticform-row mauticform-text mauticform-field-4 mauticform-required">
            <label data-gjs-type="label" id="mauticform_label_loyaltycms_f_message" for="mauticform_input_loyaltycms_f_message"
              class="mauticform-label">Message</label>
            <input id="mauticform_input_loyaltycms_f_message" name="mauticform[f_message]" value=""
              class="mauticform-input" type="text">
            <span class="mauticform-errormsg" style="display: none;">Please fill out this field.</span>
          </div>

          <div id="mauticform_loyaltycms_submit" class="mauticform-row mauticform-button-wrapper mauticform-field-5">
            <button type="submit" name="mauticform[submit]" id="mauticform_input_loyaltycms_submit" value=""
              class="mauticform-button btn btn-success w-100" data-gjs-type="button">Submit</button>
          </div>
        </div>
      </div>

      <input type="hidden" name="mauticform[formId]" id="mauticform_loyaltycms_id" value="2">
      <input type="hidden" name="mauticform[return]" id="mauticform_loyaltycms_return" value="">
      <input type="hidden" name="mauticform[formName]" id="mauticform_loyaltycms_name" value="loyaltycms">

    </form>
    <img src="https://funflow-sp.sgp1.digitaloceanspaces.com/upload/Group 111_29ba3fa8-22d1-4d5c-af4d-9990d99a54bc.png"
      id="i1m7wl" />
  </div>
  <script type="text/javascript">
    /** This section is only needed once per page if manually copying **/
    if (typeof MauticSDKLoaded == 'undefined') {
      var MauticSDKLoaded = true;
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://test-marketing.jitsinnovationlabs.com/media/js/mautic-form.js?v60b8262b';
      script.onload = function () {
        MauticSDK.onLoad();
      };
      head.appendChild(script);
      var MauticDomain = 'https://test-marketing.jitsinnovationlabs.com';
      var MauticLang = {
        'submittingMessage': "Please wait..."
      }
    } else if (typeof MauticSDK != 'undefined') {
      MauticSDK.onLoad();
    }
  </script>
  `,
};

export default MauticSupportForm;
