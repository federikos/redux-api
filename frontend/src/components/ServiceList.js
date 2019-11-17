import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {useSelector, useDispatch} from 'react-redux';
import { deleteService, fetchServices, editService } from '../actions/actionCreators';

function ServiceList() {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch]);

  const handleRemove = id => {
    dispatch(deleteService(id));
  }

  const handleEdit = (item) => {
    dispatch(editService(item.id));
    history.push(`/services/${item.id}`);
  }

  if (loading) {
    return (
      <div className="loader-wrapper">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return <p className="error">Произошла ошибка!</p>;
  }

  return (
    <ul>
      {items.map(o => (
        <li className="list-item" key={o.id}>
          {`${o.name}: ${o.price} руб.`}
          <div className="list-btns">
            <button onClick={() => handleEdit(o)}>✎</button>
            <button onClick={() => handleRemove(o.id)}>✕</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList
