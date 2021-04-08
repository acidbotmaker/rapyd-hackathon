import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To FloraShop",
  keywords:
    " plants, buy plants, medicinal plants, online selling plants, nature, kitchen garden, roof top plants, decorate plants",
  description: "We sell the best and medicinal plants for cheap price",
};
export default Meta;
