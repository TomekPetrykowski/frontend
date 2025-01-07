import { useState } from "react";
import "./icon.css";

export function BaseIcon({
  icon,
  className,
  hoverText,
  hoverCondition = null,
  onClick = (f) => f,
}) {
  const Icon = icon;
  let [iconClassName, setIconClassname] = useState("");

  const handleMouseEnter = () => {
    if (hoverCondition) {
      setIconClassname("remove");
    } else {
      setIconClassname("add");
    }
  };

  const handleMouseLeft = () => {
    setIconClassname("");
  };

  return (
    <div className={`${className} icon`} data-hover-text={hoverText}>
      <Icon
        className={iconClassName}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeft}
      />
    </div>
  );
}
