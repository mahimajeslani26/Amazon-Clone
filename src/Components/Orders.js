import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import Order from './Order';
import { useStateValue } from '../StateProvider';

import '../style/Orders.css';

function Orders() {
  const [orders, setOrders] = useState();
  const [{ cart, user }, dispatch] = useStateValue();

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
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  console.log('Orders :  ', orders);
  return (
    <div className='orders'>
      <h1> Order Summary </h1>
      <div className='orders__order'>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
