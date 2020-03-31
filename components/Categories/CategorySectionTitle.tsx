import React from "react";

interface CategorySectionTitleProps {
  title: string;
}

const CategorySectionTitle = (props: CategorySectionTitleProps) => {
  return <p className="category-section-title">{props.title}</p>;
};

export default CategorySectionTitle;
