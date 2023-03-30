import { CMedia } from "../../constants";

const Contact = {
  id: "contact-1",
  label: "Contact",
  media: CMedia.contact,
  select: false,
  category: "UI Template",
  content: `<div 
    class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
    <form data-gjs-type="form" method="get" class="" action="">
        <h2 data-gjs-type="text" 
            class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
        <p data-gjs-type="text" 
            class="leading-relaxed mb-5 text-gray-600 gjs-selected">Post-ironic portland shabby chic
            echo park, banjo fashion axe</p>
        <div class="relative mb-4">
            <label data-gjs-type="label" for="email"
                class="leading-7 text-sm text-gray-600">Email</label><input data-gjs-type="input"
                type="email" id="email" name="email" required="true"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autocomplete="off">
        </div>
        <div class="relative mb-4">
            <label data-gjs-type="label" for="message"
                class="leading-7 text-sm text-gray-600">Message</label><textarea data-gjs-type="textarea"
                id="message" name="message" required="true"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                autocomplete="off"></textarea>
        </div><button data-gjs-type="button" type="submit"
            class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            autocomplete="off">Button</button>
        <p data-gjs-type="text" class="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
    </form>
</div>`,
};
export default Contact;
