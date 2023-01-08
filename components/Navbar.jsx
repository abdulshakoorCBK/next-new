import Image from "next/image";
import React, { Component } from "react";
import style from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.logo}>
          <Image src={"/img/telephone.png"} alt="" width={22} height={22} />
        </div>
        <div className={style.contact}>
          <span>Order Now</span>
          <span>123 456 789</span>
        </div>
      </div>
      <div className={style.center}>
        <div className={style.list}>
          <Link href={"/"} passHref>
            <div className={style.item}>HomePage</div>
          </Link>
          <div className={style.item}>Products</div>
          <div className={style.item}>Menu</div>
          <Image
            src={"/img/logo.png"}
            alt=""
            width={122}
            className={style.logoImage}
            height={102}
          />

          <div className={style.item}>Events</div>
          <div className={style.item}>Blog</div>
          <div className={style.item}>Contact</div>
        </div>
      </div>

      <div className={style.bottom}>
        <Link href={"/cart"} passHref>
          <Image
            src={"/img/cart.png"}
            alt=""
            className={style.cartLogo}
            width={22}
            height={22}
          />
        </Link>

        <div className={style.valueCircle}>
          <div className={style.value}>{quantity}</div>
        </div>
      </div>
    </div>
  );
}
