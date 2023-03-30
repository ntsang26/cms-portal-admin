import CMedia from "../../constants/CMedia.js";

const MauticFormSignUp = {
  id: "mautic-form-signup",
  label: "Mautic Form Signup",
  media: CMedia.form,
  category: "Form",
  content: `
<div id="mauticform_wrapper_loyaltycmsfooter" class="mauticform_wrapper">
    <form autocomplete="false" role="form" method="post" action="https://test-marketing.jitsinnovationlabs.com/form/submit?formId=4" id="mauticform_loyaltycmsfooter" data-mautic-form="loyaltycmsfooter" enctype="multipart/form-data">
        <div class="mauticform-error" id="mauticform_loyaltycmsfooter_error"></div>
        <div class="mauticform-message" id="mauticform_loyaltycmsfooter_message"></div>
        <div class="mauticform-innerform">
            
          <div class="mauticform-page-wrapper mauticform-page-1" data-mautic-form-page="1">

            <div id="mauticform_loyaltycmsfooter_email" data-validate="email" data-validation-type="email" class="mauticform-row mauticform-email mauticform-field-1 mauticform-required">
                <input id="mauticform_input_loyaltycmsfooter_email" name="mauticform[email]" value="" placeholder="Email Address" class="mauticform-input form-control mb-3" type="email">
                <span class="mauticform-errormsg" style="display: none;">This is required.</span>
            </div>

            <div id="mauticform_loyaltycmsfooter_submit" class="mauticform-row mauticform-button-wrapper mauticform-field-2">
                <button data-gjs-type="button" type="submit" name="mauticform[submit]" id="mauticform_input_loyaltycmsfooter_submit" value="" class="mauticform-button btn btn-dark w-100 fw-semibold border-0">Sign Up</button>
            </div>
            </div>
        </div>

        <input type="hidden" name="mauticform[formId]" id="mauticform_loyaltycmsfooter_id" value="4">
        <input type="hidden" name="mauticform[return]" id="mauticform_loyaltycmsfooter_return" value="">
        <input type="hidden" name="mauticform[formName]" id="mauticform_loyaltycmsfooter_name" value="loyaltycmsfooter">

        </form>
</div>
<script type="text/javascript">
    /** This section is only needed once per page if manually copying **/
    if (typeof MauticSDKLoaded == 'undefined') {
        var MauticSDKLoaded = true;
        var head            = document.getElementsByTagName('head')[0];
        var script          = document.createElement('script');
        script.type         = 'text/javascript';
        script.src          = 'https://test-marketing.jitsinnovationlabs.com/media/js/mautic-form.js?v60b8262b';
        script.onload       = function() {
            MauticSDK.onLoad();
        };
        head.appendChild(script);
        var MauticDomain = 'https://test-marketing.jitsinnovationlabs.com';
        var MauticLang   = {
            'submittingMessage': "Please wait..."
        }
    }else if (typeof MauticSDK != 'undefined') {
        MauticSDK.onLoad();
    }
</script>


`,
};

export default MauticFormSignUp;
