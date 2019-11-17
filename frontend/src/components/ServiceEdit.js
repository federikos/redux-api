import React from 'react'
import {useHistory} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, saveService } from '../actions/actionCreators';

function ServiceEdit() {
  const {item, loading, loadingSave, error} = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(saveService(item, history));
  }

  const handleCancel = evt => {
    evt.preventDefault();
    history.go(-1);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Название</label>
        <input id="name" name='name' disabled={loading || loadingSave} onChange={handleChange} value={item.name} />
      </div>
      <div className="input-group">
        <label htmlFor="price">Цена</label>
        <input id="price" name='price' disabled={loading || loadingSave} onChange={handleChange} value={item.price} />
      </div>
      <div className="input-group">
        <label htmlFor="content">Описание</label>
        <input id="content" name='content' disabled={loading || loadingSave} onChange={handleChange} value={item.content} />
      </div>
      <div className="btns">
        <button type='button' disabled={loading || loadingSave} onClick={handleCancel}>Отмена</button>
        {
          loadingSave
          ? <button type="button"><ClipLoader size={10} /></button>
          : <button type='submit' disabled={loading}>Сохранить</button>
        }
      </div>
      {error && <p className="error">Произошла ошибка!</p>}
    </form>
  );
}

export default ServiceEdit;
