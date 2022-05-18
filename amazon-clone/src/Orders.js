import React, { useEffect, useState } from 'react';
import './styles/Orders.css';
import { db } from './db/firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  /* revisit this */
  return (
    <div className="orders">
      <h1>Your orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
