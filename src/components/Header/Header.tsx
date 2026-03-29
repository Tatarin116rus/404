import { Image, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import hh from "../../assets/hh.png";
import Ball from "../../assets/Ball.png";
import User from "../../assets/User.png";
import classes from "./Header.module.css";
import clsx from "clsx";

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image src={hh} alt="HH logo" />
        <Text>.FrontEnd</Text>
      </div>

      <div className={classes.nav}>
        <NavLink
          to="/vacancies/moscow"
          className={({ isActive }) =>
            clsx({ [classes.active]: isActive })
          }
        >
          <span>Вакансии FE</span>
          <Image    radius="md"
      h={5}
      w="auto"
      fit="contain" 
      src={Ball}   />
        </NavLink>

        <NavLink
 
          to="/about"
          className={({ isActive }) =>
            clsx({ [classes.active]: isActive })
          }
        >
          <Image src={User} radius="md"
      h={25}
      w="auto"
      fit="contain" 
       />
          <span>Обо мне</span>
        </NavLink>
      </div>
    </header>
  );
};