import Image from "next/image";
import styles from "../../styles/Admin.module.css";
import axios from "axios";
import { useState } from "react";

export default function Index({ orders, products }) {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const handleDelete = async (id) => {
    try {
      axios.delete(`http://localhost:3000/api/products/` + id);
      setProductList(productList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const cstatus = item.status;
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/` + id, {
        status: cstatus + 1,
      });
      setOrderList(res.data, ...orderList.filter((orde) => orde._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.row}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Prices</th>
              <th>Actions</th>
            </tr>
            {productList.map((product) => (
              <tr className={styles.row} key={product._id}>
                <td>
                  <div className={styles.productImage}>
                    <Image
                      src={product.image}
                      className={styles.productImage}
                      objectFit="cover"
                      width={80}
                      height={80}
                      alt=""
                    />
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.topings[0].text}</td>
                <td>
                  Rs {product.price[0]},{product.price[1]},{product.price[2]}
                </td>

                <td>
                  <button className={styles.edit}>edit</button>
                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(product._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.section}>
        <h1 className={styles.title}>Orders</h1>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.row}>
              <th>ID</th>
              <th>customer</th>
              <th>address</th>
              <th>total</th>
              <th>method</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
            {orderList.map((order) => (
              <tr className={styles.row} key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>rs {order.total}</td>
                <td>{order.method == 1 ? "Paid" : "Not Paid"}</td>
                <td>{order.status}</td>

                <td>
                  <button
                    className={styles.stage}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  console.log(ctx.req.cookies.token);
  const myCookie = ctx.req?.cookies.token || "";
  if (myCookie !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productsRes = await axios.get(
    `http://localhost:${process.env.port}/api/products`
  );
  const ordersRes = await axios.get(
    `http://localhost:${process.env.port}/api/orders`
  );
  return {
    props: {
      orders: ordersRes.data,
      products: productsRes.data,
    },
  };
};
