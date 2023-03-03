import React, { useState } from "react";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import "./DropdownButton.scss";

const DropdownButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={props.css} onClick={toggleDropdown}>
      <div className="dropdown">
        <div className="btn btn-secondary">
          <IconButton icon={icons.menu} />
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <a href="#">Show more details</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownButton;
