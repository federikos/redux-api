import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {useSelector, useDispatch} from 'react-redux';
import { deleteService, fetchServices, editService } from '../actions/actionCreators';

function ServiceList() {
  const {items, loading, deletingItems, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch]);

  useEffect(() => {
    console.log(deletingItems)
  }, [deletingItems])

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

  return (
    <>
      <ul>
        {items.map(o => (
          <li className="list-item" key={o.id}>
            {`${o.name}: ${o.price} руб.`}

            <div className="list-btns">
              {
                deletingItems.includes(o.id)
                ? <button type="button"><ClipLoader size={10} /></button>
                :
                <>
                  <button onClick={() => handleEdit(o)}>✎</button>
                  <button onClick={() => handleRemove(o.id)}>✕</button>
                </>
              }
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="error">Произошла ошибка!</p>}
    </>
  );
}

export default ServiceList
