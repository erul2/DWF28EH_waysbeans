import React from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import cssMod from "./OrderList.module.css";

function OrderList(props) {
  return (
    <div className={`${cssMod.list} ms-1 align-items-center d-flex`}>
      <div className="p-0">
        <img src={props.img} className={cssMod.listImg} alt="" />
      </div>
      <div xs={6} className="flex-grow-1 ms-3">
        <div className={cssMod.name}>{props.name}</div>
        <div className={cssMod.btnGroup}>
          <button className={cssMod.btn} onClick={props.sub}>
            -
          </button>
          <div className={cssMod.qty}>{props.qty}</div>
          <button className={cssMod.btn} onClick={props.add}>
            +
          </button>
        </div>
      </div>
      <div xs={3} className={`${cssMod.price} d-flex flex-column `}>
        {"Rp." +
          toRupiah(props.price, {
            symbol: null,
            floatingPoint: 0,
          })}
        <img
          src="/icon/trash.svg"
          width="20px"
          height="20px"
          className={`ms-auto mt-2 ${cssMod.trash}`}
          onClick={props.del}
          alt=""
        />
      </div>
    </div>
  );
}

export default OrderList;
