import Column from "./blocks/Column";
import Contact from "./blocks/Contact";
import Footer from "./blocks/Footer";
import Header from "./blocks/Header";
import Image from "./blocks/Image";
import Link from "./blocks/Link";
import Map from "./blocks/Map";
import Media from "./blocks/Media";
import Section from "./blocks/Section";
import Text from "./blocks/Text";
import LoginButton from "./blocks/LoginButton";
import Input from "./blocks/Input";
import Button from "./blocks/Button";
import Row from "./blocks/Row";
import Progress from "./blocks/Progress";
import Label from "./blocks/Label";
import Form from "./blocks/Form";
import Radio from "./blocks/Radio";
import Checkbox from "./blocks/Checkbox";
import Search from "./blocks/Search";
import DropdownButton from "./blocks/DropdownButton";
import Carousel from "./blocks/Carousel";
import _ from "lodash";
import BSNavTabVertical from "./blocks/BSNavTabVertical";
import BSNavTabHorizontal from "./blocks/BSNavTabHorizontal";
import TextArea from "./blocks/TextArea";
import MoFooter from './blocks/MoFooter.js';
import MoHeader from './blocks/MoHeader.js';
import MauticSupportForm from './blocks/MauticSupportForm.js';
import MauticFormSignUp from './blocks/MauticFormSignUp.js';


export default {
  appendTo: ".blocks-container",
  blocks: [
    Section,
    Text,
    Image,
    Row,
    Column,
    Contact,
    Header,
    MoHeader,
    Button,
    Footer,
    MoFooter,
    Media,
    Link,
    Map,
    Input,
    Progress,
    Label,
    Form,
    Radio,
    Checkbox,
    Search,
    DropdownButton,
    TextArea,
    BSNavTabVertical,
    BSNavTabHorizontal,
    MauticSupportForm,
    MauticFormSignUp
    // LoginButton,
    // Carousel
  ],
};
