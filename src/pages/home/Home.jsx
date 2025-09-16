import React from "react";
import Banner from "./Banner";
import FAQSection from "./FAQSection";
import ChooseUs from "./ChooseUs";
import LatestPosts from "./LatestPosts";
import BannerSlider from "./Slider";
import Marque from "./Marque";
import FeaturedFeedback from "./FeaturedFeedback";

const Home = () => {
  return (
    <div>
      <BannerSlider></BannerSlider>
      {/* <Banner></Banner> */}
      <LatestPosts></LatestPosts>
      <Marque></Marque>
      {/* <FAQSection /> */}
      <FeaturedFeedback></FeaturedFeedback>
      <ChooseUs />
      <FAQSection />
    </div>
  );
};
export default Home;
